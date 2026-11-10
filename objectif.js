/* Objectif de séance affiché aux élèves (accueil et page d'exercices).
 * Modifiez seulement ce bloc : classe → { parcours ("algo" ou "blocs"), jusqua (id du dernier exercice à avoir fait),
 * texte, jusquau (date après laquelle le bandeau disparaît, AAAA-MM-JJ) }. */
window.OBJECTIFS = {
  "4C": { parcours: "algo", jusqua: "a4e4", texte: "Objectif : avoir fini les Algorithmes jusqu'à l'exercice 4.4", detail: "Le mini-test de la semaine prochaine porte sur les notions 1 à 4.", jusquau: "2026-11-24" }
};
(function (global) {
  const css = document.createElement("style");
  css.textContent = `.objectif { background: #fff3d6; border: 2px solid #f2c230; border-radius: 12px; padding: .7rem 1rem; display: grid; gap: .4rem; margin: .8rem 0; }
.objectif b.t { font-size: 1.05rem; }
.objectif .barre-obj { height: 12px; background: #fff; border: 1px solid #e0c16a; border-radius: 99px; overflow: hidden; }
.objectif .barre-obj div { height: 100%; background: #1d8049; }
.objectif .qui { font-size: .92rem; }
.objectif.fini { background: #dcf1e4; border-color: #1d8049; }
.objectif a { font-weight: 700; color: #0d6a6a; }
.pastille.objectif-pastille { box-shadow: inset 0 -3px 0 #f2c230; }
@media (prefers-color-scheme: dark) { .objectif { background: #3b3420; border-color: #f0c645; color: #f3ead2; } .objectif.fini { background: #173326; border-color: #52c483; } .objectif .barre-obj { background: #222; } .objectif a { color: #7ccbc4; } }`;
  document.head.appendChild(css);
  /** Renvoie { obj, ids } pour la classe, ou null si pas d'objectif en cours. */
  function pour(classe, PARCOURS_ALGO, PARCOURS_BLOCS) {
    const obj = (global.OBJECTIFS || {})[classe];
    if (!obj) return null;
    if (obj.jusquau && new Date().toLocaleDateString("sv-SE") > obj.jusquau) return null;
    const liste = (obj.parcours === "algo" ? PARCOURS_ALGO : PARCOURS_BLOCS).flatMap(m => m.exercices.map(e => e.id));
    const fin = liste.indexOf(obj.jusqua);
    return fin < 0 ? null : { obj, ids: liste.slice(0, fin + 1) };
  }
  /** Bandeau : progression de chaque élève connecté vers l'objectif. */
  function bandeau(zone, o, membres, progression, lien) {
    if (!zone || !o) return;
    zone.querySelectorAll(".objectif").forEach(x => x.remove());
    const lignes = membres.map(m => { const r = new Set(progression(m.id).reussis); return { m, n: o.ids.filter(x => r.has(x)).length }; });
    const tous = lignes.every(l => l.n === o.ids.length);
    const d = document.createElement("div");
    d.className = "objectif" + (tous ? " fini" : "");
    d.innerHTML = `<b class="t">🎯 ${o.obj.texte}</b>${o.obj.detail ? `<span>${o.obj.detail}</span>` : ""}` +
      lignes.map(l => `<div class="qui">${membres.length > 1 ? `<b>${l.m.prenom || l.m.id}</b> : ` : ""}${l.n} / ${o.ids.length} exercices${l.n === o.ids.length ? " ✅ objectif atteint !" : ""}</div><div class="barre-obj"><div style="width:${100 * l.n / o.ids.length}%"></div></div>`).join("") +
      (tous ? "" : (lien ? `<a href="${lien}">Continuer →</a>` : ""));
    zone.prepend(d);
  }
  global.Objectif = { pour, bandeau };
})(window);
