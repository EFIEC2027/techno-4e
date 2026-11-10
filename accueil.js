/* Accueil élève : entraînement (pas noté), mon bilan, badges et défi de la semaine.
 * Tout est calculé à partir des exercices réussis et commencés : rien n'est envoyé. */
(function (global) {
  const css = document.createElement("style");
  css.textContent = `
.acc-section { background: var(--papier); border: 1px solid var(--trait); border-radius: 14px; padding: 1.1rem 1.3rem; display: grid; gap: .8rem; margin-top: 1rem; }
.acc-section > h2 { font-size: 1.3rem; margin: 0; display: flex; gap: .5rem; align-items: baseline; flex-wrap: wrap; }
.acc-section > h2 small { font-family: var(--f-texte); font-weight: 400; font-size: .85rem; color: var(--doux); }
.acc-entr { border: 2px solid #b79be6; background: linear-gradient(#f7f2ff, var(--papier) 70%); }
.acc-entr .etiquette { display: inline-block; background: #6b3fb5; color: #fff; border-radius: 99px; padding: .1rem .6rem; font-size: .78rem; font-weight: 700; letter-spacing: .03em; }
.acc-entr .lignes { display: grid; gap: .5rem; }
.acc-entr .ligne { display: grid; grid-template-columns: 1fr auto; gap: .3rem 1rem; align-items: center; }
.acc-entr .ligne .bouton { background: #6b3fb5; border-color: #6b3fb5; color: #fff; }
.acc-piste { height: 8px; background: var(--fond); border: 1px solid var(--trait); border-radius: 99px; overflow: hidden; grid-column: 1; }
.acc-piste div { height: 100%; background: #6b3fb5; }
.acc-bilan table { width: 100%; border-collapse: collapse; }
.acc-bilan td, .acc-bilan th { padding: .4rem .5rem; border-bottom: 1px solid var(--trait); text-align: left; font-size: .95rem; vertical-align: middle; }
.acc-bilan th { font-size: .78rem; text-transform: uppercase; letter-spacing: .05em; color: var(--doux); }
.acc-bilan .mini { width: 90px; height: 7px; background: var(--fond); border: 1px solid var(--trait); border-radius: 99px; overflow: hidden; display: inline-block; vertical-align: middle; margin-right: .4rem; }
.acc-bilan .mini div { height: 100%; background: var(--accent); }
.acc-etat { display: inline-block; border-radius: 99px; padding: .05rem .55rem; font-size: .8rem; font-weight: 700; white-space: nowrap; }
.acc-etat.ok { background: var(--ok-doux); color: var(--ok); }
.acc-etat.cours { background: var(--surligne-doux); color: #8a6300; }
.acc-etat.rien { background: var(--fond); color: var(--doux); }
.acc-bilan a { color: var(--accent); font-weight: 700; }
.acc-puces { display: flex; flex-wrap: wrap; gap: .35rem; }
.acc-puces a { border: 1.5px solid var(--surligne); background: var(--surligne-doux); border-radius: 8px; padding: .15rem .55rem; text-decoration: none; color: var(--encre); font-size: .88rem; }
.acc-badges { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: .6rem; }
.acc-badge { border: 1.5px solid var(--trait); border-radius: 12px; padding: .6rem .7rem; text-align: center; display: grid; gap: .15rem; }
.acc-badge .ic { font-size: 1.8rem; line-height: 1; }
.acc-badge b { font-size: .92rem; }
.acc-badge small { color: var(--doux); font-size: .78rem; }
.acc-badge.non { opacity: .45; filter: grayscale(1); }
.acc-defi { border: 2px dashed var(--surligne); }
.acc-defi .barre-defi { height: 12px; background: var(--fond); border-radius: 99px; overflow: hidden; border: 1px solid var(--trait); }
.acc-defi .barre-defi div { height: 100%; background: var(--surligne); }
.acc-conseils { background: #efe6fb; border-radius: 10px; padding: .55rem .8rem; display: grid; gap: .3rem; font-size: .92rem; }
@media (prefers-color-scheme: dark) { .acc-entr { background: var(--papier); } .acc-conseils { background: #2a2138; } }
@media (max-width: 600px) { .acc-bilan .mini { display: none; } }`;
  document.head.appendChild(css);
  const esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ids = modules => modules.flatMap(m => m.exercices.map(e => e.id));
  function semaine(d = new Date()) {
    const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const j = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - j);
    const a = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    return t.getUTCFullYear() + "-" + Math.ceil(((t - a) / 86400000 + 1) / 7);
  }
  const lire = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
  const ecrire = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  /**
   * o.zone : élément où ajouter les sections
   * o.parcours : [{ nom, modules, lien(id) }]    parcours de classe
   * o.entrainement : [{ nom, modules, lien, lienExo(id) }]
   * o.reussis, o.tentes : Set ; o.conseils : liste du professeur ; o.cle : identifiant élève
   */
  function dessiner(o) {
    o.zone.querySelectorAll(".acc-section").forEach(s => s.remove());
    const R = o.reussis, T = o.tentes;
    const nb = mods => ids(mods).filter(x => R.has(x)).length;

    // ---------- Entraînement (pas noté) ----------
    const entr = document.createElement("section");
    entr.className = "acc-section acc-entr";
    entr.id = "entrainement";
    const totalEntr = o.entrainement.reduce((a, p) => a + nb(p.modules), 0);
    entr.innerHTML = `<h2>🏋️ Entraînement <span class="etiquette">PAS NOTÉ</span></h2>
      <p style="margin:0">Des exercices en plus, <strong>juste pour t'exercer</strong>, en classe ou à la maison. Rien n'entre dans ta note : tu peux te tromper et recommencer autant que tu veux.</p>
      <div class="lignes">${o.entrainement.map(p => { const n = nb(p.modules), t = ids(p.modules).length; return `<div class="ligne"><div><b>${esc(p.nom)}</b> · ${n} / ${t} faits</div><a class="bouton" href="${p.lien}">S'entraîner</a><div class="acc-piste"><div style="width:${100 * n / t}%"></div></div></div>`; }).join("")}</div>`;
    const conseils = (o.conseils || []).map(c => {
      const liste = (c.exos || []).map(id => { for (const p of [...o.entrainement, ...o.parcours]) { const e = p.modules.flatMap((m, im) => m.exercices.map((x, ie) => ({ x, num: `${im + 1}.${ie + 1}`, p }))).find(y => y.x.id === id); if (e) return e; } return null; }).filter(Boolean);
      if (!liste.length) return "";
      const faits = liste.filter(e => R.has(e.x.id)).length;
      return `<div><strong>📌 ${esc(c.titre || "Conseillé par ton professeur")}</strong>${c.pour ? " · pour le " + esc(c.pour.split("-").reverse().join("/")) : ""} · ${faits}/${liste.length} faits : ${liste.map(e => `<a href="${(e.p.lienExo || e.p.lien)(e.x.id)}">${R.has(e.x.id) ? "✓ " : ""}${esc(e.x.titre)}</a>`).join(", ")}</div>`;
    }).join("");
    if (conseils) entr.insertAdjacentHTML("beforeend", `<div class="acc-conseils">${conseils}</div>`);
    o.zone.appendChild(entr);

    // ---------- Mon bilan ----------
    const bilan = document.createElement("section");
    bilan.className = "acc-section acc-bilan";
    let lignes = "";
    o.parcours.forEach(p => {
      lignes += `<tr><th colspan="3">${esc(p.nom)}</th></tr>`;
      p.modules.forEach((m, im) => {
        const t = m.exercices.length, n = m.exercices.filter(e => R.has(e.id)).length;
        const etat = n === t ? `<span class="acc-etat ok">Acquis</span>` : n || m.exercices.some(e => T.has(e.id)) ? `<span class="acc-etat cours">En cours</span>` : `<span class="acc-etat rien">À commencer</span>`;
        const suite = m.exercices.find(e => !R.has(e.id));
        lignes += `<tr><td>${im + 1}. ${esc(m.titre)} <small style="color:var(--doux)">· ${esc(m.notion)}</small></td><td><span class="mini"><div style="width:${100 * n / t}%"></div></span>${n}/${t}</td><td>${etat}${suite ? ` <a href="${p.lien(suite.id)}">${n ? "Continuer" : "Commencer"}</a>` : ""}</td></tr>`;
      });
    });
    const aRevoir = o.parcours.flatMap(p => p.modules.flatMap((m, im) => m.exercices.map((e, ie) => ({ e, p, num: `${im + 1}.${ie + 1}` })))).filter(x => T.has(x.e.id) && !R.has(x.e.id)).slice(0, 8);
    bilan.innerHTML = `<h2>📊 Mon bilan <small>ce que je sais faire, notion par notion</small></h2>
      <table><tbody>${lignes}</tbody></table>
      ${aRevoir.length ? `<div><b>Commencés mais pas encore réussis :</b><div class="acc-puces" style="margin-top:.35rem">${aRevoir.map(x => `<a href="${x.p.lien(x.e.id)}">${x.num} ${esc(x.e.titre)}</a>`).join("")}</div></div>` : ""}`;
    o.zone.appendChild(bilan);

    // ---------- Badges ----------
    const classe = o.parcours.flatMap(p => p.modules);
    const notionsFinies = classe.filter(m => m.exercices.every(e => R.has(e.id))).length;
    const totalClasse = ids(classe).length, faitClasse = nb(classe);
    const totalEntrTout = o.entrainement.reduce((a, p) => a + ids(p.modules).length, 0);
    const badges = [
      ["🚀", "Premier pas", "Réussir un premier exercice", faitClasse >= 1],
      ["🧩", "Notion maîtrisée", "Finir une notion entière", notionsFinies >= 1],
      ["🧠", "Tête bien faite", "Finir 3 notions", notionsFinies >= 3],
      ["⛰️", "Mi-parcours", "Réussir la moitié des exercices de classe", faitClasse >= totalClasse / 2],
      ...o.parcours.map(p => ["🏆", p.nom + " terminé", "Réussir tout le parcours " + p.nom, nb(p.modules) === ids(p.modules).length]),
      ["🏋️", "Sportif", "Réussir 5 exercices d'entraînement", totalEntr >= 5],
      ["🥇", "Champion de l'entraînement", "Réussir tout l'entraînement", totalEntr === totalEntrTout && totalEntrTout > 0]
    ];
    const bz = document.createElement("section");
    bz.className = "acc-section";
    bz.innerHTML = `<h2>🎖️ Mes badges <small>${badges.filter(b => b[3]).length} / ${badges.length}</small></h2><div class="acc-badges">${badges.map(b => `<div class="acc-badge${b[3] ? "" : " non"}" title="${esc(b[2])}"><span class="ic">${b[0]}</span><b>${esc(b[1])}</b><small>${esc(b[2])}</small></div>`).join("")}</div>`;
    o.zone.appendChild(bz);

    // ---------- Défi de la semaine ----------
    const s = semaine(), cle = "defi:" + o.cle + ":" + s;
    const DEFIS = [
      { titre: "Réussis 4 nouveaux exercices de classe", but: 4, mesure: () => faitClasse },
      { titre: "Réussis 3 exercices d'entraînement", but: 3, mesure: () => totalEntr },
      { titre: "Termine une nouvelle notion en entier", but: 1, mesure: () => notionsFinies },
      { titre: "Réussis 6 exercices, classe ou entraînement", but: 6, mesure: () => faitClasse + totalEntr }
    ];
    const num = Number(s.split("-")[1]) % DEFIS.length, d = DEFIS[num];
    let base = lire(cle, null);
    if (base === null) { base = d.mesure(); ecrire(cle, base); }
    const fait = Math.max(0, Math.min(d.but, d.mesure() - base));
    const df = document.createElement("section");
    df.className = "acc-section acc-defi";
    df.innerHTML = `<h2>⚡ Défi de la semaine <small>se renouvelle chaque lundi</small></h2><p style="margin:0"><b>${esc(d.titre)}</b> ${fait >= d.but ? "· 🎉 Défi relevé !" : `· ${fait} / ${d.but}`}</p><div class="barre-defi"><div style="width:${100 * fait / d.but}%"></div></div>`;
    o.zone.appendChild(df);
  }
  global.Accueil = { dessiner };
})(window);
