/*
 * Moteur du parcours « Programmer un objet » (4e).
 * - blocs en français, style Scratch (Blockly, rendu « zelos ») ;
 * - simulation d'un objet technique : capteurs (scénario de test) et actionneurs ;
 * - vérification par tests et chronogramme.
 *
 * Description d'un objet :
 *   capteurs:    { presence: { label: "présence détectée", type: "bool" },
 *                  lumiere:  { label: "luminosité", type: "num", unite: "%" } }
 *   actionneurs: { lampe:   { label: "la lampe", type: "tor", on: "allumée", off: "éteinte" },
 *                  portail: { label: "moteur du portail", type: "etats",
 *                             etats: [["arret", "arrêter", "arrêté"], ["ouvrir", "ouvrir", "ouvre"]] },
 *                  ecran:   { label: "l'écran", type: "ecran" } }
 *   variables:   ["compteur"]
 *
 * Programmes écrits en abrégé (pour les exercices, les cours et les évaluations) :
 *   ["attendre", 2]  ["toujours", [...]]  ["fois", 3, [...]]  ["jusqua", cond, [...]]
 *   ["si", cond, [...]]  ["sisinon", cond, [...], [...]]
 *   ["allumer", "lampe"]  ["eteindre", "lampe"]  ["moteur", "portail", "ouvrir"]  ["ecran", expr]
 *   ["mettre", "compteur", expr]  ["ajouter", "compteur", expr]
 *   expressions : 12  "texte"  ["capteur", "presence"]  ["cmp", a, "<", b]  ["et", a, b]  ["ou", a, b]
 *                 ["non", a]  ["calc", a, "+", b]  ["var", "compteur"]  null (case vide)
 */
