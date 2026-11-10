/* Fonctions partagées par les pages d'exercices : aide quand on bloque,
 * exercices fermés par le professeur, lien direct vers un exercice (#id). */
(function (global) {
  const echecs = {};
  const style = document.createElement("style");
  style.textContent = `
.aide-blocage { border: 1.5px solid var(--surligne, #f2c230); background: var(--surligne-doux, #fbf0c8); border-radius: 10px; padding: .7rem .9rem; display: grid; gap: .45rem; }
.aide-blocage h3 { margin: 0; font-size: 1rem; }
.aide-blocage .liens { display: flex; flex-wrap: wrap; gap: .4rem; }
.aide-blocage button, .aide-blocage a { font: inherit; font-weight: 700; font-size: .9rem; border: 1.5px solid var(--trait, #ccc); background: var(--papier, #fff); color: inherit; border-radius: 8px; padding: .35rem .7rem; cursor: pointer; text-decoration: none; }
.voile-ferme { position: fixed; inset: 0; background: rgba(15, 25, 30, .72); display: grid; place-items: center; z-index: 60; padding: 16px; }
.voile-ferme .boite { background: var(--papier, #fff); color: var(--encre, #111); border-radius: 16px; padding: 1.6rem 1.5rem; width: min(480px, 100%); display: grid; gap: .8rem; }
.voile-ferme h2 { margin: 0; }
.voile-ferme .liens { display: flex; gap: .5rem; flex-wrap: wrap; }
.voile-ferme a { font-weight: 700; border-radius: 8px; padding: .55rem 1rem; text-decoration: none; border: 1.5px solid var(--trait, #ccc); color: inherit; }
.voile-ferme a.plein { background: var(--accent, #0d6a6a); border-color: var(--accent, #0d6a6a); color: #fff; }
.bandeau-entr { background: #efe6fb; color: #3d2466; border-bottom: 1px solid #d9c8f2; padding: .55rem 16px; font-size: .95rem; }
.bandeau-entr strong { color: #5b2fa0; }
@media (prefers-color-scheme: dark) { .bandeau-entr { background: #2a2138; color: #e4d8f6; border-color: #3d3052; } .bandeau-entr strong { color: #c7a6f5; } }
.conseils { display: grid; gap: .3rem; margin-top: .4rem; }
.conseils div { font-size: .9rem; }`;
  document.head.appendChild(style);

  /** Après une vérification : à partir de 3 échecs sur le même exercice, propose de l'aide. */
  function aide(exo, reussi, o) {
    if (reussi) { echecs[exo.id] = 0; return; }
    echecs[exo.id] = (echecs[exo.id] || 0) + 1;
    if (echecs[exo.id] < 3) return;
    const v = document.querySelector("#verdict .verdict") || document.getElementById("verdict");
    if (!v) return;
    const d = document.createElement("div");
    d.className = "aide-blocage";
    d.innerHTML = `<h3>Tu bloques ? C'est normal, voici 3 pistes :</h3><div class="liens"></div>`;
    const liens = d.querySelector(".liens");
    const bouton = (texte, f) => { const b = document.createElement("button"); b.type = "button"; b.textContent = texte; b.addEventListener("click", f); liens.appendChild(b); };
    if (o.cours) bouton("📖 Relire le cours", o.cours);
    const bi = document.getElementById("b-indice");
    if (bi && !bi.hidden) bouton("💡 Prendre un indice", () => bi.click());
    if (o.entrainement) { const a = document.createElement("a"); a.href = o.entrainement; a.textContent = "🏋️ M'entraîner sur cette notion (pas noté)"; liens.appendChild(a); }
    v.appendChild(d);
  }

  /** Exercices de classe fermés par le professeur : l'entraînement reste ouvert. */
  function ferme(lienEntrainement) {
    if (document.querySelector(".voile-ferme")) return;
    const d = document.createElement("div");
    d.className = "voile-ferme";
    d.innerHTML = `<div class="boite" role="alertdialog"><h2>🔒 Exercices fermés pour le moment</h2><p style="margin:0">Ton professeur a fermé les exercices de classe. Tu peux continuer à t'exercer dans l'<strong>entraînement</strong> : ce n'est pas noté, c'est juste pour progresser.</p><div class="liens"><a class="plein" href="${lienEntrainement}">🏋️ Aller à l'entraînement</a><a href="index.html">← Accueil</a></div></div>`;
    document.body.appendChild(d);
  }

  /** Ouvre l'exercice ou la notion demandé dans l'adresse (#m3e2 ou #m3). */
  function depuisAdresse(EXOS, choisir) {
    const h = decodeURIComponent(location.hash.slice(1));
    if (!h) return false;
    const exo = EXOS.find(e => e.id === h) || EXOS.find(e => e.module && e.module.id === h);
    if (!exo) return false;
    choisir(exo.id);
    return true;
  }

  /** Bandeau « conseillé par ton professeur » à partir des conseils reçus du serveur. */
  function conseils(zone, liste, EXOS, choisir, reussis) {
    if (!zone) return;
    const utiles = (liste || []).filter(c => (c.exos || []).some(id => EXOS.some(e => e.id === id)));
    if (!utiles.length) { zone.hidden = true; return; }
    zone.hidden = false;
    zone.innerHTML = "<strong>📌 Conseillé par ton professeur</strong><div class=\"conseils\"></div>";
    const z = zone.querySelector(".conseils");
    utiles.forEach(c => {
      const d = document.createElement("div");
      const ids = c.exos.filter(id => EXOS.some(e => e.id === id));
      const faits = ids.filter(id => reussis.has(id)).length;
      d.textContent = `${c.titre || "Exercices"}${c.pour ? " · pour le " + c.pour.split("-").reverse().join("/") : ""} · ${faits}/${ids.length} faits `;
      ids.forEach(id => {
        const e = EXOS.find(x => x.id === id), b = document.createElement("button");
        b.type = "button"; b.textContent = (reussis.has(id) ? "✓ " : "") + e.num;
        b.style.cssText = "margin:0 .2rem;border:1.5px solid var(--trait);border-radius:6px;background:var(--papier);cursor:pointer;font:inherit;font-size:.85rem;padding:.1rem .45rem";
        b.addEventListener("click", () => choisir(id));
        d.appendChild(b);
      });
      z.appendChild(d);
    });
  }

  global.Commun = { aide, ferme, depuisAdresse, conseils };
})(window);
