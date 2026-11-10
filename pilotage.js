/* Tableau de bord : onglets « En direct », « Pilotage » et « Contrôle », parcours d'entraînement,
 * bilan de séance et export Pronote. Chargé après le script principal de prof.html,
 * dont il réutilise les variables (BRUT, CLE, CLASSE, LES_PARCOURS…). */
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const esc = t => String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const MIN = 60000;
  const css = document.createElement("style");
  css.textContent = `
.direct-grille { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: .6rem; }
.tuile { border-radius: 12px; padding: .7rem .8rem; border: 2px solid var(--trait); background: var(--papier); display: grid; gap: .2rem; }
.tuile b { font-size: 1.1rem; }
.tuile .exo { font-size: .9rem; }
.tuile .info { font-size: .82rem; color: var(--doux); }
.tuile.actif { border-color: var(--ok); }
.tuile.bloque { border-color: #d98200; background: #fff6e5; }
.tuile.aide { border-color: var(--ko); background: var(--ko-doux, #f8e1dc); }
.tuile.inactif { opacity: .55; }
@media (prefers-color-scheme: dark) { .tuile.bloque { background: #3a2c12; } }
.legende { display: flex; flex-wrap: wrap; gap: .8rem; font-size: .85rem; color: var(--doux); }
.legende span::before { content: ""; display: inline-block; width: .8rem; height: .8rem; border-radius: 3px; margin-right: .3rem; vertical-align: -1px; border: 2px solid var(--c); }
#vue-direct.projecteur { position: fixed; inset: 0; z-index: 50; background: var(--fond); padding: 1rem; overflow: auto; }
#vue-direct.projecteur .tuile b { font-size: 1.4rem; }
.pil-ligne { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; padding: .55rem 0; border-bottom: 1px solid var(--trait); }
.pil-ligne:last-child { border-bottom: 0; }
.pil-ligne .classe { font-weight: 800; min-width: 6rem; }
.pil-ligne select, .pil-ligne input { font: inherit; border: 1.5px solid var(--trait); border-radius: 8px; padding: .3rem .5rem; background: var(--fond); }
.pil-etat { font-size: .88rem; }
.pil-etat.ouvert { color: var(--ok); font-weight: 700; }
.pil-etat.ferme { color: var(--ko); font-weight: 700; }
.choix-exos { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: .2rem .8rem; max-height: 260px; overflow: auto; border: 1px solid var(--trait); border-radius: 8px; padding: .5rem; font-size: .88rem; margin: .4rem 0; }
.choix-exos h4 { grid-column: 1 / -1; margin: .4rem 0 0; font-size: .82rem; text-transform: uppercase; color: var(--doux); }
.texte-bilan { width: 100%; min-height: 13rem; font: inherit; font-size: .92rem; border: 1.5px solid var(--trait); border-radius: 8px; padding: .6rem; background: var(--fond); }
.ctrl-liste { display: grid; gap: .4rem; }
.ctrl-liste div { border-left: 4px solid #d98200; padding: .35rem .6rem; background: var(--fond); border-radius: 0 6px 6px 0; font-size: .92rem; }
.ok-msg { color: var(--ok); font-weight: 700; }`;
  document.head.appendChild(css);

  /* ---------- Tous les exercices (classe + entraînement) ---------- */
  const TOUS = {};
  const NOMS_PARCOURS = [];
  function recenser(nom, liste, entr) {
    if (!Array.isArray(liste)) return;
    NOMS_PARCOURS.push({ nom, liste, entr });
    liste.forEach((m, im) => m.exercices.forEach((e, ie) => { if (!TOUS[e.id]) TOUS[e.id] = { e, m, num: `${im + 1}.${ie + 1}`, parcours: nom, entr }; }));
  }
  Object.entries(LES_PARCOURS).forEach(([, p]) => recenser(p.nom, p.liste, false));
  const ENTR = [
    ["entr-py", "Entraînement Python", window.PARCOURS_ENTRAINEMENT],
    ["entr-al", "Entraînement algorigrammes", window.PARCOURS_ENTRAINEMENT_ALGO],
    ["entr-algo", "Entraînement algorithmes", window.PARCOURS_ENTR_ALGO],
    ["entr-blocs", "Entraînement programmer", window.PARCOURS_ENTR_BLOCS]
  ].filter(x => Array.isArray(x[2]) && x[2].length);
  ENTR.forEach(([cle, nom, liste]) => {
    LES_PARCOURS[cle] = { nom, liste };
    recenser(nom, liste, true);
    const b = document.createElement("button");
    b.type = "button"; b.className = "puce"; b.dataset.parcours = cle; b.setAttribute("aria-pressed", "false");
    b.textContent = "🏋️ " + nom.replace("Entraînement ", "");
    b.title = nom + " (pas noté)";
    b.addEventListener("click", () => { definirParcours(cle); if (BRUT) toutDessiner(); });
    $("choix-parcours").appendChild(b);
  });
  const libExo = id => TOUS[id] ? `${TOUS[id].entr ? "🏋️ " : ""}${TOUS[id].parcours} ${TOUS[id].num} · ${TOUS[id].e.titre}` : id;

  /* ---------- Nouveaux onglets ---------- */
  const nav = document.querySelector(".onglets");
  [["direct", "🔴 En direct"], ["pilotage", "Pilotage"], ["controle", "Contrôle"]].forEach(([v, lib]) => {
    const b = document.createElement("button");
    b.className = "onglet"; b.setAttribute("role", "tab"); b.dataset.vue = v; b.setAttribute("aria-selected", "false"); b.textContent = lib;
    b.addEventListener("click", () => montrerVue(v));
    nav.appendChild(b);
  });
  const main = document.querySelector("#tableau main");
  main.insertAdjacentHTML("beforeend", `
<section class="vue" id="vue-direct" hidden>
  <div class="panneau">
    <div style="display:flex;gap:.6rem;align-items:center;flex-wrap:wrap">
      <div style="flex:1;min-width:240px"><h2>En direct</h2><p class="sous" style="margin:0">Activité des 60 dernières minutes, actualisée toutes les 30 secondes. Choisissez la classe en haut.</p></div>
      <button class="bouton" id="b-projecteur" type="button">Plein écran (vidéoprojecteur)</button>
      <label style="font-size:.9rem"><input type="checkbox" id="direct-prenoms"> Prénoms seulement</label>
    </div>
    <div class="legende" style="margin-top:.6rem"><span style="--c:var(--ok)">travaille</span><span style="--c:#d98200">bloqué depuis 10 min sur le même exercice</span><span style="--c:var(--ko)">3 échecs ou plus d'affilée : aller l'aider</span><span style="--c:var(--trait)">rien depuis 10 min</span></div>
  </div>
  <div class="direct-grille" id="direct-grille"></div>
</section>
<section class="vue" id="vue-pilotage" hidden>
  <div class="panneau"><h2>Évaluations</h2><p class="sous">Ouvrez une évaluation (ou la mission) pour une classe, avec une fermeture automatique à l'heure de fin du cours. Le code de déblocage se définit toujours dans la Google Sheet.</p><div id="pil-evals"></div></div>
  <div class="panneau"><h2>Accès aux exercices de classe</h2><p class="sous">Fermés, les élèves voient un message et peuvent seulement utiliser l'entraînement (toujours ouvert).</p><div id="pil-acces"></div></div>
  <div class="panneau"><h2>Entraînement conseillé</h2><p class="sous">Choisissez des exercices à conseiller à une classe, avec une date. Les élèves les voient sur leur accueil et dans l'entraînement ; vous voyez qui les a faits.</p><div id="pil-conseils"></div></div>
  <div class="panneau"><h2>Bilan de séance</h2><p class="sous">Un résumé prêt à coller dans le cahier de textes ou à transmettre.</p>
    <div class="pil-ligne"><label>Classe <select id="bs-classe"></select></label><label>Jour <input type="date" id="bs-jour"></label><label>de <input type="time" id="bs-debut" value="07:30"></label><label>à <input type="time" id="bs-fin" value="18:30"></label><button class="bouton plein" id="b-bilan" type="button">Faire le bilan</button><button class="bouton" id="b-bilan-copier" type="button">Copier</button></div>
    <textarea class="texte-bilan" id="bs-texte" readonly></textarea></div>
</section>
<section class="vue" id="vue-controle" hidden>
  <div class="panneau"><h2>Codes identiques</h2><p class="sous">Même programme réussi par plusieurs élèves (espaces et commentaires ignorés), sur les exercices où le code est assez long pour que ce soit significatif. Rouge : envoyés à moins de 20 minutes d'écart. Les exercices très guidés donnent parfois le même code sans tricherie : à interpréter avec prudence.</p><div class="ctrl-liste" id="ctrl-copies"></div></div>
  <div class="panneau"><h2>Essais « au hasard »</h2><p class="sous">Beaucoup de vérifications en très peu de temps, ou le même code vérifié plusieurs fois de suite sans le modifier.</p><div class="ctrl-liste" id="ctrl-hasard"></div></div>
</section>`);
  window.montrerVue = montrerVue = function (v) {
    document.querySelectorAll(".onglet").forEach(o => o.setAttribute("aria-selected", String(o.dataset.vue === v)));
    document.querySelectorAll("#tableau main > .vue").forEach(x => { x.hidden = x.id !== "vue-" + v; });
    Object.values(graphes).forEach(g => g.resize());
    if (v === "direct") dessinerDirect();
  };

  /* ---------- Outils ---------- */
  const elevesFiltres = () => (BRUT ? BRUT.eleves : []).filter(e => CLASSE === "toutes" || e.classe === CLASSE);
  const classesListe = () => [...new Set((BRUT ? BRUT.eleves : []).map(e => e.classe))].filter(Boolean).sort();
  const nomAff = (e, court) => court ? e.prenom || e.id : [e.prenom, e.nom].filter(Boolean).join(" ") || e.id;
  async function prof(op, donnees) {
    if (DEMO) { alert("Mode démonstration : rien n'est envoyé."); return null; }
    const r = await fetch(URL_SERVEUR, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "prof", cle: CLE, op, ...donnees }) });
    const d = await r.json();
    if (!d.ok) { alert(d.erreur === "pas_de_code_deblocage" ? "Définissez d'abord le code de déblocage dans la Google Sheet (menu Évaluation)." : d.erreur === "operation" ? "Votre script Google n'est pas à jour : recollez Code.gs et déployez une nouvelle version." : "Action impossible : " + d.erreur); return null; }
    await charger();
    return d;
  }

  /* ---------- En direct ---------- */
  function dessinerDirect() {
    const g = $("direct-grille");
    if (!g || !BRUT) return;
    const maintenant = Date.now(), court = $("direct-prenoms").checked;
    const eleves = elevesFiltres(), parId = {};
    eleves.forEach(e => { parId[e.id] = { e, essais: [] }; });
    BRUT.essais.forEach(x => { if (parId[x[1]] && maintenant - x[0] < 60 * MIN) parId[x[1]].essais.push(x); });
    const tuiles = Object.values(parId).map(s => {
      s.essais.sort((a, b) => a[0] - b[0]);
      const dernier = s.essais[s.essais.length - 1];
      if (!dernier) return { s, classe: "inactif", ordre: 3, exo: "", info: "aucune activité depuis 1 h" };
      const exo = dernier[2], surExo = s.essais.filter(x => x[2] === exo);
      let echecs = 0; for (let i = s.essais.length - 1; i >= 0 && s.essais[i][2] === exo && !s.essais[i][3]; i--) echecs++;
      const reussiExo = surExo.some(x => x[3]);
      const depuisDebut = (maintenant - surExo[0][0]) / MIN, depuisDernier = (maintenant - dernier[0]) / MIN;
      const reussis = new Set(s.essais.filter(x => x[3]).map(x => x[2])).size;
      let classe = "actif", ordre = 2;
      if (echecs >= 3) { classe = "aide"; ordre = 0; }
      else if (!reussiExo && depuisDebut >= 10) { classe = "bloque"; ordre = 1; }
      else if (depuisDernier >= 10) { classe = "inactif"; ordre = 3; }
      return { s, classe, ordre, exo: libExo(exo), info: `${reussis} réussi${reussis > 1 ? "s" : ""} en 1 h · dernier essai il y a ${Math.round(depuisDernier)} min${echecs ? ` · ${echecs} échec${echecs > 1 ? "s" : ""} d'affilée` : ""}` };
    }).sort((a, b) => a.ordre - b.ordre || nomAff(a.s.e).localeCompare(nomAff(b.s.e)));
    g.innerHTML = tuiles.map(t => `<div class="tuile ${t.classe}"><b>${esc(nomAff(t.s.e, court))}</b>${t.exo ? `<span class="exo">${esc(t.exo)}</span>` : ""}<span class="info">${esc(t.info)}</span></div>`).join("") || `<p class="sous">Aucun élève dans cette classe.</p>`;
  }
  $("direct-prenoms").addEventListener("change", dessinerDirect);
  $("b-projecteur").addEventListener("click", () => {
    const v = $("vue-direct");
    v.classList.toggle("projecteur");
    $("b-projecteur").textContent = v.classList.contains("projecteur") ? "Quitter le plein écran" : "Plein écran (vidéoprojecteur)";
  });
  setInterval(() => { if (!document.hidden && BRUT && !$("vue-direct").hidden && !DEMO) charger(); }, 30000);

  /* ---------- Pilotage ---------- */
  const heureVersTs = hhmm => { const [h, m] = hhmm.split(":").map(Number); const d = new Date(); d.setHours(h, m, 0, 0); if (d < Date.now()) d.setDate(d.getDate() + 1); return d.getTime(); };
  const tsVersHeure = ts => new Date(ts).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  function dessinerPilotage() {
    if (!BRUT) return;
    const reg = BRUT.reglages || null;
    const classes = classesListe();
    const ouvertes = (BRUT.evaluations && BRUT.evaluations.ouvertes) || {};
    const zE = $("pil-evals"), zA = $("pil-acces"), zC = $("pil-conseils");
    if (!reg) {
      const m = `<p class="sous">Votre script Google n'est pas à jour : recollez le nouveau Code.gs dans la Google Sheet et déployez une nouvelle version pour piloter depuis ici.</p>`;
      zE.innerHTML = zA.innerHTML = zC.innerHTML = m;
    } else {
      const evals = reg.evaluations || (window.EVALUATIONS || []).map(e => e.id);
      const titre = id => ((window.EVALUATIONS || []).find(e => e.id === id) || {}).titre || id;
      const finDefaut = tsVersHeure(Date.now() + 55 * MIN).slice(0, 5);
      zE.innerHTML = classes.map(c => {
        const o = ouvertes[c], fin = reg.fins && reg.fins[c];
        return `<div class="pil-ligne" data-classe="${esc(c)}"><span class="classe">${esc(c)}</span>
          <span class="pil-etat ${o ? "ouvert" : ""}">${o ? `Ouverte : ${esc(titre(o))}${fin ? " · fermeture auto à " + tsVersHeure(fin) : ""}` : "Rien d'ouvert"}</span>
          <select class="ev">${evals.map(id => `<option value="${esc(id)}"${id === o ? " selected" : ""}>${esc(titre(id))}</option>`).join("")}</select>
          <label>fermer à <input type="time" class="fin" value="${finDefaut}"></label>
          <button class="bouton plein b-ouvrir" type="button">Ouvrir</button>${o ? `<button class="bouton b-fermer" type="button">Fermer</button>` : ""}</div>`;
      }).join("") || `<p class="sous">Aucune classe.</p>`;
      zE.querySelectorAll(".pil-ligne").forEach(l => {
        const c = l.dataset.classe;
        l.querySelector(".b-ouvrir").addEventListener("click", () => {
          const ev = l.querySelector(".ev").value, f = l.querySelector(".fin").value;
          if (confirm(`Ouvrir « ${titre(ev)} » pour la ${c}${f ? `, avec fermeture automatique à ${f}` : ""} ?`)) prof("ouvrir", { classe: c, evaluation: ev, fin: f ? heureVersTs(f) : null });
        });
        const bf = l.querySelector(".b-fermer");
        if (bf) bf.addEventListener("click", () => prof("fermer", { classe: c }));
      });
      zA.innerHTML = classes.map(c => {
        const ferme = !!(reg.acces || {})[c];
        return `<div class="pil-ligne" data-classe="${esc(c)}"><span class="classe">${esc(c)}</span><span class="pil-etat ${ferme ? "ferme" : "ouvert"}">${ferme ? "🔒 Exercices de classe fermés" : "Exercices de classe ouverts"}</span><button class="bouton" type="button">${ferme ? "Ouvrir les exercices" : "Fermer les exercices"}</button></div>`;
      }).join("");
      zA.querySelectorAll(".pil-ligne").forEach(l => l.querySelector("button").addEventListener("click", () => prof("acces", { classe: l.dataset.classe, ferme: !(reg.acces || {})[l.dataset.classe] })));
      dessinerConseils(reg, classes);
    }
    const sel = $("bs-classe"), garde = sel.value;
    sel.innerHTML = classes.map(c => `<option>${esc(c)}</option>`).join("");
    if (garde && classes.includes(garde)) sel.value = garde; else if (CLASSE !== "toutes") sel.value = CLASSE;
    if (!$("bs-jour").value) $("bs-jour").value = new Date().toLocaleDateString("sv-SE");
  }
  function dessinerConseils(reg, classes) {
    const z = $("pil-conseils"), tous = reg.conseils || {};
    const fait = {}; BRUT.essais.forEach(x => { if (x[3]) (fait[x[1]] = fait[x[1]] || new Set()).add(x[2]); });
    let html = "";
    classes.forEach(c => {
      const liste = tous[c] || [], eleves = BRUT.eleves.filter(e => e.classe === c);
      html += `<div class="pil-ligne" style="display:block"><span class="classe">${esc(c)}</span>`;
      if (!liste.length) html += ` <span class="sous">aucun conseil</span>`;
      liste.forEach((k, i) => {
        const tousFaits = eleves.filter(e => k.exos.every(id => fait[e.id] && fait[e.id].has(id)));
        const pasFaits = eleves.filter(e => !tousFaits.includes(e));
        html += `<div style="margin:.35rem 0 .35rem 1rem"><b>${esc(k.titre || "Exercices")}</b>${k.pour ? " · pour le " + esc(k.pour.split("-").reverse().join("/")) : ""} · ${k.exos.length} exercice(s) · <span class="ok-msg">${tousFaits.length}/${eleves.length} ont tout fait</span>
          <button class="bouton discret b-suppr" data-classe="${esc(c)}" data-i="${i}" type="button">Supprimer</button>
          <details><summary style="cursor:pointer;font-size:.88rem">Détail</summary><p class="sous" style="margin:.2rem 0">${k.exos.map(libExo).map(esc).join(" · ")}</p><p class="sous" style="margin:.2rem 0">Pas encore fini : ${pasFaits.map(e => esc(nomAff(e))).join(", ") || "personne"}</p></details></div>`;
      });
      html += `</div>`;
    });
    html += `<details style="margin-top:.6rem"><summary style="cursor:pointer;font-weight:700">+ Ajouter un conseil</summary>
      <div class="pil-ligne"><label>Classe <select id="cs-classe">${classes.map(c => `<option>${esc(c)}</option>`).join("")}</select></label>
      <label>Titre <input id="cs-titre" placeholder="Révisions avant l'évaluation" size="28"></label><label>Pour le <input type="date" id="cs-pour"></label></div>
      <div class="choix-exos">${NOMS_PARCOURS.map(p => `<h4>${p.entr ? "🏋️ " : ""}${esc(p.nom)}</h4>` + p.liste.flatMap((m, im) => m.exercices.map((e, ie) => `<label><input type="checkbox" value="${esc(e.id)}"> ${im + 1}.${ie + 1} ${esc(e.titre)}</label>`)).join("")).join("")}</div>
      <button class="bouton plein" id="cs-ajouter" type="button">Conseiller ces exercices</button></details>`;
    z.innerHTML = html;
    z.querySelectorAll(".b-suppr").forEach(b => b.addEventListener("click", () => {
      const c = b.dataset.classe, l = [...(tous[c] || [])]; l.splice(Number(b.dataset.i), 1);
      prof("conseils", { classe: c, liste: l });
    }));
    $("cs-ajouter").addEventListener("click", () => {
      const c = $("cs-classe").value, exos = [...z.querySelectorAll(".choix-exos input:checked")].map(i => i.value);
      if (!exos.length) { alert("Cochez au moins un exercice."); return; }
      prof("conseils", { classe: c, liste: [...(tous[c] || []), { titre: $("cs-titre").value.trim() || "Entraînement conseillé", pour: $("cs-pour").value, exos }] });
    });
  }

  /* ---------- Bilan de séance ---------- */
  $("b-bilan").addEventListener("click", () => {
    if (!BRUT) return;
    const c = $("bs-classe").value, jour = $("bs-jour").value;
    const [a, b] = [$("bs-debut").value || "00:00", $("bs-fin").value || "23:59"].map(h => new Date(`${jour}T${h}:00`).getTime());
    const eleves = BRUT.eleves.filter(e => e.classe === c), ids = new Set(eleves.map(e => e.id));
    const ess = BRUT.essais.filter(x => ids.has(x[1]) && x[0] >= a && x[0] <= b);
    const parE = {}; eleves.forEach(e => { parE[e.id] = { e, essais: 0, reussis: new Set(), notions: new Set() }; });
    const erreurs = {}, notions = {};
    ess.forEach(x => {
      const s = parE[x[1]]; s.essais++;
      if (x[3]) s.reussis.add(x[2]);
      else erreurs[x[7] || "Sortie"] = (erreurs[x[7] || "Sortie"] || 0) + 1;
      if (TOUS[x[2]]) { const n = `${TOUS[x[2]].parcours} : ${TOUS[x[2]].m.titre}`; notions[n] = (notions[n] || 0) + 1; }
    });
    const actifs = Object.values(parE).filter(s => s.essais), inactifs = Object.values(parE).filter(s => !s.essais);
    const totR = actifs.reduce((n, s) => n + s.reussis.size, 0);
    const top = [...actifs].sort((x, y) => y.reussis.size - x.reussis.size).slice(0, 5);
    const dateTxt = new Date(jour + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    const nomsErr = typeof nomErreur === "function" ? nomErreur : x => x;
    const lignes = [
      `Séance du ${dateTxt} · ${c} (${$("bs-debut").value}–${$("bs-fin").value})`,
      ``,
      `• Élèves actifs : ${actifs.length} / ${eleves.length}`,
      `• Exercices réussis : ${totR} (en moyenne ${actifs.length ? (totR / actifs.length).toFixed(1).replace(".", ",") : 0} par élève actif)`,
      `• Notions travaillées : ${Object.entries(notions).sort((x, y) => y[1] - x[1]).slice(0, 4).map(n => n[0]).join(" ; ") || "aucune"}`,
      `• Les plus avancés : ${top.filter(s => s.reussis.size).map(s => `${nomAff(s.e)} (${s.reussis.size})`).join(", ") || "—"}`,
      `• Sans activité : ${inactifs.map(s => nomAff(s.e)).join(", ") || "aucun"}`,
      `• Difficultés fréquentes : ${Object.entries(erreurs).sort((x, y) => y[1] - x[1]).slice(0, 3).map(([k, n]) => `${nomsErr(k)} (${n})`).join(", ") || "—"}`
    ];
    $("bs-texte").value = lignes.join("\n");
  });
  $("b-bilan-copier").addEventListener("click", async () => {
    const t = $("bs-texte").value; if (!t) return;
    try { await navigator.clipboard.writeText(t); $("b-bilan-copier").textContent = "Copié ✓"; } catch { $("bs-texte").select(); document.execCommand("copy"); }
    setTimeout(() => { $("b-bilan-copier").textContent = "Copier"; }, 2000);
  });

  /* ---------- Contrôle ---------- */
  function dessinerControle() {
    if (!BRUT) return;
    const eleves = elevesFiltres(), parId = Object.fromEntries(eleves.map(e => [e.id, e]));
    const ess = BRUT.essais.filter(x => parId[x[1]]);
    const zc = $("ctrl-copies"), zh = $("ctrl-hasard");
    if (ess.length && ess[0].length < 9) {
      zc.innerHTML = zh.innerHTML = `<p class="sous">Votre script Google n'est pas à jour : recollez le nouveau Code.gs et déployez une nouvelle version.</p>`;
      return;
    }
    const groupes = {};
    ess.forEach(x => { if (x[3] && x[8]) { const k = x[2] + "|" + x[8]; (groupes[k] = groupes[k] || {})[x[1]] = Math.min((groupes[k] || {})[x[1]] || Infinity, x[0]); } });
    // Les deux élèves d'un binôme envoient le même essai au même instant : on les regroupe, ce n'est pas une copie.
    const copies = Object.entries(groupes).map(([k, par]) => {
      const qui = Object.entries(par).sort((a, b) => a[1] - b[1]), paquets = [];
      qui.forEach(([id, t]) => { const p = paquets.find(x => Math.abs(x.t - t) < 3000); if (p) p.ids.push(id); else paquets.push({ t, ids: [id] }); });
      return { exo: k.split("|")[0], paquets };
    }).filter(g => g.paquets.length >= 2)
      .map(g => ({ ...g, ecart: Math.min(...g.paquets.slice(1).map((p, i) => (p.t - g.paquets[i].t) / MIN)) })).sort((a, b) => a.ecart - b.ecart);
    zc.innerHTML = copies.length ? copies.slice(0, 40).map(g => `<div style="${g.ecart < 20 ? "border-left-color:var(--ko)" : ""}"><b>${esc(libExo(g.exo))}</b> : ${g.paquets.map(p => `${p.ids.map(id => esc(nomAff(parId[id]))).join(" + ")}${p.ids.length > 1 ? " (même ordinateur)" : ""} (${dateHeure(p.t)})`).join(", ")}${g.ecart < 20 ? ` · <b style="color:var(--ko)">${Math.round(g.ecart)} min d'écart</b>` : ""}</div>`).join("")
      : `<p class="sous">Aucun code identique repéré.</p>`;
    const parEx = {};
    ess.forEach(x => { const k = x[1] + "|" + x[2]; (parEx[k] = parEx[k] || []).push(x); });
    const hasard = [];
    Object.entries(parEx).forEach(([k, l]) => {
      l.sort((a, b) => a[0] - b[0]);
      let rafale = 0, memes = 0, maxMemes = 0;
      for (let i = 0; i < l.length; i++) {
        let j = i; while (j + 1 < l.length && l[j + 1][0] - l[i][0] <= 2 * MIN) j++;
        rafale = Math.max(rafale, j - i + 1);
        if (i && l[i][8] && l[i][8] === l[i - 1][8] && !l[i][3]) { memes++; maxMemes = Math.max(maxMemes, memes + 1); } else memes = 0;
      }
      if (rafale >= 5 || maxMemes >= 3) { const [id, exo] = k.split("|"); hasard.push({ id, exo, rafale, maxMemes, n: l.length, t: l[l.length - 1][0] }); }
    });
    hasard.sort((a, b) => b.t - a.t);
    zh.innerHTML = hasard.length ? hasard.slice(0, 40).map(h => `<div><b>${esc(nomAff(parId[h.id]))}</b> · ${esc(libExo(h.exo))} : ${h.rafale >= 5 ? `${h.rafale} vérifications en 2 minutes` : ""}${h.rafale >= 5 && h.maxMemes >= 3 ? " · " : ""}${h.maxMemes >= 3 ? `${h.maxMemes} fois le même code de suite` : ""} <span class="sous">(${dateHeure(h.t)})</span></div>`).join("")
      : `<p class="sous">Rien de suspect.</p>`;
  }

  /* ---------- Export Pronote (onglet Évaluation) ---------- */
  const outils = document.querySelector(".ev-outils");
  if (outils) {
    outils.insertAdjacentHTML("beforeend", `<button class="bouton" id="b-pronote" type="button" title="Notes dans l'ordre alphabétique, une par ligne, à coller dans la colonne du devoir sur Pronote">Copier pour Pronote</button><button class="bouton" id="b-pronote-csv" type="button">CSV Pronote</button>`);
    const lignesPronote = () => {
      const meta = LISTE_EVALS.find(e => e.id === EVAL_CHOISIE);
      if (!meta || !BRUT) return [];
      return etatsEvaluation(calculer(), meta.id).map(x => ({ nom: (x.s.nom || "").toUpperCase(), prenom: x.s.prenom || "", note: x.rendu ? String(noteSur20(x.rendu)).replace(".", ",") : "Abs" }))
        .sort((a, b) => a.nom.localeCompare(b.nom, "fr") || a.prenom.localeCompare(b.prenom, "fr"));
    };
    $("b-pronote").addEventListener("click", async () => {
      const l = lignesPronote(); if (!l.length) return;
      const t = l.map(x => x.note).join("\n");
      try { await navigator.clipboard.writeText(t); } catch {}
      alert(`${l.length} notes copiées, dans l'ordre alphabétique (${l[0].nom} ${l[0].prenom} en premier).\n\nDans Pronote : Notes → Saisie des notes → votre devoir, cliquez dans la case du premier élève, puis Ctrl+V.\nVérifiez que l'ordre des élèves est le même. « Abs » = copie non rendue.`);
    });
    $("b-pronote-csv").addEventListener("click", () => {
      const l = lignesPronote(); if (!l.length) return;
      const csv = "﻿Nom;Prénom;Note\r\n" + l.map(x => `${x.nom};${x.prenom};${x.note}`).join("\r\n");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      a.download = `pronote-${EVAL_CHOISIE}-${CLASSE === "toutes" ? "toutes" : CLASSE.replace(/\s+/g, "-")}.csv`;
      document.body.appendChild(a); a.click(); a.remove();
    });
  }

  /* ---------- Branchement ---------- */
  const ancien = toutDessiner;
  window.toutDessiner = toutDessiner = function () {
    ancien();
    try { dessinerDirect(); dessinerPilotage(); dessinerControle(); } catch (e) { console.error(e); }
  };
  if (BRUT) toutDessiner();
})();
