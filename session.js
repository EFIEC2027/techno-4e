/*
 * Session des pages 4e : un élève seul ou deux élèves (binôme) sur le même ordinateur.
 * Chaque élève garde sa propre progression ; chaque essai est enregistré pour chacun des deux.
 */
window.Session = (function () {
  "use strict";
  const URL_SERVEUR = (window.CONFIG && CONFIG.url || "").trim();
  const DEMO = !URL_SERVEUR;
  const CLE = "techno:session", CLE_MSG = "techno:message";
  const local = {
    lire(cle, defaut) { try { const v = localStorage.getItem(cle); return v ? JSON.parse(v) : defaut; } catch { return defaut; } },
    ecrire(cle, v) { try { localStorage.setItem(cle, JSON.stringify(v)); } catch {} },
    suppr(cle) { try { localStorage.removeItem(cle); } catch {} }
  };
  async function appelGet(params) {
    const r = await fetch(URL_SERVEUR + "?" + new URLSearchParams(params));
    return r.json();
  }
  const session = () => local.lire(CLE, null);
  const membres = () => (session() || { membres: [] }).membres;
  const cleEquipe = () => "techno-eq:" + membres().map(m => m.id).sort().join("+");
  const noms = () => membres().map(m => m.prenom || m.id).join(" et ");

  /* Progression d'un élève : réussis, tentés, essais à envoyer. */
  const progression = id => Object.assign({ reussis: [], tentes: [], file: [] }, local.lire("techno:" + id, {}));
  const sauverProgression = (id, p) => local.ecrire("techno:" + id, p);
  /* Programmes et réponses de l'équipe en cours. */
  const travail = () => Object.assign({ codes: {}, temps: {} }, local.lire(cleEquipe(), {}));
  const sauverTravail = w => local.ecrire(cleEquipe(), w);

  /** Exercices réussis par tous les membres présents. */
  function reussisEquipe() {
    const ms = membres();
    if (!ms.length) return new Set();
    const listes = ms.map(m => new Set(progression(m.id).reussis));
    return new Set([...listes[0]].filter(x => listes.every(l => l.has(x))));
  }
  function tentesEquipe() {
    const s = new Set();
    membres().forEach(m => { const p = progression(m.id); p.tentes.forEach(x => s.add(x)); p.reussis.forEach(x => s.add(x)); });
    return s;
  }
  /** Enregistre un essai pour chaque membre. */
  function enregistrer(essai) {
    membres().forEach(m => {
      const p = progression(m.id);
      p.file.push(essai);
      if (!p.tentes.includes(essai.exo)) p.tentes.push(essai.exo);
      if (essai.reussi && !p.reussis.includes(essai.exo)) p.reussis.push(essai.exo);
      sauverProgression(m.id, p);
    });
    envoyer();
  }
  const enAttente = () => membres().reduce((n, m) => n + progression(m.id).file.length, 0);

  let envoiEnCours = false;
  const ecouteurs = [];
  const prevenir = () => ecouteurs.forEach(f => { try { f(); } catch {} });
  async function envoyer() {
    prevenir();
    if (DEMO || envoiEnCours || !navigator.onLine) return;
    envoiEnCours = true;
    for (const m of membres()) {
      const p = progression(m.id);
      if (!p.file.length) continue;
      const lot = p.file.slice(0, 20);
      try {
        const r = await fetch(URL_SERVEUR, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ action: "essais", id: m.id, code: m.code, essais: lot }) });
        const d = await r.json();
        const p2 = progression(m.id);
        if (d.ok) { p2.file.splice(0, lot.length); sauverProgression(m.id, p2); }
        else if (d.erreur === "identifiant_ou_code") { p2.file = []; sauverProgression(m.id, p2); envoiEnCours = false; quitter(`Le code de ${m.prenom || m.id} a changé. Reconnectez-vous.`); return; }
      } catch { /* nouvel essai plus tard */ }
    }
    envoiEnCours = false;
    prevenir();
    if (enAttente()) setTimeout(envoyer, 5000);
  }
  setInterval(envoyer, 30000);
  window.addEventListener("online", envoyer);
  document.addEventListener("visibilitychange", () => { if (document.hidden) envoyer(); });

  /** Récupère sur le serveur ce que chaque membre a déjà réussi (autre poste, autre binôme). */
  async function resynchroniser() {
    if (DEMO) return;
    await Promise.all(membres().map(async m => {
      try {
        const d = await appelGet({ action: "connexion", id: m.id, code: m.code });
        if (!d.ok) return;
        const p = progression(m.id);
        (d.reussis || []).forEach(x => { if (!p.reussis.includes(x)) p.reussis.push(x); });
        Object.keys(d.codes || {}).forEach(x => { if (!p.tentes.includes(x)) p.tentes.push(x); });
        sauverProgression(m.id, p);
      } catch {}
    }));
    prevenir();
  }

  async function connecterUn(id, code) {
    id = String(id || "").trim().toLowerCase();
    if (DEMO) return { ok: true, eleve: { id, code: "", prenom: id, classe: "démo" } };
    const d = await appelGet({ action: "connexion", id, code: String(code || "").trim() });
    if (!d.ok) return { ok: false };
    const p = progression(id);
    (d.reussis || []).forEach(x => { if (!p.reussis.includes(x)) p.reussis.push(x); });
    sauverProgression(id, p);
    return { ok: true, eleve: { id, code: String(code).trim(), prenom: d.prenom, classe: d.classe } };
  }
  function ouvrir(liste) { local.ecrire(CLE, { membres: liste }); }
  async function quitter(message) {
    if (!message && enAttente() && !DEMO) await Promise.race([envoyer(), new Promise(r => setTimeout(r, 4000))]);
    local.suppr(CLE);
    if (message) local.ecrire(CLE_MSG, message);
    location.href = "index.html";
  }
  function message() { const m = local.lire(CLE_MSG, null); if (m) local.suppr(CLE_MSG); return m; }
  /** Pages d'exercices et de cours : renvoie vers l'accueil si personne n'est connecté. */
  function exiger() { if (!session()) { location.replace("index.html"); return false; } return true; }

  return { DEMO, URL_SERVEUR, local, appelGet, session, membres, noms, cleEquipe, progression, travail, sauverTravail,
    reussisEquipe, tentesEquipe, enregistrer, enAttente, envoyer, resynchroniser, connecterUn, ouvrir, quitter, message, exiger,
    surChangement: f => ecouteurs.push(f) };
})();