(function (racine, fabrique) {
  if (typeof module === "object" && module.exports) module.exports = fabrique;
  else racine.Blocs = fabrique(racine.Blockly, racine.javascript);
})(typeof self !== "undefined" ? self : this, function (Blockly, JS) {
  "use strict";

  const COUL = { evenement: "#FFBF00", controle: "#FFAB19", capteur: "#5CB1D6", action: "#9966FF", operateur: "#59C059", variable: "#FF8C1A" };
  const VIDE = { capteurs: {}, actionneurs: {}, variables: [] };
  let OBJET = VIDE;
  const fixerObjet = o => { OBJET = o || VIDE; };

  /* ---------- Petits utilitaires ---------- */
  const arrondi = t => Math.round(t * 1000) / 1000;
  function fmt(x) {
    if (typeof x === "boolean") return x ? "oui" : "non";
    if (typeof x === "number") return Number.isInteger(x) ? String(x) : String(Math.round(x * 100) / 100).replace(".", ",");
    return String(x);
  }
  const court = l => String(l).replace(/^(la |le |les |l['’])/i, "");
  const esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const libCapteur = (c) => c.type === "bool" ? c.label + " ?" : c.label + (c.unite ? ` (${c.unite})` : "");
  const motsTor = a => ({ on: a.on || "allumé", off: a.off || "éteint" });
  function etatsMoteur(a) { return (a.etats || []).map(e => Array.isArray(e) ? e : [e, e, e]); }
  function initial(nom, o) {
    const a = o.actionneurs[nom];
    if (!a) return 0;
    if (a.type === "tor") return false;
    if (a.type === "etats") return etatsMoteur(a)[0][0];
    return "";
  }
  function texteEtat(nom, v, o) {
    const a = o.actionneurs[nom];
    if (!a) return fmt(v);
    if (a.type === "tor") return v ? motsTor(a).on : motsTor(a).off;
    if (a.type === "etats") { const e = etatsMoteur(a).find(x => x[0] === v); return e ? e[2] : String(v); }
    return v === "" ? "(rien)" : fmt(v);
  }
  function options(liste) { return liste.length ? liste : [["(aucun)", "_"]]; }
  const optCapteurs = type => () => options(Object.entries(OBJET.capteurs).filter(([, c]) => c.type === type).map(([k, c]) => [libCapteur(c), k]));
  const optTor = () => options(Object.entries(OBJET.actionneurs).filter(([, a]) => a.type === "tor").map(([k, a]) => [a.label, k]));
  const optMoteurs = () => options(Object.entries(OBJET.actionneurs).filter(([, a]) => a.type === "etats").map(([k, a]) => [a.label, k]));
  function optEtats(nom) {
    let a = OBJET.actionneurs[nom];
    if (!a || a.type !== "etats") a = Object.values(OBJET.actionneurs).find(x => x.type === "etats");
    return a ? etatsMoteur(a).map(e => [e[1], e[0]]) : [["(aucun)", "_"]];
  }

  /* ---------- Définition des blocs ---------- */
  if (Blockly) {
    const B = Blockly.Blocks;
    const num = (blk, nom) => blk.appendValueInput(nom).setCheck(["Number", "String"]);
    B.quand_demarre = { init() {
      this.appendDummyInput().appendField("quand le système démarre");
      this.setNextStatement(true); this.setColour(COUL.evenement); this.hat = "cap";
      this.setTooltip("Le programme commence ici. Les blocs accrochés en dessous sont exécutés dans l'ordre.");
    } };
    B.attendre = { init() {
      num(this, "DUREE").appendField("attendre");
      this.appendDummyInput().appendField("secondes");
      this.setInputsInline(true); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(COUL.controle);
    } };
    B.repeter_toujours = { init() {
      this.appendDummyInput().appendField("répéter indéfiniment");
      this.appendStatementInput("FAIRE");
      this.setPreviousStatement(true); this.setColour(COUL.controle);
      this.setTooltip("Répète les blocs à l'intérieur sans jamais s'arrêter.");
    } };
    B.repeter_fois = { init() {
      num(this, "N").appendField("répéter");
      this.appendDummyInput().appendField("fois");
      this.appendStatementInput("FAIRE");
      this.setInputsInline(true); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(COUL.controle);
    } };
    B.repeter_jusqua = { init() {
      this.appendValueInput("COND").setCheck("Boolean").appendField("répéter jusqu'à ce que");
      this.appendStatementInput("FAIRE");
      this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(COUL.controle);
      this.setTooltip("Répète les blocs à l'intérieur tant que la condition est fausse, puis passe à la suite.");
    } };
    B.si_alors = { init() {
      this.appendValueInput("COND").setCheck("Boolean").appendField("si");
      this.appendDummyInput().appendField("alors");
      this.appendStatementInput("ALORS");
      this.setInputsInline(true); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(COUL.controle);
    } };
    B.si_sinon = { init() {
      this.appendValueInput("COND").setCheck("Boolean").appendField("si");
      this.appendDummyInput().appendField("alors");
      this.appendStatementInput("ALORS");
      this.appendDummyInput().appendField("sinon");
      this.appendStatementInput("SINON");
      this.setInputsInline(true); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(COUL.controle);
    } };
    B.capteur_bool = { init() {
      this.appendDummyInput().appendField(new Blockly.FieldDropdown(optCapteurs("bool")), "NOM");
      this.setOutput(true, "Boolean"); this.setColour(COUL.capteur);
      this.setTooltip("Vrai si le capteur détecte quelque chose, faux sinon.");
    } };
    B.capteur_num = { init() {
      this.appendDummyInput().appendField(new Blockly.FieldDropdown(optCapteurs("num")), "NOM");
      this.setOutput(true, "Number"); this.setColour(COUL.capteur);
      this.setTooltip("La valeur mesurée par le capteur à cet instant.");
    } };
    B.allumer = { init() {
      this.appendDummyInput().appendField("allumer").appendField(new Blockly.FieldDropdown(optTor), "NOM");
      this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(COUL.action);
    } };
    B.eteindre = { init() {
      this.appendDummyInput().appendField("éteindre").appendField(new Blockly.FieldDropdown(optTor), "NOM");
      this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(COUL.action);
    } };
    B.moteur = { init() {
      const bloc = this;
      const etats = new Blockly.FieldDropdown(function () { return optEtats(bloc.getFieldValue("NOM")); });
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(optMoteurs, function (v) { const o = optEtats(v); if (o[0]) etats.setValue(o[0][1]); return v; }), "NOM")
        .appendField(":").appendField(etats, "ETAT");
      this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(COUL.action);
    } };
    B.ecran = { init() {
      this.appendValueInput("VAL").appendField("afficher");
      this.appendDummyInput().appendField("sur l'écran");
      this.setInputsInline(true); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(COUL.action);
    } };
    B.op_compare = { init() {
      num(this, "A");
      this.appendDummyInput().appendField(new Blockly.FieldDropdown([["<", "<"], [">", ">"], ["=", "="]]), "OP");
      num(this, "B");
      this.setInputsInline(true); this.setOutput(true, "Boolean"); this.setColour(COUL.operateur);
    } };
    B.op_et = { init() {
      this.appendValueInput("A").setCheck("Boolean");
      this.appendValueInput("B").setCheck("Boolean").appendField("et");
      this.setInputsInline(true); this.setOutput(true, "Boolean"); this.setColour(COUL.operateur);
      this.setTooltip("Vrai seulement si les deux conditions sont vraies.");
    } };
    B.op_ou = { init() {
      this.appendValueInput("A").setCheck("Boolean");
      this.appendValueInput("B").setCheck("Boolean").appendField("ou");
      this.setInputsInline(true); this.setOutput(true, "Boolean"); this.setColour(COUL.operateur);
      this.setTooltip("Vrai si au moins une des deux conditions est vraie.");
    } };
    B.op_non = { init() {
      this.appendValueInput("A").setCheck("Boolean").appendField("non");
      this.setInputsInline(true); this.setOutput(true, "Boolean"); this.setColour(COUL.operateur);
      this.setTooltip("Inverse la condition : vrai devient faux, faux devient vrai.");
    } };
    B.op_calcul = { init() {
      num(this, "A");
      this.appendDummyInput().appendField(new Blockly.FieldDropdown([["+", "+"], ["−", "-"], ["×", "*"], ["÷", "/"]]), "OP");
      num(this, "B");
      this.setInputsInline(true); this.setOutput(true, "Number"); this.setColour(COUL.operateur);
    } };
    B.var_mettre = { init() {
      this.appendValueInput("VAL").setCheck(["Number", "String"]).appendField("mettre").appendField(new Blockly.FieldVariable("compteur"), "VAR").appendField("à");
      this.setInputsInline(true); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(COUL.variable);
    } };
    B.var_ajouter = { init() {
      this.appendValueInput("VAL").setCheck(["Number", "String"]).appendField("ajouter");
      this.appendDummyInput().appendField("à").appendField(new Blockly.FieldVariable("compteur"), "VAR");
      this.setInputsInline(true); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(COUL.variable);
      this.setTooltip("Ajoute ce nombre à la variable. Pour enlever 1, ajoute -1.");
    } };
    B.var_lire = { init() {
      this.appendDummyInput().appendField(new Blockly.FieldVariable("compteur"), "VAR");
      this.setOutput(true, "Number"); this.setColour(COUL.variable);
    } };
  }

  /* ---------- Traduction des blocs en JavaScript exécutable ---------- */
  let compteurBoucles = 0;
  if (JS) {
    const G = JS.javascriptGenerator, O = JS.Order;
    const val = (b, nom, defaut) => G.valueToCode(b, nom, O.NONE) || defaut;
    const nomVar = b => { const v = b.getField("VAR").getVariable(); return JSON.stringify(v ? v.name : "?"); };
    const F = G.forBlock;
    F.quand_demarre = () => "";
    F.attendre = b => `api.attendre(${val(b, "DUREE", "0")});\n`;
    F.repeter_toujours = b => `while (true) {\n  api.tour(${JSON.stringify(b.id)});\n${G.statementToCode(b, "FAIRE")}}\n`;
    F.repeter_fois = b => { const i = "i" + (++compteurBoucles); return `for (let ${i} = 0, n${i} = api.nombre(${val(b, "N", "0")}); ${i} < n${i}; ${i}++) {\n  api.pas();\n${G.statementToCode(b, "FAIRE")}}\n`; };
    F.repeter_jusqua = b => `while (!api.vrai(${val(b, "COND", "false")})) {\n  api.tour(${JSON.stringify(b.id)});\n${G.statementToCode(b, "FAIRE")}}\n`;
    F.si_alors = b => `if (api.vrai(${val(b, "COND", "false")})) {\n${G.statementToCode(b, "ALORS")}}\n`;
    F.si_sinon = b => `if (api.vrai(${val(b, "COND", "false")})) {\n${G.statementToCode(b, "ALORS")}} else {\n${G.statementToCode(b, "SINON")}}\n`;
    F.capteur_bool = b => [`api.c(${JSON.stringify(b.getFieldValue("NOM"))})`, O.FUNCTION_CALL];
    F.capteur_num = b => [`api.c(${JSON.stringify(b.getFieldValue("NOM"))})`, O.FUNCTION_CALL];
    F.allumer = b => `api.a(${JSON.stringify(b.getFieldValue("NOM"))}, true);\n`;
    F.eteindre = b => `api.a(${JSON.stringify(b.getFieldValue("NOM"))}, false);\n`;
    F.moteur = b => `api.a(${JSON.stringify(b.getFieldValue("NOM"))}, ${JSON.stringify(b.getFieldValue("ETAT"))});\n`;
    F.ecran = b => `api.ecran(${val(b, "VAL", "\"\"")});\n`;
    F.op_compare = b => [`api.comparer(${val(b, "A", "0")}, ${JSON.stringify(b.getFieldValue("OP"))}, ${val(b, "B", "0")})`, O.FUNCTION_CALL];
    F.op_et = b => [`(api.vrai(${val(b, "A", "false")}) && api.vrai(${val(b, "B", "false")}))`, O.ATOMIC];
    F.op_ou = b => [`(api.vrai(${val(b, "A", "false")}) || api.vrai(${val(b, "B", "false")}))`, O.ATOMIC];
    F.op_non = b => [`(!api.vrai(${val(b, "A", "false")}))`, O.ATOMIC];
    F.op_calcul = b => [`api.calcul(${val(b, "A", "0")}, ${JSON.stringify(b.getFieldValue("OP"))}, ${val(b, "B", "0")})`, O.FUNCTION_CALL];
    F.var_mettre = b => `api.mettre(${nomVar(b)}, ${val(b, "VAL", "0")});\n`;
    F.var_ajouter = b => `api.mettre(${nomVar(b)}, api.calcul(api.lire(${nomVar(b)}), "+", ${val(b, "VAL", "0")}));\n`;
    F.var_lire = b => [`api.lire(${nomVar(b)})`, O.FUNCTION_CALL];
  }

  /** Analyse l'espace de travail : code à exécuter, blocs utilisés, problèmes de construction. */
  function compiler(ws) {
    const G = JS.javascriptGenerator;
    const hauts = ws.getTopBlocks(true);
    const departs = hauts.filter(b => b.type === "quand_demarre");
    const problemes = [];
    if (!departs.length) return { code: "", types: new Set(), problemes: ["Il manque le bloc « quand le système démarre » : ton programme doit commencer par lui."], isoles: 0 };
    if (departs.length > 1) problemes.push("Il y a plusieurs blocs « quand le système démarre ». Garde-en un seul.");
    const depart = departs[0];
    const isoles = hauts.filter(b => b !== depart && !b.isShadow()).length;
    const types = new Set();
    depart.getDescendants(false).forEach(b => {
      types.add(b.type);
      if (["si_alors", "si_sinon", "repeter_jusqua"].includes(b.type) && !b.getInputTargetBlock("COND"))
        problemes.push(`Le bloc « ${b.type === "repeter_jusqua" ? "répéter jusqu'à ce que" : "si"} » n'a pas de condition : glisse un capteur ou une comparaison dans la case hexagonale.`);
      if (["op_et", "op_ou"].includes(b.type) && (!b.getInputTargetBlock("A") || !b.getInputTargetBlock("B")))
        problemes.push(`Le bloc « ${b.type === "op_et" ? "et" : "ou"} » a une case vide : il faut une condition de chaque côté.`);
      if (b.type === "op_non" && !b.getInputTargetBlock("A")) problemes.push("Le bloc « non » est vide : mets une condition dedans.");
    });
    compteurBoucles = 0;
    G.init(ws);
    const code = G.blockToCode(depart);
    return { code: typeof code === "string" ? code : "", types, problemes: [...new Set(problemes)], isoles };
  }

  /* ---------- Simulation ---------- */
  const FIN = { fin: true }, TROP = { trop: true };
  /** Exécute le programme sur un scénario. Renvoie le journal des changements et l'heure de fin. */
  function executer(code, test, objet) {
    const o = objet || VIDE, duree = test.duree;
    let t = 0, budget = 200000;
    const dernierTour = {};
    const etats = {};
    Object.keys(o.actionneurs).forEach(k => { etats[k] = initial(k, o); });
    (o.variables || []).forEach(k => { etats["$" + k] = 0; });
    const journal = [];
    const capteur = nom => {
      const c = o.capteurs[nom];
      let v = c && c.type === "num" ? 0 : false;
      for (const [ti, vi] of (test.capteurs && test.capteurs[nom]) || []) if (ti <= t + 1e-9) v = vi;
      return v;
    };
    const changer = (nom, v) => {
      if (--budget < 0) throw TROP;
      if (!(nom in etats)) return;
      if (etats[nom] !== v) { etats[nom] = v; journal.push({ t: arrondi(t), nom, val: v }); }
    };
    const nombre = x => { const n = typeof x === "number" ? x : parseFloat(String(x).replace(",", ".")); return isNaN(n) ? 0 : n; };
    const api = {
      c: capteur,
      a: changer,
      ecran: x => { if ("ecran" in etats) changer("ecran", fmt(x)); },
      attendre: s => { s = nombre(s); if (s > 0) t = arrondi(t + s); if (--budget < 0) throw TROP; if (t > duree) throw FIN; },
      // Un tour de boucle sans attente dure 0,1 s (temps de cycle du microcontrôleur) ;
      // si le tour précédent contenait déjà une attente, on n'ajoute rien.
      tour: id => { if (dernierTour[id] === t) t = arrondi(t + 0.1); dernierTour[id] = t; if (--budget < 0) throw TROP; if (t > duree) throw FIN; },
      pas: () => { if (--budget < 0) throw TROP; },
      nombre,
      vrai: x => x === true || x === "true",
      comparer: (a, op, b) => {
        const na = nombre(a), nb = nombre(b);
        if (op === "<") return na < nb;
        if (op === ">") return na > nb;
        const sa = String(a).trim().toLowerCase(), sb = String(b).trim().toLowerCase();
        return !isNaN(parseFloat(sa)) && !isNaN(parseFloat(sb)) ? na === nb : sa === sb;
      },
      calcul: (a, op, b) => {
        const na = nombre(a), nb = nombre(b);
        const r = op === "+" ? na + nb : op === "-" ? na - nb : op === "*" ? na * nb : nb === 0 ? 0 : na / nb;
        return Math.round(r * 1e9) / 1e9;
      },
      mettre: (k, v) => changer("$" + k, typeof v === "number" ? v : nombre(v)),
      lire: k => etats["$" + k] === undefined ? 0 : etats["$" + k]
    };
    let erreur = null;
    try { new Function("api", code)(api); }
    catch (e) {
      if (e === FIN) { /* durée du scénario atteinte */ }
      else if (e === TROP) erreur = "boucle";
      else erreur = "interne";
    }
    return { journal, tFin: Math.min(t, duree), erreur, duree };
  }

  /** États (actionneurs et variables) à l'instant t. */
  function etatsA(res, objet, t) {
    const o = objet || VIDE, e = {};
    Object.keys(o.actionneurs).forEach(k => { e[k] = initial(k, o); });
    (o.variables || []).forEach(k => { e["$" + k] = 0; });
    res.journal.forEach(j => { if (j.t <= t + 1e-9) e[j.nom] = j.val; });
    return e;
  }
  function capteursA(test, objet, t) {
    const e = {};
    Object.entries(objet.capteurs).forEach(([k, c]) => {
      let v = c.type === "num" ? 0 : false;
      for (const [ti, vi] of (test.capteurs && test.capteurs[k]) || []) if (ti <= t + 1e-9) v = vi;
      e[k] = v;
    });
    return e;
  }
  const libelle = (nom, o) => nom.startsWith("$") ? "la variable " + nom.slice(1) : (o.actionneurs[nom] || {}).label || nom;
  function egal(a, b) { return typeof a === "string" || typeof b === "string" ? String(a).trim().toLowerCase() === String(b).trim().toLowerCase() : a === b; }
  function cleVerif(k) { return k.startsWith("$") || k.startsWith("var:") ? "$" + k.replace(/^(\$|var:)/, "") : k; }

  /** Vérifie un résultat d'exécution contre les points de contrôle d'un test. */
  function controler(res, test, objet) {
    const marques = [];
    (test.verifs || []).forEach(([t, attendus]) => {
      const e = etatsA(res, objet, t);
      Object.entries(attendus).forEach(([k0, v]) => {
        const k = cleVerif(k0);
        const obtenu = e[k];
        const attendu = objet.actionneurs[k] && objet.actionneurs[k].type === "ecran" ? fmt(v) : v;
        const ok = egal(obtenu, attendu);
        marques.push({ t, nom: k, ok, attendu, obtenu, message: ok ? "" : messageEcart(t, k, attendu, obtenu, test, objet) });
      });
    });
    return marques;
  }
  function messageEcart(t, k, attendu, obtenu, test, o) {
    const qui = libelle(k, o), a = o.actionneurs[k];
    let phrase;
    if (k.startsWith("$")) phrase = `${qui} devrait valoir ${fmt(attendu)}, mais elle vaut ${fmt(obtenu)}`;
    else if (a && a.type === "ecran") phrase = `${qui} devrait afficher « ${attendu} », mais il affiche ${obtenu === "" ? "rien" : "« " + obtenu + " »"}`;
    else if (a && a.type === "etats") phrase = `${qui} : on attendait « ${texteEtat(k, attendu, o)} », mais il est « ${texteEtat(k, obtenu, o)} »`;
    else phrase = `${qui} devrait être ${texteEtat(k, attendu, o)}, mais ${a && (a.genre === "f" || /^la /i.test(a.label)) ? "elle" : "il"} est ${texteEtat(k, obtenu, o)}`;
    const caps = capteursA(test, o, t);
    const ctx = Object.entries(caps).filter(([k2]) => test.capteurs && test.capteurs[k2]).map(([k2, v]) => `${o.capteurs[k2].label} : ${fmt(v)}${o.capteurs[k2].unite ? " " + o.capteurs[k2].unite : ""}`);
    return `À ${fmt(t)} s, ${phrase}.` + (ctx.length ? ` (À cet instant : ${ctx.join(" ; ")}.)` : "");
  }

  /** Lance tous les tests d'un exercice sur un code compilé. */
  function verifierTests(code, exo) {
    return exo.tests.map(test => {
      const res = executer(code, test, exo.objet);
      const marques = res.erreur ? [] : controler(res, test, exo.objet);
      return { test, res, marques, ok: !res.erreur && marques.every(m => m.ok) };
    });
  }
  /** Règles de construction (blocs obligatoires ou interdits). */
  function regles(types, exo) {
    const p = [];
    (exo.exige || []).forEach(r => { const l = [].concat(r.bloc); if (!l.some(x => types.has(x))) p.push(r.message); });
    (exo.interdit || []).forEach(r => { const l = [].concat(r.bloc); if (l.some(x => types.has(x))) p.push(r.message); });
    return p;
  }

  /* ---------- Programme abrégé → blocs Blockly ---------- */
  function depuisAbrege(prog, objet) {
    const o = objet || VIDE;
    const vars = new Map((o.variables || []).map((v, i) => [v, "var_" + i]));
    const idVar = n => { if (!vars.has(n)) vars.set(n, "var_" + vars.size); return vars.get(n); };
    const nombreOmbre = n => ({ shadow: { type: "math_number", fields: { NUM: typeof n === "number" ? n : 0 } } });
    const texteOmbre = s => ({ shadow: { type: "text", fields: { TEXT: s } } });
    function valeur(e, ombre) {
      const base = ombre === "texte" ? texteOmbre("") : ombre === "nombre" ? nombreOmbre(0) : {};
      if (e === null || e === undefined) return ombre ? base : null;
      if (typeof e === "number") return nombreOmbre(e);
      if (typeof e === "string") return ombre === "nombre" ? nombreOmbre(parseFloat(e) || 0) : texteOmbre(e);
      return Object.assign({}, base, { block: expr(e) });
    }
    function entrees(map) { const r = {}; Object.entries(map).forEach(([k, v]) => { if (v) r[k] = v; }); return r; }
    function expr(e) {
      const [t, ...a] = e;
      if (t === "capteur") return { type: (o.capteurs[a[0]] || {}).type === "num" ? "capteur_num" : "capteur_bool", fields: { NOM: a[0] } };
      if (t === "cmp") return { type: "op_compare", fields: { OP: a[1] }, inputs: entrees({ A: valeur(a[0], "nombre"), B: valeur(a[2], "nombre") }) };
      if (t === "et" || t === "ou") return { type: "op_" + t, inputs: entrees({ A: valeur(a[0]), B: valeur(a[1]) }) };
      if (t === "non") return { type: "op_non", inputs: entrees({ A: valeur(a[0]) }) };
      if (t === "calc") return { type: "op_calcul", fields: { OP: a[1] }, inputs: entrees({ A: valeur(a[0], "nombre"), B: valeur(a[2], "nombre") }) };
      if (t === "var") return { type: "var_lire", fields: { VAR: { id: idVar(a[0]) } } };
      throw new Error("expression inconnue : " + t);
    }
    function instr(s) {
      const [t, ...a] = s;
      switch (t) {
        case "attendre": return { type: "attendre", inputs: entrees({ DUREE: valeur(a[0], "nombre") }) };
        case "toujours": return { type: "repeter_toujours", inputs: entrees({ FAIRE: suite(a[0]) }) };
        case "fois": return { type: "repeter_fois", inputs: entrees({ N: valeur(a[0], "nombre"), FAIRE: suite(a[1]) }) };
        case "jusqua": return { type: "repeter_jusqua", inputs: entrees({ COND: valeur(a[0]), FAIRE: suite(a[1]) }) };
        case "si": return { type: "si_alors", inputs: entrees({ COND: valeur(a[0]), ALORS: suite(a[1]) }) };
        case "sisinon": return { type: "si_sinon", inputs: entrees({ COND: valeur(a[0]), ALORS: suite(a[1]), SINON: suite(a[2]) }) };
        case "allumer": return { type: "allumer", fields: { NOM: a[0] } };
        case "eteindre": return { type: "eteindre", fields: { NOM: a[0] } };
        case "moteur": return { type: "moteur", fields: { NOM: a[0], ETAT: a[1] } };
        case "ecran": return { type: "ecran", inputs: entrees({ VAL: valeur(a[0], "texte") }) };
        case "mettre": return { type: "var_mettre", fields: { VAR: { id: idVar(a[0]) } }, inputs: entrees({ VAL: valeur(a[1], "nombre") }) };
        case "ajouter": return { type: "var_ajouter", fields: { VAR: { id: idVar(a[0]) } }, inputs: entrees({ VAL: valeur(a[1], "nombre") }) };
        default: throw new Error("instruction inconnue : " + t);
      }
    }
    function suite(liste) {
      if (!liste || !liste.length) return null;
      const blocs = liste.map(instr);
      for (let i = blocs.length - 2; i >= 0; i--) blocs[i].next = { block: blocs[i + 1] };
      return { block: blocs[0] };
    }
    const tete = { type: "quand_demarre", x: 30, y: 30, deletable: false };
    const s = suite(prog);
    if (s) tete.next = s;
    const etat = { blocks: { languageVersion: 0, blocks: [tete] } };
    etat.variables = [...vars.entries()].map(([name, id]) => ({ name, id }));
    return etat;
  }

  /* ---------- Programme abrégé → image HTML (cours, évaluations) ---------- */
  function enHTML(prog, objet, avecTete = true) {
    const o = objet || VIDE;
    const ov = (txt, cls = "") => `<span class="bk-ovale ${cls}">${esc(txt)}</span>`;
    function e(x) {
      if (x === null || x === undefined) return `<span class="bk-trou"></span>`;
      if (typeof x === "number") return ov(fmt(x), "bk-nb");
      if (typeof x === "string") return ov(x, "bk-nb");
      const [t, ...a] = x;
      if (t === "capteur") { const c = o.capteurs[a[0]] || { label: a[0], type: "bool" }; return c.type === "num" ? ov(libCapteur(c), "bk-capteur") : `<span class="bk-hexa bk-capteur">${esc(libCapteur(c))}</span>`; }
      if (t === "cmp") return `<span class="bk-hexa bk-op">${e(a[0])} ${esc(a[1])} ${e(a[2])}</span>`;
      if (t === "et" || t === "ou") return `<span class="bk-hexa bk-op">${e(a[0])} ${t} ${e(a[1])}</span>`;
      if (t === "non") return `<span class="bk-hexa bk-op">non ${e(a[0])}</span>`;
      if (t === "calc") return `<span class="bk-ovale bk-op">${e(a[0])} ${esc({ "*": "×", "/": "÷", "-": "−" }[a[1]] || a[1])} ${e(a[2])}</span>`;
      if (t === "var") return ov(a[0], "bk-var");
      return "?";
    }
    const pile = l => (l || []).map(s).join("") || `<div class="bk-vide"></div>`;
    const ligne = (cls, html) => `<div class="bk ${cls}"><div class="bk-ligne">${html}</div></div>`;
    function s(x) {
      const [t, ...a] = x;
      const c = (cls, entete, corps, fin = true) => `<div class="bk ${cls} bk-c"><div class="bk-ligne">${entete}</div><div class="bk-dedans">${corps}</div>${fin ? '<div class="bk-pied"></div>' : ""}</div>`;
      switch (t) {
        case "attendre": return ligne("bk-controle", `attendre ${e(a[0])} secondes`);
        case "toujours": return c("bk-controle", "répéter indéfiniment", pile(a[0]));
        case "fois": return c("bk-controle", `répéter ${e(a[0])} fois`, pile(a[1]));
        case "jusqua": return c("bk-controle", `répéter jusqu'à ce que ${e(a[0])}`, pile(a[1]));
        case "si": return c("bk-controle", `si ${e(a[0])} alors`, pile(a[1]));
        case "sisinon": return `<div class="bk bk-controle bk-c"><div class="bk-ligne">si ${e(a[0])} alors</div><div class="bk-dedans">${pile(a[1])}</div><div class="bk-ligne">sinon</div><div class="bk-dedans">${pile(a[2])}</div><div class="bk-pied"></div></div>`;
        case "allumer": return ligne("bk-action", `allumer ${esc((o.actionneurs[a[0]] || {}).label || a[0])}`);
        case "eteindre": return ligne("bk-action", `éteindre ${esc((o.actionneurs[a[0]] || {}).label || a[0])}`);
        case "moteur": { const m = o.actionneurs[a[0]] || { label: a[0], etats: [] }; const et = etatsMoteur(m).find(z => z[0] === a[1]); return ligne("bk-action", `${esc(m.label)} : ${ov(et ? et[1] : a[1], "bk-menu")}`); }
        case "ecran": return ligne("bk-action", `afficher ${e(a[0])} sur l'écran`);
        case "mettre": return ligne("bk-variable", `mettre ${ov(a[0], "bk-menu")} à ${e(a[1])}`);
        case "ajouter": return ligne("bk-variable", `ajouter ${e(a[1])} à ${ov(a[0], "bk-menu")}`);
        default: return "";
      }
    }
    const corps = (prog || []).map(s).join("");
    return `<div class="bk-prog">${avecTete ? '<div class="bk bk-evenement bk-chapeau"><div class="bk-ligne">quand le système démarre</div></div>' : ""}${corps}</div>`;
  }

  /* ---------- Blocs → texte lisible (enregistré pour le professeur) ---------- */
  function enTexte(ws) {
    const hauts = ws.getTopBlocks(true);
    const v = (b, nom) => { const c = b.getInputTargetBlock(nom); return c ? exprT(c) : "( )"; };
    function exprT(b) {
      switch (b.type) {
        case "math_number": return fmt(Number(b.getFieldValue("NUM")));
        case "text": return `"${b.getFieldValue("TEXT")}"`;
        case "capteur_bool": case "capteur_num": { const c = OBJET.capteurs[b.getFieldValue("NOM")]; return `<${c ? libCapteur(c) : b.getFieldValue("NOM")}>`; }
        case "op_compare": return `(${v(b, "A")} ${b.getFieldValue("OP")} ${v(b, "B")})`;
        case "op_et": return `<${v(b, "A")} et ${v(b, "B")}>`;
        case "op_ou": return `<${v(b, "A")} ou ${v(b, "B")}>`;
        case "op_non": return `<non ${v(b, "A")}>`;
        case "op_calcul": return `(${v(b, "A")} ${{ "*": "×", "/": "÷", "-": "−" }[b.getFieldValue("OP")] || "+"} ${v(b, "B")})`;
        case "var_lire": return `(${b.getField("VAR").getText()})`;
        default: return "?";
      }
    }
    function pileT(b, ind) { let s = ""; for (let x = b; x; x = x.getNextBlock()) s += instrT(x, ind); return s; }
    function dedans(b, nom, ind) { const c = b.getInputTargetBlock(nom); return c ? pileT(c, ind + "  ") : ind + "  (vide)\n"; }
    function instrT(b, ind) {
      const nom = k => { const a = OBJET.actionneurs[b.getFieldValue(k)]; return a ? a.label : b.getFieldValue(k); };
      switch (b.type) {
        case "quand_demarre": return ind + "quand le système démarre\n";
        case "attendre": return `${ind}attendre ${v(b, "DUREE")} secondes\n`;
        case "repeter_toujours": return `${ind}répéter indéfiniment\n${dedans(b, "FAIRE", ind)}${ind}fin\n`;
        case "repeter_fois": return `${ind}répéter ${v(b, "N")} fois\n${dedans(b, "FAIRE", ind)}${ind}fin\n`;
        case "repeter_jusqua": return `${ind}répéter jusqu'à ce que ${v(b, "COND")}\n${dedans(b, "FAIRE", ind)}${ind}fin\n`;
        case "si_alors": return `${ind}si ${v(b, "COND")} alors\n${dedans(b, "ALORS", ind)}${ind}fin\n`;
        case "si_sinon": return `${ind}si ${v(b, "COND")} alors\n${dedans(b, "ALORS", ind)}${ind}sinon\n${dedans(b, "SINON", ind)}${ind}fin\n`;
        case "allumer": return `${ind}allumer ${nom("NOM")}\n`;
        case "eteindre": return `${ind}éteindre ${nom("NOM")}\n`;
        case "moteur": { const a = OBJET.actionneurs[b.getFieldValue("NOM")]; const e = a ? etatsMoteur(a).find(z => z[0] === b.getFieldValue("ETAT")) : null; return `${ind}${nom("NOM")} : ${e ? e[1] : b.getFieldValue("ETAT")}\n`; }
        case "ecran": return `${ind}afficher ${v(b, "VAL")} sur l'écran\n`;
        case "var_mettre": return `${ind}mettre ${b.getField("VAR").getText()} à ${v(b, "VAL")}\n`;
        case "var_ajouter": return `${ind}ajouter ${v(b, "VAL")} à ${b.getField("VAR").getText()}\n`;
        default: return `${ind}${exprT(b)}\n`;
      }
    }
    const tete = hauts.find(b => b.type === "quand_demarre");
    let s = tete ? pileT(tete, "") : "";
    hauts.filter(b => b !== tete && !b.isShadow()).forEach(b => { s += "\n(bloc non accroché)\n" + (b.outputConnection ? exprT(b) + "\n" : pileT(b, "")); });
    return s.trim();
  }

  /* ---------- Boîte à outils (selon les blocs autorisés dans l'exercice) ---------- */
  function boiteOutils(exo) {
    const o = exo.objet, permis = new Set(exo.blocs || []);
    const n = (v) => ({ shadow: { type: "math_number", fields: { NUM: v } } });
    const cat = (nom, couleur, contenu) => contenu.length ? [{ kind: "category", name: nom, colour: couleur, contents: contenu }] : [];
    const blk = (type, extra) => Object.assign({ kind: "block", type }, extra || {});
    const controle = [];
    if (permis.has("attendre")) controle.push(blk("attendre", { inputs: { DUREE: n(1) } }));
    if (permis.has("repeter_fois")) controle.push(blk("repeter_fois", { inputs: { N: n(3) } }));
    ["repeter_toujours", "repeter_jusqua", "si_alors", "si_sinon"].forEach(t => { if (permis.has(t)) controle.push(blk(t)); });
    const capteurs = permis.has("capteur") ? Object.entries(o.capteurs).map(([k, c]) => blk(c.type === "num" ? "capteur_num" : "capteur_bool", { fields: { NOM: k } })) : [];
    const actions = [];
    Object.entries(o.actionneurs).forEach(([k, a]) => {
      if (a.type === "tor") { actions.push(blk("allumer", { fields: { NOM: k } }), blk("eteindre", { fields: { NOM: k } })); }
      else if (a.type === "etats") etatsMoteur(a).forEach(e => actions.push(blk("moteur", { fields: { NOM: k, ETAT: e[0] } })));
      else if (a.type === "ecran") actions.push(blk("ecran", { inputs: { VAL: { shadow: { type: "text", fields: { TEXT: "Bonjour" } } } } }));
    });
    const ops = [];
    if (permis.has("op_compare")) ops.push(blk("op_compare", { fields: { OP: "<" }, inputs: { A: n(0), B: n(50) } }), blk("op_compare", { fields: { OP: ">" }, inputs: { A: n(0), B: n(50) } }), blk("op_compare", { fields: { OP: "=" }, inputs: { A: n(0), B: n(0) } }));
    ["op_et", "op_ou", "op_non"].forEach(t => { if (permis.has(t)) ops.push(blk(t)); });
    if (permis.has("op_calcul")) ops.push(blk("op_calcul", { fields: { OP: "+" }, inputs: { A: n(0), B: n(1) } }), blk("op_calcul", { fields: { OP: "-" }, inputs: { A: n(0), B: n(1) } }));
    const vars = [];
    if (permis.has("variables")) (o.variables || []).forEach(v => {
      vars.push(blk("var_lire", { fields: { VAR: { name: v } } }), blk("var_mettre", { fields: { VAR: { name: v } }, inputs: { VAL: n(0) } }), blk("var_ajouter", { fields: { VAR: { name: v } }, inputs: { VAL: n(1) } }));
    });
    return { kind: "categoryToolbox", contents: [
      ...cat("Contrôle", COUL.controle, controle), ...cat("Capteurs", COUL.capteur, capteurs), ...cat("Actionneurs", COUL.action, actions),
      ...cat("Opérateurs", COUL.operateur, ops), ...cat("Variables", COUL.variable, vars)] };
  }

  /* ---------- Chronogramme (SVG) ---------- */
  function chronogramme(test, res, objet, marques) {
    const o = objet, duree = test.duree;
    const W = 760, L = 178, R = 18, H = 30, ESP = 8, HAUT = 26;
    const lignes = [];
    Object.entries(o.capteurs).forEach(([k, c]) => { if (test.capteurs && test.capteurs[k]) lignes.push({ k, label: c.label + (c.unite ? ` (${c.unite})` : ""), genre: c.type === "num" ? "valeur" : "bool", capteur: true }); });
    Object.entries(o.actionneurs).forEach(([k, a]) => lignes.push({ k, label: court(a.label), genre: a.type === "tor" ? "bool" : "valeur" }));
    (o.variables || []).forEach(v => lignes.push({ k: "$" + v, label: "variable " + v, genre: "valeur" }));
    const hauteur = HAUT + lignes.length * (H + ESP) + 6;
    const X = t => L + (Math.min(t, duree) / duree) * (W - L - R);
    const pas = duree <= 12 ? 1 : duree <= 30 ? 2 : duree <= 60 ? 5 : 10;
    let s = `<svg class="chrono" viewBox="0 0 ${W} ${hauteur}" width="${W}" height="${hauteur}" role="img" aria-label="Chronogramme">`;
    for (let t = 0; t <= duree + 1e-9; t += pas) {
      s += `<line x1="${X(t)}" y1="${HAUT - 6}" x2="${X(t)}" y2="${hauteur - 4}" class="ch-grille"/><text x="${X(t)}" y="${HAUT - 10}" class="ch-temps">${fmt(t)} s</text>`;
    }
    const segmentsCapteur = k => {
      const pts = test.capteurs[k] || [];
      const c = o.capteurs[k];
      let v = c.type === "num" ? 0 : false;
      const seg = []; let debut = 0;
      [...pts].sort((a, b) => a[0] - b[0]).forEach(([ti, vi]) => { if (ti <= 0) { v = vi; return; } if (vi !== v) { seg.push([debut, ti, v]); debut = ti; v = vi; } });
      seg.push([debut, duree, v]);
      return seg;
    };
    const segmentsSortie = k => {
      const seg = []; let debut = 0;
      let v = k.startsWith("$") ? 0 : initial(k, o);
      res.journal.filter(j => j.nom === k).forEach(j => { if (j.t > debut) seg.push([debut, j.t, v]); debut = j.t; v = j.val; });
      seg.push([debut, duree, v]);
      return seg;
    };
    lignes.forEach((l, i) => {
      const y = HAUT + i * (H + ESP);
      s += `<text x="${L - 10}" y="${y + H / 2}" class="ch-label${l.capteur ? " ch-label-capteur" : ""}">${esc(l.label)}</text>`;
      s += `<line x1="${L}" y1="${y + H - 2}" x2="${W - R}" y2="${y + H - 2}" class="ch-base"/>`;
      const seg = l.capteur ? segmentsCapteur(l.k) : segmentsSortie(l.k);
      seg.forEach(([a, b, v]) => {
        if (b <= a) return;
        const x1 = X(a), x2 = X(b);
        if (l.genre === "bool") {
          if (v === true) s += `<rect x="${x1}" y="${y + 4}" width="${Math.max(1, x2 - x1)}" height="${H - 6}" rx="3" class="${l.capteur ? "ch-haut-capteur" : "ch-haut"}"><title>${esc(l.label)} : ${l.capteur ? "oui" : texteEtat(l.k, true, o)} (de ${fmt(a)} à ${fmt(b)} s)</title></rect>`;
        } else {
          const txt = l.capteur ? fmt(v) : l.k.startsWith("$") ? fmt(v) : texteEtat(l.k, v, o);
          const vide = v === "" || (o.actionneurs[l.k] && o.actionneurs[l.k].type === "etats" && v === etatsMoteur(o.actionneurs[l.k])[0][0]);
          s += `<rect x="${x1 + 1}" y="${y + 4}" width="${Math.max(1, x2 - x1 - 2)}" height="${H - 6}" rx="3" class="${vide ? "ch-valeur-vide" : l.capteur ? "ch-valeur-capteur" : "ch-valeur"}"><title>${esc(l.label)} : ${esc(txt)} (de ${fmt(a)} à ${fmt(b)} s)</title></rect>`;
          if (x2 - x1 > 8 * Math.min(String(txt).length, 14) + 6) s += `<text x="${(x1 + x2) / 2}" y="${y + H / 2 + 1}" class="ch-val">${esc(String(txt).slice(0, 14))}</text>`;
        }
      });
    });
    (marques || []).forEach(m => {
      const i = lignes.findIndex(l => l.k === m.nom && !l.capteur);
      if (i < 0) return;
      const y = HAUT + i * (H + ESP) + H / 2;
      s += `<g class="${m.ok ? "ch-ok" : "ch-ko"}"><circle cx="${X(m.t)}" cy="${y}" r="8"/><text x="${X(m.t)}" y="${y + 1}">${m.ok ? "✓" : "✗"}</text><title>${esc(m.ok ? `À ${fmt(m.t)} s : correct` : m.message)}</title></g>`;
    });
    s += `<line class="ch-tete" x1="${L}" y1="${HAUT - 6}" x2="${L}" y2="${hauteur - 4}" visibility="hidden"/>`;
    return s + "</svg>";
  }

  return { COUL, fixerObjet, compiler, executer, etatsA, capteursA, controler, verifierTests, regles, depuisAbrege, enHTML, enTexte, boiteOutils, chronogramme, texteEtat, libCapteur, fmt, court, etatsMoteur };
});
