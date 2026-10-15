/*
 * Parcours « Programmer un objet » — technologie 4e (programme de cycle 4, BO n° 9 du 29 février 2024).
 * Repères de 4e : « les élèves analysent les données, complètent et testent un programme pour modifier
 * une fonctionnalité d'un objet » — variables et affectations, opérateurs arithmétiques et logiques,
 * instructions conditionnelles et itératives, listes, événements, entrées/sorties (capteurs, IHM,
 * actionneurs), programmation graphique par blocs ; « modifier un algorithme pour répondre à un besoin,
 * puis le traduire en programme ».
 * 8 notions × 4 exercices. Les élèves programment des objets techniques avec des blocs (comme Scratch).
 *
 * Chaque exercice :
 *   objet    : capteurs, actionneurs et variables de l'objet (voir blocs-moteur.js)
 *   depart   : programme de départ (écriture abrégée, voir blocs-moteur.js)
 *   solution : une solution (sert aux tests du professeur, jamais montrée aux élèves)
 *   tests    : scénarios (valeurs des capteurs au cours du temps) et points de contrôle
 *              verifs: [[instant en s, { actionneur: état attendu, "$variable": valeur }]]
 *   exige    : blocs obligatoires ; blocs : blocs disponibles (sinon ceux de la notion)
 * Ne changez pas l'id d'un exercice déjà utilisé par les élèves.
 */
(function () {
  const H = (prog, objet) => `<div class="bk-exemple">${Blocs.enHTML(prog, objet)}</div>`;
  const DEBUT = { t: "debut" }, FIN = { t: "fin" };
  const act = txt => ({ t: "action", txt }), es = txt => ({ t: "es", txt });
  const si = (txt, oui, non) => ({ t: "si", txt, oui, non }), tantque = (txt, corps) => ({ t: "tantque", txt, corps });

  /* ---------- Les objets techniques ---------- */
  const LAMPE = { label: "la lampe", type: "tor", on: "allumée", off: "éteinte" };
  const O = {
    lampe: { capteurs: {}, actionneurs: { lampe: LAMPE } },
    feu: { capteurs: {}, actionneurs: {
      vert: { label: "le feu vert", type: "tor" }, orange: { label: "le feu orange", type: "tor" }, rouge: { label: "le feu rouge", type: "tor" } } },
    volet: { capteurs: {}, actionneurs: {
      volet: { label: "moteur du volet", type: "etats", etats: [["arret", "arrêter", "arrêté"], ["descendre", "descendre", "descend"], ["monter", "monter", "monte"]] } } },
    led: { capteurs: {}, actionneurs: { led: { label: "la LED", type: "tor", on: "allumée", off: "éteinte" } } },
    signal: { capteurs: {}, actionneurs: { led: { label: "la LED", type: "tor", on: "allumée", off: "éteinte" }, buzzer: { label: "le buzzer", type: "tor", on: "en marche", off: "arrêté" } } },
    presence: { capteurs: { presence: { label: "présence détectée", type: "bool" } }, actionneurs: { lampe: LAMPE } },
    crepuscule: { capteurs: { lumiere: { label: "luminosité", type: "num", unite: "%" } }, actionneurs: { lampe: LAMPE } },
    ventil: { capteurs: { temperature: { label: "température", type: "num", unite: "°C" } }, actionneurs: { ventilateur: { label: "le ventilateur", type: "tor", on: "en marche", off: "arrêté" } } },
    chauffage: { capteurs: { temperature: { label: "température", type: "num", unite: "°C" } }, actionneurs: { radiateur: { label: "le radiateur", type: "tor", on: "allumé", off: "éteint" } } },
    eclairage: { capteurs: { presence: { label: "présence détectée", type: "bool" }, lumiere: { label: "luminosité", type: "num", unite: "%" } }, actionneurs: { lampe: LAMPE } },
    alarme: { capteurs: { porte: { label: "porte ouverte", type: "bool" }, fenetre: { label: "fenêtre ouverte", type: "bool" } }, actionneurs: { sirene: { label: "la sirène", type: "tor", on: "en marche", off: "arrêtée" } } },
    barriere: { capteurs: { obstacle: { label: "obstacle détecté", type: "bool" } }, actionneurs: {
      moteur: { label: "moteur du portail", type: "etats", etats: [["arret", "arrêter", "arrêté"], ["fermer", "fermer", "ferme"]] } } },
    arrosage: { capteurs: { humidite: { label: "humidité du sol", type: "num", unite: "%" }, pluie: { label: "pluie détectée", type: "bool" } }, actionneurs: { pompe: { label: "la pompe", type: "tor", on: "en marche", off: "à l'arrêt" } } },
    minuteur: { capteurs: {}, actionneurs: { ecran: { label: "l'écran", type: "ecran" }, buzzer: { label: "le buzzer", type: "tor", on: "en marche", off: "arrêté" } }, variables: ["temps"] },
    compteur: { capteurs: { presence: { label: "personne détectée", type: "bool" } }, actionneurs: { ecran: { label: "l'écran", type: "ecran" } }, variables: ["compteur"] },
    parking: { capteurs: { entree: { label: "voiture à l'entrée", type: "bool" }, sortie: { label: "voiture à la sortie", type: "bool" } }, actionneurs: { ecran: { label: "l'écran", type: "ecran" } }, variables: ["places"] },
    parking2: { capteurs: { entree: { label: "voiture à l'entrée", type: "bool" }, sortie: { label: "voiture à la sortie", type: "bool" } }, actionneurs: { ecran: { label: "l'écran", type: "ecran" }, complet: { label: "le voyant « complet »", type: "tor", on: "allumé", off: "éteint" } }, variables: ["places"] },
    portail: { capteurs: {
        telecommande: { label: "télécommande appuyée", type: "bool" },
        ouvert: { label: "portail ouvert (fin de course)", type: "bool" },
        ferme: { label: "portail fermé (fin de course)", type: "bool" },
        obstacle: { label: "obstacle détecté", type: "bool" } },
      actionneurs: { moteur: { label: "moteur du portail", type: "etats", etats: [["arret", "arrêter", "arrêté"], ["ouvrir", "ouvrir", "ouvre"], ["fermer", "fermer", "ferme"]] } } },
    serre: { capteurs: { temperature: { label: "température", type: "num", unite: "°C" }, humidite: { label: "humidité du sol", type: "num", unite: "%" } },
      actionneurs: { ventilateur: { label: "le ventilateur", type: "tor", on: "en marche", off: "arrêté" }, pompe: { label: "la pompe", type: "tor", on: "en marche", off: "à l'arrêt" }, ecran: { label: "l'écran", type: "ecran" } } }
  };
  Object.assign(O, {
    eclairageBouton: { capteurs: { bouton: { label: "bouton appuyé", type: "bool" } }, actionneurs: { lampe: LAMPE } },
    deuxBoutons: { capteurs: { marche: { label: "bouton marche appuyé", type: "bool" }, arret: { label: "bouton arrêt appuyé", type: "bool" } }, actionneurs: { moteur: { label: "le moteur du tapis", type: "tor", on: "en marche", off: "arrêté" } } },
    couloir: { capteurs: { presence: { label: "présence détectée", type: "bool" }, lumiere: { label: "luminosité", type: "num", unite: "%" } }, actionneurs: { lampe: LAMPE } },
    couloir2: { capteurs: { presence: { label: "présence détectée", type: "bool" }, bouton: { label: "bouton appuyé", type: "bool" }, lumiere: { label: "luminosité", type: "num", unite: "%" } }, actionneurs: { lampe: LAMPE } },
    meteo: { capteurs: { temperature: { label: "température", type: "num", unite: "°C" } }, actionneurs: { ecran: { label: "l'écran", type: "ecran" } }, listes: ["releves"] },
    meteo2: { capteurs: { temperature: { label: "température", type: "num", unite: "°C" } }, actionneurs: { ecran: { label: "l'écran", type: "ecran" } }, variables: ["total", "i"], listes: ["releves"] },
    thermoBouton: { capteurs: { bouton: { label: "bouton appuyé", type: "bool" }, temperature: { label: "température", type: "num", unite: "°C" } }, actionneurs: { ecran: { label: "l'écran", type: "ecran" } }, listes: ["releves"] }
  });
  const sans = (o, ...cles) => { const c = JSON.parse(JSON.stringify(o)); cles.forEach(k => { delete c.capteurs[k]; }); return c; };

  /* ---------- Blocs disponibles, notion par notion ---------- */
  const B1 = ["attendre"];
  const B2 = [...B1, "repeter_fois", "repeter_toujours"];
  const B3 = [...B2, "si_alors", "si_sinon", "capteur", "op_compare"];
  const B4 = [...B3, "op_et", "op_ou", "op_non"];
  const B5 = [...B4, "evenements"];
  const B6 = [...B5, "variables", "op_calcul", "repeter_jusqua"];
  const B7 = [...B6, "listes"];
  const B8 = B7;

  const cyclePresence = { presence: [[0, false], [2, true], [5, false], [7, true], [8.5, false]] };

  window.PARCOURS_BLOCS = [
    {
      id: "b1", titre: "Commander un objet", notion: "actionneurs et séquence", blocs: B1,
      cours: `
<p>Un <strong>système automatisé</strong> (lampe automatique, portail, feu tricolore…) contient une <strong>carte programmable</strong> qui exécute un programme.</p>
<ul>
<li>Les <strong>capteurs</strong> donnent des informations à la carte : présence, luminosité, température…</li>
<li>Les <strong>actionneurs</strong> agissent : une lampe s'allume, un moteur tourne, un buzzer sonne.</li>
</ul>
<p>Chaque bloc est une <strong>instruction</strong>. Le programme commence au bloc <strong>« quand le système démarre »</strong>, puis les instructions sont exécutées <strong>dans l'ordre, de haut en bas</strong> : c'est une <strong>séquence d'instructions</strong>. Chaque instruction est exécutée instantanément, sauf <strong>« attendre »</strong>, qui laisse passer du temps.</p>
${H([["allumer", "lampe"], ["attendre", 3], ["eteindre", "lampe"]], O.lampe)}
<p>Ce programme allume la lampe, attend 3 secondes, puis l'éteint.</p>
<p><strong>Le chronogramme</strong> montre ce qui se passe au cours du temps : une bande colorée signifie que l'actionneur est en marche. Après chaque vérification, les ✓ et ✗ indiquent les instants contrôlés.</p>`,
      exercices: [
        { id: "b1e1", titre: "Allumer la lampe", type: "blocs", objet: O.lampe,
          enonce: "<p>Fais un programme qui <strong>allume la lampe</strong> dès que le système démarre.</p><p>Ouvre la catégorie <em>Actionneurs</em> et glisse le bon bloc sous « quand le système démarre ».</p>",
          depart: [], solution: [["allumer", "lampe"]],
          tests: [{ nom: "Démarrage", duree: 4, verifs: [[0.5, { lampe: true }], [3.5, { lampe: true }]] }],
          indices: ["Le bloc « allumer la lampe » est dans la catégorie violette Actionneurs.", "Il doit être accroché (aimanté) juste sous « quand le système démarre »."] },
        { id: "b1e2", titre: "La minuterie d'escalier", type: "blocs", objet: O.lampe,
          enonce: "<p>Dans un escalier, la lampe s'allume puis s'éteint toute seule. Complète le programme pour que la lampe reste <strong>allumée 5 secondes</strong>, puis s'éteigne.</p>",
          depart: [["allumer", "lampe"]], solution: [["allumer", "lampe"], ["attendre", 5], ["eteindre", "lampe"]],
          tests: [{ nom: "Minuterie", duree: 8, verifs: [[1, { lampe: true }], [4.5, { lampe: true }], [5.5, { lampe: false }], [7.5, { lampe: false }]] }],
          exige: [{ bloc: "attendre", message: "Utilise le bloc « attendre » pour laisser passer 5 secondes." }],
          indices: ["Il faut deux blocs de plus : « attendre » (catégorie Contrôle) et « éteindre la lampe ».", "Change le 1 du bloc « attendre » en 5 en cliquant dessus."] },
        { id: "b1e3", titre: "Le feu tricolore", type: "blocs", objet: O.feu,
          enonce: "<p>Le feu doit faire un cycle : <strong>vert pendant 4 s</strong>, puis <strong>orange pendant 1 s</strong>, puis <strong>rouge</strong> (et il reste rouge). Un seul feu est allumé à la fois.</p><p>Le début est fait : complète la suite.</p>",
          depart: [["allumer", "vert"], ["attendre", 4], ["eteindre", "vert"]],
          solution: [["allumer", "vert"], ["attendre", 4], ["eteindre", "vert"], ["allumer", "orange"], ["attendre", 1], ["eteindre", "orange"], ["allumer", "rouge"]],
          tests: [{ nom: "Un cycle", duree: 8, verifs: [[2, { vert: true, orange: false, rouge: false }], [4.5, { vert: false, orange: true, rouge: false }], [5.5, { orange: false, rouge: true }], [7.5, { vert: false, orange: false, rouge: true }]] }],
          indices: ["Après avoir éteint le vert : allume l'orange, attends 1 seconde, éteins l'orange.", "Termine en allumant le rouge."] },
        { id: "b1e4", titre: "Le volet roulant", type: "blocs", objet: O.volet,
          enonce: "<p>Le moteur d'un volet roulant peut <strong>descendre</strong>, <strong>monter</strong> ou être <strong>arrêté</strong>. Programme le volet pour qu'il <strong>descende pendant 4 secondes</strong>, puis que le moteur s'arrête.</p>",
          depart: [], solution: [["moteur", "volet", "descendre"], ["attendre", 4], ["moteur", "volet", "arret"]],
          tests: [{ nom: "Descente", duree: 7, verifs: [[1, { volet: "descendre" }], [3.5, { volet: "descendre" }], [4.5, { volet: "arret" }], [6.5, { volet: "arret" }]] }],
          indices: ["Le bloc du moteur a un menu : tu peux choisir « descendre », « monter » ou « arrêter ».", "descendre → attendre 4 secondes → arrêter."] }
      ]
    },
    {
      id: "b2", titre: "Répéter", notion: "boucles", blocs: B2,
      cours: `
<p>Pour faire plusieurs fois la même chose, on utilise une <strong>boucle</strong> (ou <strong>instruction itérative</strong>) : les instructions placées <em>à l'intérieur</em> sont répétées.</p>
<ul>
<li><strong>« répéter 3 fois »</strong> : répète un nombre de fois connu à l'avance, puis passe à la suite.</li>
<li><strong>« répéter indéfiniment »</strong> : répète sans jamais s'arrêter. C'est le cas de la plupart des systèmes automatisés, qui fonctionnent en permanence. Rien ne peut être placé après ce bloc.</li>
</ul>
${H([["fois", 3, [["allumer", "led"], ["attendre", 1], ["eteindre", "led"], ["attendre", 1]]]], O.led)}
<p>Ce programme fait clignoter la LED 3 fois : allumée 1 s, éteinte 1 s, trois fois de suite.</p>
<p>Attention : sans le dernier « attendre », la LED serait rallumée aussitôt éteinte, et on ne la verrait jamais s'éteindre.</p>`,
      exercices: [
        { id: "b2e1", titre: "Le gyrophare", type: "blocs", objet: O.led,
          enonce: "<p>Ce programme fait clignoter la LED <strong>une seule fois</strong>. Modifie-le avec une boucle pour qu'elle clignote <strong>5 fois</strong> (allumée 1 s, éteinte 1 s), puis reste éteinte.</p>",
          depart: [["allumer", "led"], ["attendre", 1], ["eteindre", "led"], ["attendre", 1]],
          solution: [["fois", 5, [["allumer", "led"], ["attendre", 1], ["eteindre", "led"], ["attendre", 1]]]],
          tests: [{ nom: "5 clignotements", duree: 12, verifs: [[0.5, { led: true }], [1.5, { led: false }], [2.5, { led: true }], [4.5, { led: true }], [6.5, { led: true }], [8.5, { led: true }], [9.5, { led: false }], [10.5, { led: false }], [11.5, { led: false }]] }],
          exige: [{ bloc: "repeter_fois", message: "Utilise le bloc « répéter … fois » au lieu de recopier les blocs." }],
          indices: ["Glisse un bloc « répéter 3 fois » sous « quand le système démarre », puis mets les 4 blocs à l'intérieur.", "Change le 3 en 5."] },
        { id: "b2e2", titre: "Le clignotant de vélo", type: "blocs", objet: O.led,
          enonce: "<p>Un clignotant de vélo clignote <strong>sans arrêt</strong> : allumé <strong>0,5 s</strong>, éteint <strong>0,5 s</strong>, et ainsi de suite.</p><p>Pour écrire 0,5 dans un bloc, tape <code>0.5</code> (avec un point).</p>",
          depart: [], solution: [["toujours", [["allumer", "led"], ["attendre", 0.5], ["eteindre", "led"], ["attendre", 0.5]]]],
          tests: [{ nom: "Clignotement", duree: 6, verifs: [[0.25, { led: true }], [0.75, { led: false }], [1.25, { led: true }], [3.25, { led: true }], [3.75, { led: false }], [5.25, { led: true }], [5.75, { led: false }]] }],
          exige: [{ bloc: "repeter_toujours", message: "Le clignotant ne s'arrête jamais : utilise « répéter indéfiniment »." }],
          indices: ["« répéter indéfiniment » est dans Contrôle.", "Dedans : allumer, attendre 0.5, éteindre, attendre 0.5."] },
        { id: "b2e3", titre: "Le feu tricolore en boucle", type: "blocs", objet: O.feu,
          enonce: "<p>Ce programme fait <strong>un seul cycle</strong> du feu. Un vrai feu recommence sans arrêt. Modifie le programme pour que le cycle <strong>vert 3 s → orange 1 s → rouge 3 s</strong> se répète indéfiniment.</p>",
          depart: [["allumer", "vert"], ["attendre", 3], ["eteindre", "vert"], ["allumer", "orange"], ["attendre", 1], ["eteindre", "orange"], ["allumer", "rouge"], ["attendre", 3], ["eteindre", "rouge"]],
          solution: [["toujours", [["allumer", "vert"], ["attendre", 3], ["eteindre", "vert"], ["allumer", "orange"], ["attendre", 1], ["eteindre", "orange"], ["allumer", "rouge"], ["attendre", 3], ["eteindre", "rouge"]]]],
          tests: [{ nom: "Deux cycles", duree: 15, verifs: [[1, { vert: true, rouge: false }], [3.5, { orange: true, vert: false }], [5, { rouge: true, orange: false }], [8, { vert: true, rouge: false }], [10.5, { orange: true }], [12, { rouge: true, vert: false }], [14.5, { vert: true, rouge: false }]] }],
          exige: [{ bloc: "repeter_toujours", message: "Le feu doit recommencer sans arrêt : utilise « répéter indéfiniment »." }],
          indices: ["Glisse « répéter indéfiniment » sous « quand le système démarre ».", "Puis déplace tous les autres blocs à l'intérieur de la boucle (en attrapant le premier, tous les blocs en dessous suivent)."] },
        { id: "b2e4", titre: "Corriger : le signal de départ", type: "blocs", objet: O.signal,
          enonce: "<p>Pour un départ de course : la LED doit clignoter <strong>3 fois</strong> (allumée 1 s, éteinte 1 s), <strong>puis</strong> le buzzer sonne pendant <strong>1 seconde</strong>.</p><p>Ce programme a un défaut : le buzzer sonne trop souvent. Lance « Tester » pour voir le problème, puis corrige le programme.</p>",
          depart: [["fois", 3, [["allumer", "led"], ["attendre", 1], ["eteindre", "led"], ["attendre", 1], ["allumer", "buzzer"], ["attendre", 1], ["eteindre", "buzzer"]]]],
          solution: [["fois", 3, [["allumer", "led"], ["attendre", 1], ["eteindre", "led"], ["attendre", 1]]], ["allumer", "buzzer"], ["attendre", 1], ["eteindre", "buzzer"]],
          tests: [{ nom: "Départ", duree: 9, verifs: [[0.5, { led: true, buzzer: false }], [2.5, { led: true, buzzer: false }], [3.5, { buzzer: false }], [4.5, { led: true }], [6.5, { buzzer: true, led: false }], [7.5, { buzzer: false }], [8.5, { led: false, buzzer: false }]] }],
          indices: ["Les blocs du buzzer sont à l'intérieur de la boucle : ils sont donc répétés 3 fois.", "Sors les 3 blocs du buzzer et accroche-les sous la boucle « répéter 3 fois »."] }
      ]
    },
    {
      id: "b3", titre: "Capteurs et conditions", notion: "si… alors… sinon", blocs: B3,
      cours: `
<p>Un <strong>capteur</strong> donne une information à la carte programmable :</p>
<ul>
<li>un capteur <strong>tout ou rien</strong> répond oui ou non (présence détectée ?, porte ouverte ?). Son bloc a une forme <strong>hexagonale</strong>, comme toutes les conditions ;</li>
<li>un capteur de <strong>mesure</strong> donne une valeur (luminosité en %, température en °C). Son bloc est <strong>arrondi</strong>, comme les nombres. On le compare à un seuil avec <code>&lt;</code>, <code>&gt;</code> ou <code>=</code>.</li>
</ul>
<p>Le bloc <strong>« si … alors … sinon »</strong> est une <strong>instruction conditionnelle</strong> : la <strong>condition</strong> (case hexagonale) est vraie ou fausse. Si elle est vraie, on exécute la partie « alors », sinon la partie « sinon ». On compare une mesure à un <strong>seuil</strong> avec un <strong>opérateur de comparaison</strong> (<code>&lt;</code>, <code>&gt;</code>, <code>=</code>).</p>
${H([["toujours", [["sisinon", ["cmp", ["capteur", "lumiere"], "<", 30], [["allumer", "lampe"]], [["eteindre", "lampe"]]]]]], O.crepuscule)}
<p>Le « si » est placé dans <strong>« répéter indéfiniment »</strong> : le programme lit le capteur en permanence, et la lampe réagit dès que la luminosité change. Sans la boucle, le capteur ne serait lu qu'une seule fois, au démarrage.</p>
<p>Le même programme sous forme d'algorigramme :</p>`,
      schemaCours: [DEBUT, tantque("toujours", [es("Lire luminosité"), si("luminosité < 30 ?", [act("Allumer la lampe")], [act("Éteindre la lampe")])])],
      exercices: [
        { id: "b3e1", titre: "La lampe à détection de présence", type: "blocs", objet: O.presence,
          enonce: "<p>La lampe d'un couloir doit être <strong>allumée quand une présence est détectée</strong>, et <strong>éteinte sinon</strong>.</p><p>Ce programme allume bien la lampe, mais elle ne s'éteint jamais. Corrige-le.</p>",
          depart: [["toujours", [["si", ["capteur", "presence"], [["allumer", "lampe"]]]]]],
          solution: [["toujours", [["sisinon", ["capteur", "presence"], [["allumer", "lampe"]], [["eteindre", "lampe"]]]]]],
          tests: [{ nom: "Passages dans le couloir", duree: 10, capteurs: cyclePresence, verifs: [[1, { lampe: false }], [2.5, { lampe: true }], [4.5, { lampe: true }], [5.5, { lampe: false }], [7.5, { lampe: true }], [9.5, { lampe: false }]] }],
          exige: [{ bloc: "si_sinon", message: "Utilise « si … alors … sinon » : il faut une action quand personne n'est là." }],
          indices: ["Remplace le bloc « si … alors » par « si … alors … sinon ».", "Dans « sinon », mets « éteindre la lampe »."] },
        { id: "b3e2", titre: "La lampe crépusculaire", type: "blocs", objet: O.crepuscule,
          enonce: "<p>Un lampadaire s'allume quand il fait sombre : <strong>luminosité inférieure à 30 %</strong>. Sinon, il est éteint.</p><p>Il manque la condition : construis-la avec le capteur de luminosité et un bloc de comparaison.</p>",
          depart: [["toujours", [["sisinon", null, [["allumer", "lampe"]], [["eteindre", "lampe"]]]]]],
          solution: [["toujours", [["sisinon", ["cmp", ["capteur", "lumiere"], "<", 30], [["allumer", "lampe"]], [["eteindre", "lampe"]]]]]],
          tests: [
            { nom: "La nuit tombe", duree: 10, capteurs: { lumiere: [[0, 80], [3, 45], [5, 25], [7, 10]] }, verifs: [[1, { lampe: false }], [4, { lampe: false }], [5.5, { lampe: true }], [9, { lampe: true }]] },
            { nom: "Le jour se lève", duree: 8, capteurs: { lumiere: [[0, 5], [3, 28], [5, 31], [6, 90]] }, verifs: [[1, { lampe: true }], [4, { lampe: true }], [5.5, { lampe: false }], [7, { lampe: false }]] }],
          exige: [{ bloc: "capteur_num", message: "La condition doit utiliser le capteur de luminosité." }],
          indices: ["Dans Opérateurs, prends le bloc « ( ) < ( ) » et glisse-le dans la case hexagonale du « si ».", "Dans la case de gauche, glisse le capteur « luminosité (%) » ; à droite, tape 30."] },
        { id: "b3e3", titre: "Le ventilateur automatique", type: "blocs", objet: O.ventil,
          schema: [DEBUT, tantque("toujours", [es("Lire température"), si("température > 26 ?", [act("Mettre en marche le ventilateur")], [act("Arrêter le ventilateur")])])],
          enonce: "<p>Traduis cet algorigramme en programme : le ventilateur d'une salle se met <strong>en marche quand la température dépasse 26 °C</strong>, et s'arrête sinon. Écris tout le programme.</p>",
          depart: [], solution: [["toujours", [["sisinon", ["cmp", ["capteur", "temperature"], ">", 26], [["allumer", "ventilateur"]], [["eteindre", "ventilateur"]]]]]],
          tests: [
            { nom: "Il fait de plus en plus chaud", duree: 10, capteurs: { temperature: [[0, 22], [3, 25], [5, 27], [7, 30]] }, verifs: [[1, { ventilateur: false }], [4, { ventilateur: false }], [5.5, { ventilateur: true }], [9, { ventilateur: true }]] },
            { nom: "La salle refroidit", duree: 6, capteurs: { temperature: [[0, 29], [3, 24]] }, verifs: [[1, { ventilateur: true }], [4, { ventilateur: false }]] }],
          exige: [{ bloc: "repeter_toujours", message: "Le capteur doit être lu en permanence : place ton « si » dans « répéter indéfiniment »." },
                  { bloc: "si_sinon", message: "Utilise « si … alors … sinon » pour allumer ou éteindre le ventilateur." }],
          indices: ["Même structure que la lampe crépusculaire : répéter indéfiniment → si … alors … sinon.", "La condition : température > 26."] },
        { id: "b3e4", titre: "Modifier : le seuil du chauffage", type: "blocs", objet: O.chauffage,
          enonce: "<p>Ce programme allume le radiateur quand la température est inférieure à 15 °C. Les utilisateurs ont froid : la nouvelle exigence est de chauffer dès que la température est <strong>inférieure à 19 °C</strong>. Modifie le programme.</p>",
          depart: [["toujours", [["sisinon", ["cmp", ["capteur", "temperature"], "<", 15], [["allumer", "radiateur"]], [["eteindre", "radiateur"]]]]]],
          solution: [["toujours", [["sisinon", ["cmp", ["capteur", "temperature"], "<", 19], [["allumer", "radiateur"]], [["eteindre", "radiateur"]]]]]],
          tests: [{ nom: "Une journée d'hiver", duree: 10, capteurs: { temperature: [[0, 21], [2, 18], [4, 16], [6, 12], [8, 20]] }, verifs: [[1, { radiateur: false }], [3, { radiateur: true }], [5, { radiateur: true }], [7, { radiateur: true }], [9, { radiateur: false }]] }],
          indices: ["Il suffit de changer un seul nombre.", "Clique sur 15 et remplace-le par 19."] }
      ]
    },
    {
      id: "b4", titre: "Combiner des conditions", notion: "et, ou, non", blocs: B4,
      cours: `
<p>On peut combiner des conditions avec les <strong>opérateurs logiques</strong> ET, OU, NON :</p>
<table class="ops">
<tr><td><strong>A et B</strong></td><td>vrai seulement si A et B sont <em>tous les deux</em> vrais</td></tr>
<tr><td><strong>A ou B</strong></td><td>vrai si <em>au moins un</em> des deux est vrai</td></tr>
<tr><td><strong>non A</strong></td><td>l'inverse de A : vrai quand A est faux</td></tr>
</table>
<table class="trace"><tr><th>présence</th><th>il fait sombre</th><th>présence <em>et</em> sombre</th><th>présence <em>ou</em> sombre</th></tr>
<tr><td>non</td><td>non</td><td>non</td><td>non</td></tr><tr><td>non</td><td>oui</td><td>non</td><td>oui</td></tr>
<tr><td>oui</td><td>non</td><td>non</td><td>oui</td></tr><tr><td>oui</td><td>oui</td><td>oui</td><td>oui</td></tr></table>
${H([["toujours", [["sisinon", ["et", ["capteur", "presence"], ["cmp", ["capteur", "lumiere"], "<", 30]], [["allumer", "lampe"]], [["eteindre", "lampe"]]]]]], O.eclairage)}
<p>Cette lampe s'allume seulement s'il y a quelqu'un <strong>et</strong> qu'il fait sombre : on économise l'énergie en plein jour.</p>`,
      exercices: [
        { id: "b4e1", titre: "L'éclairage économe", type: "blocs", objet: O.eclairage,
          enonce: "<p>La lampe s'allume dès qu'une présence est détectée, même en plein jour : c'est du gaspillage. Modifie le programme pour qu'elle s'allume seulement s'il y a une présence <strong>et</strong> que la luminosité est <strong>inférieure à 30 %</strong>.</p>",
          depart: [["toujours", [["sisinon", ["capteur", "presence"], [["allumer", "lampe"]], [["eteindre", "lampe"]]]]]],
          solution: [["toujours", [["sisinon", ["et", ["capteur", "presence"], ["cmp", ["capteur", "lumiere"], "<", 30]], [["allumer", "lampe"]], [["eteindre", "lampe"]]]]]],
          tests: [
            { nom: "En plein jour", duree: 8, capteurs: { presence: [[0, false], [2, true], [5, false]], lumiere: [[0, 80]] }, verifs: [[1, { lampe: false }], [3, { lampe: false }], [6, { lampe: false }]] },
            { nom: "La nuit", duree: 8, capteurs: { presence: [[0, false], [2, true], [5, false]], lumiere: [[0, 10]] }, verifs: [[1, { lampe: false }], [3, { lampe: true }], [6, { lampe: false }]] }],
          exige: [{ bloc: "op_et", message: "Utilise l'opérateur « et » pour combiner les deux conditions." }],
          indices: ["Glisse un bloc « ( ) et ( ) » dans la case du « si », puis remets le capteur de présence dans sa case de gauche.", "Dans la case de droite : luminosité (%) < 30."] },
        { id: "b4e2", titre: "L'alarme de la maison", type: "blocs", objet: O.alarme,
          enonce: "<p>La sirène doit se déclencher si la <strong>porte</strong> est ouverte <strong>ou</strong> si la <strong>fenêtre</strong> est ouverte. Si les deux sont fermées, elle est arrêtée.</p>",
          depart: [["toujours", [["sisinon", null, [["allumer", "sirene"]], [["eteindre", "sirene"]]]]]],
          solution: [["toujours", [["sisinon", ["ou", ["capteur", "porte"], ["capteur", "fenetre"]], [["allumer", "sirene"]], [["eteindre", "sirene"]]]]]],
          tests: [{ nom: "Intrusions", duree: 12, capteurs: { porte: [[0, false], [2, true], [4, false]], fenetre: [[0, false], [6, true], [8, false], [9, true]] }, verifs: [[1, { sirene: false }], [3, { sirene: true }], [5, { sirene: false }], [7, { sirene: true }], [8.5, { sirene: false }], [10, { sirene: true }]] },
                  { nom: "Porte et fenêtre", duree: 6, capteurs: { porte: [[0, false], [2, true], [4, false]], fenetre: [[0, false], [2, true], [4, false]] }, verifs: [[1, { sirene: false }], [3, { sirene: true }], [5, { sirene: false }]] }],
          exige: [{ bloc: "op_ou", message: "Utilise l'opérateur « ou »." }],
          indices: ["Il suffit qu'un seul des deux capteurs soit vrai : c'est « ou ».", "Mets « porte ouverte ? » d'un côté du « ou », « fenêtre ouverte ? » de l'autre."] },
        { id: "b4e3", titre: "Le portail et l'obstacle", type: "blocs", objet: O.barriere,
          enonce: "<p>Pour la sécurité, le moteur ne doit fermer le portail que s'il n'y a <strong>pas</strong> d'obstacle (voiture, enfant…) devant la cellule. S'il y a un obstacle, le moteur s'arrête.</p><p>Le programme fait l'inverse : utilise l'opérateur <strong>non</strong> pour le corriger.</p>",
          depart: [["toujours", [["sisinon", ["capteur", "obstacle"], [["moteur", "moteur", "fermer"]], [["moteur", "moteur", "arret"]]]]]],
          solution: [["toujours", [["sisinon", ["non", ["capteur", "obstacle"]], [["moteur", "moteur", "fermer"]], [["moteur", "moteur", "arret"]]]]]],
          tests: [{ nom: "Un enfant passe", duree: 10, capteurs: { obstacle: [[0, false], [3, true], [6, false]] }, verifs: [[1, { moteur: "fermer" }], [4, { moteur: "arret" }], [5.5, { moteur: "arret" }], [7, { moteur: "fermer" }]] }],
          exige: [{ bloc: "op_non", message: "Utilise l'opérateur « non »." }],
          indices: ["« non obstacle détecté ? » est vrai quand il n'y a pas d'obstacle.", "Glisse « non » dans la case du « si », puis mets le capteur d'obstacle dans le « non »."] },
        { id: "b4e4", titre: "L'arrosage automatique", type: "blocs", objet: O.arrosage,
          enonce: "<p>La pompe arrose le jardin si le sol est sec (<strong>humidité du sol inférieure à 40 %</strong>) <strong>et</strong> s'il <strong>ne pleut pas</strong>. Sinon, la pompe est à l'arrêt. Écris le programme.</p>",
          depart: [], solution: [["toujours", [["sisinon", ["et", ["cmp", ["capteur", "humidite"], "<", 40], ["non", ["capteur", "pluie"]]], [["allumer", "pompe"]], [["eteindre", "pompe"]]]]]],
          tests: [
            { nom: "Le sol sèche", duree: 8, capteurs: { humidite: [[0, 60], [3, 35], [6, 45]], pluie: [[0, false]] }, verifs: [[1, { pompe: false }], [4, { pompe: true }], [7, { pompe: false }]] },
            { nom: "Une averse", duree: 8, capteurs: { humidite: [[0, 20]], pluie: [[0, false], [3, true], [6, false]] }, verifs: [[1, { pompe: true }], [4, { pompe: false }], [7, { pompe: true }]] }],
          exige: [{ bloc: "op_et", message: "Il faut deux conditions en même temps : utilise « et »." }, { bloc: "op_non", message: "« Il ne pleut pas » s'écrit avec « non »." }],
          indices: ["Structure : répéter indéfiniment → si … alors … sinon.", "La condition : (humidité du sol < 40) et (non pluie détectée ?)."] }
      ]
    },
    {
      id: "bev", titre: "Événements", notion: "déclencher une action", blocs: B5,
      cours: `
<p>Un <strong>événement</strong> déclenche une action dans le programme. Les blocs jaunes à chapeau sont des événements : <strong>« quand le système démarre »</strong> (au démarrage) et <strong>« quand bouton appuyé »</strong>, <strong>« quand présence détectée »</strong>… Les instructions accrochées dessous s'exécutent <strong>chaque fois que le capteur passe de « non » à « oui »</strong>.</p>
<table class="ops">
<tr><td><strong>Événement physique</strong></td><td>une action de l'utilisateur : appui sur un bouton.</td></tr>
<tr><td><strong>Événement temporel</strong></td><td>un temps écoulé : « attendre 5 secondes » puis éteindre.</td></tr>
<tr><td><strong>Événement logique</strong></td><td>une condition qui devient vraie : présence détectée, distance inférieure à 10 cm.</td></tr>
</table>
${H([["quand", "bouton", [["allumer", "lampe"], ["attendre", 5], ["eteindre", "lampe"]]]], O.eclairageBouton)}
<p>Ce programme répond à un besoin simple : un appui sur le bouton allume la lampe, qui s'éteint au bout de 5 s. Un nouvel appui recommence le cycle. Un programme peut avoir plusieurs blocs « quand … », un par événement.</p>`,
      exercices: [
        { id: "bev1", titre: "Le bouton de l'éclairage", type: "blocs", objet: O.eclairageBouton,
          enonce: "<p>Cahier des charges : <strong>un appui sur le bouton poussoir allume la lampe</strong>, qui <strong>s'éteint au bout de 5 secondes</strong>. Le cycle recommence à chaque appui.</p><p>Utilise l'événement « quand bouton appuyé » (catégorie <em>Événements</em>).</p>",
          depart: [], solution: [["quand", "bouton", [["allumer", "lampe"], ["attendre", 5], ["eteindre", "lampe"]]]],
          tests: [{ nom: "Deux appuis", duree: 16, capteurs: { bouton: [[0, false], [1, true], [1.3, false], [9, true], [9.3, false]] },
            verifs: [[0.5, { lampe: false }], [1.5, { lampe: true }], [5.8, { lampe: true }], [6.5, { lampe: false }], [8.5, { lampe: false }], [9.5, { lampe: true }], [14.5, { lampe: false }]] }],
          exige: [{ bloc: "quand_capteur", message: "Utilise l'événement « quand bouton appuyé »." }],
          indices: ["Glisse « quand bouton appuyé » sur l'espace de travail, à côté de « quand le système démarre ».", "Accroche dessous : allumer la lampe, attendre 5 secondes, éteindre la lampe."] },
        { id: "bev2", titre: "Marche / arrêt", type: "blocs", objet: O.deuxBoutons,
          enonce: "<p>Un tapis roulant a deux boutons : <strong>un appui sur « marche » met le moteur en marche</strong>, <strong>un appui sur « arrêt » l'arrête</strong>.</p><p>Il faut un bloc « quand … » pour chaque bouton.</p>",
          depart: [["quand", "marche", [["allumer", "moteur"]]]], solution: [["quand", "marche", [["allumer", "moteur"]]], ["quand", "arret", [["eteindre", "moteur"]]]],
          tests: [{ nom: "Marche puis arrêt", duree: 12, capteurs: { marche: [[0, false], [1, true], [1.3, false], [8, true], [8.3, false]], arret: [[0, false], [5, true], [5.3, false]] },
            verifs: [[0.5, { moteur: false }], [2, { moteur: true }], [4.5, { moteur: true }], [5.5, { moteur: false }], [7.5, { moteur: false }], [9, { moteur: true }]] }],
          indices: ["Ajoute un deuxième bloc « quand … » et choisis « bouton arrêt appuyé » dans son menu.", "Accroche dessous : éteindre le moteur du tapis."] },
        { id: "bev3", titre: "L'éclairage du couloir", type: "blocs", objet: O.couloir,
          schema: [DEBUT, si("présence détectée ?", [si("luminosité < 30 ?", [act("Allumer la lampe"), act("Attendre 5 s"), act("Éteindre la lampe")], [])], []), FIN],
          enonce: "<p>Traduis cet algorigramme en programme : <strong>quand une présence est détectée</strong>, si la <strong>luminosité est inférieure à 30 %</strong>, la lampe s'allume puis s'éteint au bout de <strong>5 s</strong>. En plein jour, rien ne se passe.</p>",
          depart: [["quand", "presence", [["allumer", "lampe"], ["attendre", 5], ["eteindre", "lampe"]]]],
          solution: [["quand", "presence", [["si", ["cmp", ["capteur", "lumiere"], "<", 30], [["allumer", "lampe"], ["attendre", 5], ["eteindre", "lampe"]]]]]],
          tests: [
            { nom: "La nuit", duree: 10, capteurs: { presence: [[0, false], [1, true], [2, false]], lumiere: [[0, 10]] }, verifs: [[0.5, { lampe: false }], [1.5, { lampe: true }], [5.8, { lampe: true }], [6.5, { lampe: false }]] },
            { nom: "En plein jour", duree: 8, capteurs: { presence: [[0, false], [1, true], [2, false]], lumiere: [[0, 80]] }, verifs: [[1.5, { lampe: false }], [4, { lampe: false }]] }],
          exige: [{ bloc: "si_alors", message: "Ajoute une instruction conditionnelle « si … alors » sur la luminosité." }],
          indices: ["La lampe ne doit s'allumer que s'il fait sombre : il faut un « si » sous l'événement.", "Mets les trois blocs de la lampe dans un « si (luminosité < 30) alors »."] },
        { id: "bev4", titre: "Modifier : bouton et détecteur", type: "blocs", objet: O.couloir2,
          enonce: "<p>Nouvelle exigence : on ajoute un <strong>bouton poussoir</strong>. <strong>Un appui sur le bouton allume la lampe 5 s, quelle que soit la luminosité</strong>. Le détecteur de présence garde son fonctionnement (seulement quand il fait sombre).</p>",
          depart: [["quand", "presence", [["si", ["cmp", ["capteur", "lumiere"], "<", 30], [["allumer", "lampe"], ["attendre", 5], ["eteindre", "lampe"]]]]]],
          solution: [["quand", "presence", [["si", ["cmp", ["capteur", "lumiere"], "<", 30], [["allumer", "lampe"], ["attendre", 5], ["eteindre", "lampe"]]]]], ["quand", "bouton", [["allumer", "lampe"], ["attendre", 5], ["eteindre", "lampe"]]]],
          tests: [
            { nom: "Bouton en plein jour", duree: 10, capteurs: { bouton: [[0, false], [1, true], [1.3, false]], presence: [[0, false]], lumiere: [[0, 80]] }, verifs: [[0.5, { lampe: false }], [2, { lampe: true }], [5.8, { lampe: true }], [6.5, { lampe: false }]] },
            { nom: "Passage la nuit", duree: 10, capteurs: { bouton: [[0, false]], presence: [[0, false], [1, true], [2, false]], lumiere: [[0, 10]] }, verifs: [[1.5, { lampe: true }], [6.5, { lampe: false }]] },
            { nom: "Passage en plein jour", duree: 8, capteurs: { bouton: [[0, false]], presence: [[0, false], [1, true], [2, false]], lumiere: [[0, 80]] }, verifs: [[1.5, { lampe: false }]] }],
          indices: ["Ajoute un deuxième événement : « quand bouton appuyé ».", "Dessous, pas de condition : allumer, attendre 5 secondes, éteindre."] }
      ]
    },
    {
      id: "b5", titre: "Variables", notion: "affecter, compter, mémoriser", blocs: B6,
      cours: `
<p>Une <strong>variable</strong> est une case de la mémoire, avec un nom, qui contient une valeur. Donner une valeur à une variable, c'est l'<strong>affecter</strong>. Le programme peut la modifier pendant qu'il fonctionne, avec des <strong>opérateurs arithmétiques</strong> (+, −, ×, ÷).</p>
<ul>
<li><strong>« mettre places à 5 »</strong> : la variable <code>places</code> vaut maintenant 5 ;</li>
<li><strong>« ajouter 1 à compteur »</strong> : la valeur augmente de 1. Pour <em>enlever</em> 1, on ajoute <code>-1</code> ;</li>
<li><strong>« afficher compteur sur l'écran »</strong> montre la valeur actuelle.</li>
</ul>
<p>Pour compter des passages, il faut compter <strong>une seule fois par personne</strong>. Deux solutions : utiliser l'événement <strong>« quand personne détectée »</strong> (notion 5), ou, dans une boucle, <strong>attendre que la personne soit partie</strong> avec « répéter jusqu'à ce que non personne détectée » (une boucle vide, qui attend) :</p>
${H([["mettre", "compteur", 0], ["ecran", ["var", "compteur"]], ["toujours", [["si", ["capteur", "presence"], [["ajouter", "compteur", 1], ["ecran", ["var", "compteur"]], ["jusqua", ["non", ["capteur", "presence"]], []]]]]]], O.compteur)}`,
      exercices: [
        { id: "b5e1", titre: "Le minuteur", type: "blocs", objet: O.minuteur,
          enonce: "<p>Le minuteur affiche le temps restant : 5, 4, 3, 2, 1 (une valeur par seconde), puis « Fini ! » et le buzzer sonne.</p><p>Ce programme affiche toujours 5 : il manque le bloc qui fait diminuer la variable <code>temps</code>. Ajoute-le au bon endroit.</p>",
          depart: [["mettre", "temps", 5], ["fois", 5, [["ecran", ["var", "temps"]], ["attendre", 1]]], ["ecran", "Fini !"], ["allumer", "buzzer"]],
          solution: [["mettre", "temps", 5], ["fois", 5, [["ecran", ["var", "temps"]], ["attendre", 1], ["ajouter", "temps", -1]]], ["ecran", "Fini !"], ["allumer", "buzzer"]],
          tests: [{ nom: "Compte à rebours", duree: 7, verifs: [[0.5, { ecran: "5" }], [1.5, { ecran: "4" }], [2.5, { ecran: "3" }], [3.5, { ecran: "2" }], [4.5, { ecran: "1", buzzer: false }], [5.5, { ecran: "Fini !", buzzer: true }]] }],
          exige: [{ bloc: "var_ajouter", message: "Utilise « ajouter … à temps » pour faire diminuer le temps." }],
          indices: ["Dans Variables, prends « ajouter 1 à temps » et change 1 en -1.", "Place-le dans la boucle, après « attendre 1 secondes »."] },
        { id: "b5e2", titre: "Le compteur de visiteurs", type: "blocs", objet: O.compteur,
          enonce: "<p>À l'entrée d'un musée, un capteur détecte chaque visiteur. L'écran doit afficher le <strong>nombre de visiteurs</strong>.</p><p>Problème : quand quelqu'un passe, le compteur augmente de 10 d'un coup ! Le programme compte en boucle tant que la personne est devant le capteur. Corrige-le pour compter <strong>une seule fois par visiteur</strong> (relis le cours).</p>",
          depart: [["mettre", "compteur", 0], ["ecran", ["var", "compteur"]], ["toujours", [["si", ["capteur", "presence"], [["ajouter", "compteur", 1], ["ecran", ["var", "compteur"]]]]]]],
          solution: [["mettre", "compteur", 0], ["ecran", ["var", "compteur"]], ["toujours", [["si", ["capteur", "presence"], [["ajouter", "compteur", 1], ["ecran", ["var", "compteur"]], ["jusqua", ["non", ["capteur", "presence"]], []]]]]]],
          tests: [{ nom: "Trois visiteurs", duree: 10, capteurs: { presence: [[0, false], [1, true], [2, false], [3, true], [4, false], [6, true], [7, false]] }, verifs: [[0.5, { ecran: "0" }], [1.5, { ecran: "1" }], [2.5, { ecran: "1" }], [3.5, { ecran: "2" }], [6.5, { ecran: "3" }], [9.5, { ecran: "3", $compteur: 3 }]] }],
          exige: [{ bloc: ["repeter_jusqua", "quand_capteur"], message: "Compte une seule fois par visiteur : attends qu'il soit passé (« répéter jusqu'à ce que ») ou utilise l'événement « quand personne détectée »." }],
          indices: ["Après avoir affiché le compteur, il faut attendre que la personne ne soit plus détectée.", "Ajoute dans le « si » : répéter jusqu'à ce que (non personne détectée ?), avec rien à l'intérieur. Autre solution : un bloc « quand personne détectée » (Événements)."] },
        { id: "b5e3", titre: "Le parking", type: "blocs", objet: O.parking,
          enonce: "<p>Un parking a <strong>5 places</strong>. L'écran affiche le nombre de places libres. Le programme gère déjà les voitures qui <strong>entrent</strong> (une place de moins).</p><p>Ajoute la gestion des voitures qui <strong>sortent</strong> : une place libre de plus.</p>",
          depart: [["mettre", "places", 5], ["ecran", ["var", "places"]], ["toujours", [["si", ["capteur", "entree"], [["ajouter", "places", -1], ["ecran", ["var", "places"]], ["jusqua", ["non", ["capteur", "entree"]], []]]]]]],
          solution: [["mettre", "places", 5], ["ecran", ["var", "places"]], ["toujours", [
            ["si", ["capteur", "entree"], [["ajouter", "places", -1], ["ecran", ["var", "places"]], ["jusqua", ["non", ["capteur", "entree"]], []]]],
            ["si", ["capteur", "sortie"], [["ajouter", "places", 1], ["ecran", ["var", "places"]], ["jusqua", ["non", ["capteur", "sortie"]], []]]]]]],
          tests: [{ nom: "Une matinée", duree: 10, capteurs: { entree: [[0, false], [1, true], [1.5, false], [3, true], [3.5, false], [7, true], [7.5, false]], sortie: [[0, false], [5, true], [5.5, false]] },
            verifs: [[0.5, { ecran: "5" }], [2, { ecran: "4" }], [4, { ecran: "3" }], [6, { ecran: "4" }], [8, { ecran: "3", $places: 3 }]] }],
          indices: ["Il faut un deuxième « si », pour le capteur « voiture à la sortie ».", "Tu peux dupliquer le premier « si » (clic droit → Dupliquer), puis changer le capteur et remplacer -1 par 1."] },
        { id: "b5e4", titre: "Modifier : parking complet", type: "blocs", objet: O.parking2,
          enonce: "<p>Le parking est réduit à <strong>3 places</strong>, et on ajoute un voyant « complet » à l'entrée : il doit être <strong>allumé quand il ne reste aucune place</strong> (places = 0), éteint sinon.</p><p>Modifie le programme : nombre de places au départ, puis le voyant.</p>",
          depart: [["mettre", "places", 5], ["ecran", ["var", "places"]], ["toujours", [
            ["si", ["capteur", "entree"], [["ajouter", "places", -1], ["ecran", ["var", "places"]], ["jusqua", ["non", ["capteur", "entree"]], []]]],
            ["si", ["capteur", "sortie"], [["ajouter", "places", 1], ["ecran", ["var", "places"]], ["jusqua", ["non", ["capteur", "sortie"]], []]]]]]],
          solution: [["mettre", "places", 3], ["ecran", ["var", "places"]], ["toujours", [
            ["si", ["capteur", "entree"], [["ajouter", "places", -1], ["ecran", ["var", "places"]], ["jusqua", ["non", ["capteur", "entree"]], []]]],
            ["si", ["capteur", "sortie"], [["ajouter", "places", 1], ["ecran", ["var", "places"]], ["jusqua", ["non", ["capteur", "sortie"]], []]]],
            ["sisinon", ["cmp", ["var", "places"], "=", 0], [["allumer", "complet"]], [["eteindre", "complet"]]]]]],
          tests: [{ nom: "Le parking se remplit", duree: 10, capteurs: { entree: [[0, false], [1, true], [1.5, false], [2.5, true], [3, false], [4, true], [4.5, false]], sortie: [[0, false], [7, true], [7.5, false]] },
            verifs: [[0.5, { ecran: "3", complet: false }], [2, { ecran: "2", complet: false }], [3.5, { ecran: "1", complet: false }], [5, { ecran: "0", complet: true }], [6.5, { complet: true }], [8, { ecran: "1", complet: false }]] }],
          exige: [{ bloc: "si_sinon", message: "Utilise « si … alors … sinon » pour allumer ou éteindre le voyant." }],
          indices: ["Change d'abord 5 en 3 dans « mettre places à ».", "Ajoute à la fin de la boucle : si (places = 0) alors allumer le voyant, sinon l'éteindre. Le bloc « places » est dans Variables."] }
      ]
    },
    {
      id: "bli", titre: "Listes", notion: "enregistrer et analyser des données", blocs: B7,
      cours: `
<p>Un objet peut <strong>enregistrer des données</strong> pour les analyser ensuite. Une <strong>liste</strong> range plusieurs valeurs dans l'ordre, sous un seul nom.</p>
<ul>
<li><strong>« ajouter (température) à la liste releves »</strong> range une nouvelle valeur à la fin ;</li>
<li><strong>« élément 2 de releves »</strong> donne la 2e valeur (on compte à partir de 1) ;</li>
<li><strong>« longueur de releves »</strong> donne le nombre de valeurs rangées.</li>
</ul>
${H([["fois", 3, [["lajouter", "releves", ["capteur", "temperature"]], ["attendre", 2]]], ["ecran", ["llongueur", "releves"]]], O.meteo)}
<p>Cette station météo relève la température 3 fois, toutes les 2 secondes, puis affiche le nombre de relevés (3). Le chronogramme montre le contenu de la liste au cours du temps.</p>`,
      exercices: [
        { id: "bli1", titre: "Enregistrer des relevés", type: "blocs", objet: O.meteo,
          enonce: "<p>La station météo doit <strong>relever la température 4 fois, toutes les 2 secondes</strong>, et ranger chaque relevé dans la liste <code>releves</code>. Il manque l'instruction qui enregistre la mesure.</p>",
          depart: [["fois", 4, [["attendre", 2]]]],
          solution: [["fois", 4, [["lajouter", "releves", ["capteur", "temperature"]], ["attendre", 2]]]],
          tests: [{ nom: "Une matinée", duree: 9, capteurs: { temperature: [[0, 18], [2, 21], [4, 25], [6, 19]] }, verifs: [[1, { "#releves": [18] }], [5, { "#releves": [18, 21, 25] }], [8.5, { "#releves": [18, 21, 25, 19] }]] }],
          exige: [{ bloc: "liste_ajouter", message: "Utilise « ajouter … à la liste releves »." }],
          indices: ["Dans Listes, prends « ajouter 0 à la liste releves ».", "Remplace le 0 par le capteur de température, et place le bloc dans la boucle, avant « attendre »."] },
        { id: "bli2", titre: "Afficher un relevé", type: "blocs", objet: O.meteo,
          enonce: "<p>Après les 3 relevés, l'écran doit afficher le <strong>2e relevé</strong> de la liste.</p>",
          depart: [["fois", 3, [["lajouter", "releves", ["capteur", "temperature"]], ["attendre", 2]]]],
          solution: [["fois", 3, [["lajouter", "releves", ["capteur", "temperature"]], ["attendre", 2]]], ["ecran", ["lelement", "releves", 2]]],
          tests: [{ nom: "Trois relevés", duree: 8, capteurs: { temperature: [[0, 15], [2, 17], [4, 22]] }, verifs: [[6.5, { ecran: "17" }], [7.5, { "#releves": [15, 17, 22] }]] },
                  { nom: "Autres relevés", duree: 8, capteurs: { temperature: [[0, 30], [2, 28], [4, 26]] }, verifs: [[6.5, { ecran: "28" }]] }],
          exige: [{ bloc: "liste_element", message: "Utilise « élément … de releves »." }],
          indices: ["Sous la boucle, ajoute « afficher … sur l'écran ».", "Dans la case, glisse « élément 2 de releves »."] },
        { id: "bli3", titre: "La moyenne des relevés", type: "blocs", objet: O.meteo2,
          enonce: "<p>On veut afficher la <strong>moyenne des 3 relevés</strong>. Le programme parcourt la liste avec la variable <code>i</code> (1, 2, 3) et additionne les valeurs dans <code>total</code>. Il manque l'instruction qui ajoute l'élément n° i à total.</p>",
          depart: [["fois", 3, [["lajouter", "releves", ["capteur", "temperature"]], ["attendre", 2]]], ["mettre", "total", 0], ["mettre", "i", 1],
            ["fois", ["llongueur", "releves"], [["ajouter", "i", 1]]], ["ecran", ["calc", ["var", "total"], "/", ["llongueur", "releves"]]]],
          solution: [["fois", 3, [["lajouter", "releves", ["capteur", "temperature"]], ["attendre", 2]]], ["mettre", "total", 0], ["mettre", "i", 1],
            ["fois", ["llongueur", "releves"], [["ajouter", "total", ["lelement", "releves", ["var", "i"]]], ["ajouter", "i", 1]]], ["ecran", ["calc", ["var", "total"], "/", ["llongueur", "releves"]]]],
          tests: [{ nom: "18, 21 et 24 °C", duree: 8, capteurs: { temperature: [[0, 18], [2, 21], [4, 24]] }, verifs: [[7, { ecran: "21", $total: 63 }]] },
                  { nom: "10, 20 et 30 °C", duree: 8, capteurs: { temperature: [[0, 10], [2, 20], [4, 30]] }, verifs: [[7, { ecran: "20" }]] }],
          indices: ["Dans la 2e boucle, avant « ajouter 1 à i », ajoute « ajouter … à total ».", "Dans sa case, glisse « élément … de releves », avec la variable i comme numéro."] },
        { id: "bli4", titre: "Mesurer à la demande", type: "blocs", objet: O.thermoBouton,
          enonce: "<p>Un thermomètre connecté : <strong>à chaque appui sur le bouton</strong>, il range la température dans la liste <code>releves</code> et <strong>affiche le nombre de mesures</strong> enregistrées.</p>",
          depart: [],
          solution: [["quand", "bouton", [["lajouter", "releves", ["capteur", "temperature"]], ["ecran", ["llongueur", "releves"]]]]],
          tests: [{ nom: "Trois appuis", duree: 10, capteurs: { bouton: [[0, false], [1, true], [1.3, false], [4, true], [4.3, false], [7, true], [7.3, false]], temperature: [[0, 20], [3, 22], [6, 19]] },
            verifs: [[2, { ecran: "1", "#releves": [20] }], [5, { ecran: "2" }], [8, { ecran: "3", "#releves": [20, 22, 19] }]] }],
          exige: [{ bloc: "quand_capteur", message: "Utilise l'événement « quand bouton appuyé »." }, { bloc: "liste_longueur", message: "Affiche « longueur de releves »." }],
          indices: ["Événements : « quand bouton appuyé ».", "Dessous : ajouter (température) à la liste releves, puis afficher (longueur de releves) sur l'écran."] }
      ]
    },
    {
      id: "b6", titre: "Projet : le portail et la serre", notion: "modifier une fonctionnalité", blocs: B8,
      cours: `
<p>Un vrai système combine tout ce que tu as appris. Exemple : un <strong>portail automatique</strong>.</p>
<ul>
<li>Capteurs : le bouton de la télécommande, deux <strong>capteurs de fin de course</strong> (portail complètement ouvert, portail complètement fermé) et une cellule qui détecte les obstacles.</li>
<li>Actionneur : le moteur, qui peut ouvrir, fermer ou être arrêté.</li>
</ul>
<p>Pour ouvrir le portail jusqu'au bout, on met le moteur en marche, puis on <strong>attend le capteur de fin de course</strong> avec « répéter jusqu'à ce que », et enfin on arrête le moteur :</p>
${H([["toujours", [["si", ["capteur", "telecommande"], [["moteur", "moteur", "ouvrir"], ["jusqua", ["capteur", "ouvert"], []], ["moteur", "moteur", "arret"]]]]]], O.portail)}
<p>Pendant les tests, les capteurs suivent un scénario : par exemple, le capteur « portail ouvert » devient vrai 4 secondes après l'appui sur la télécommande.</p>`,
      schemaCours: [DEBUT, tantque("toujours", [si("télécommande appuyée ?", [act("Moteur : ouvrir"), tantque("portail pas encore ouvert ?", [act("Attendre")]), act("Moteur : arrêter")], [])])],
      exercices: [
        { id: "b6e1", titre: "Ouvrir le portail", type: "blocs", objet: sans(O.portail, "ferme", "obstacle"),
          schema: [DEBUT, tantque("toujours", [si("télécommande appuyée ?", [act("Moteur : ouvrir"), tantque("portail pas encore ouvert ?", [act("Attendre")]), act("Moteur : arrêter")], [])])],
          enonce: "<p>Quand on appuie sur la télécommande, le moteur doit <strong>ouvrir</strong> le portail <strong>jusqu'à ce que</strong> le capteur « portail ouvert » le détecte, puis <strong>s'arrêter</strong>.</p><p>Ce programme arrête le moteur aussitôt : le portail ne s'ouvre pas. Complète-le.</p>",
          depart: [["toujours", [["si", ["capteur", "telecommande"], [["moteur", "moteur", "ouvrir"], ["moteur", "moteur", "arret"]]]]]],
          solution: [["toujours", [["si", ["capteur", "telecommande"], [["moteur", "moteur", "ouvrir"], ["jusqua", ["capteur", "ouvert"], []], ["moteur", "moteur", "arret"]]]]]],
          tests: [{ nom: "Ouverture", duree: 8, capteurs: { telecommande: [[0, false], [1, true], [1.3, false]], ouvert: [[0, false], [5, true]] }, verifs: [[0.5, { moteur: "arret" }], [2, { moteur: "ouvrir" }], [4.5, { moteur: "ouvrir" }], [5.5, { moteur: "arret" }], [7.5, { moteur: "arret" }]] }],
          exige: [{ bloc: "repeter_jusqua", message: "Utilise « répéter jusqu'à ce que » pour attendre le capteur de fin de course." }],
          indices: ["Entre « ouvrir » et « arrêter », il faut attendre le capteur.", "Glisse « répéter jusqu'à ce que » entre les deux blocs moteur, avec le capteur « portail ouvert ? » dans sa case."] },
        { id: "b6e2", titre: "Ouvrir puis refermer", type: "blocs", objet: sans(O.portail, "obstacle"),
          enonce: "<p>Le portail doit maintenant se <strong>refermer tout seul</strong> : une fois ouvert, il attend <strong>5 secondes</strong>, puis le moteur <strong>ferme</strong> le portail jusqu'à ce que le capteur « portail fermé » le détecte, et s'arrête.</p>",
          depart: [["toujours", [["si", ["capteur", "telecommande"], [["moteur", "moteur", "ouvrir"], ["jusqua", ["capteur", "ouvert"], []], ["moteur", "moteur", "arret"]]]]]],
          solution: [["toujours", [["si", ["capteur", "telecommande"], [["moteur", "moteur", "ouvrir"], ["jusqua", ["capteur", "ouvert"], []], ["moteur", "moteur", "arret"], ["attendre", 5], ["moteur", "moteur", "fermer"], ["jusqua", ["capteur", "ferme"], []], ["moteur", "moteur", "arret"]]]]]],
          tests: [{ nom: "Ouverture et fermeture", duree: 19, capteurs: { telecommande: [[0, false], [1, true], [1.3, false]], ouvert: [[0, false], [5, true], [10.5, false]], ferme: [[0, true], [1.5, false], [16, true]] },
            verifs: [[0.5, { moteur: "arret" }], [3, { moteur: "ouvrir" }], [6, { moteur: "arret" }], [9.5, { moteur: "arret" }], [10.5, { moteur: "fermer" }], [15.5, { moteur: "fermer" }], [16.5, { moteur: "arret" }], [18.5, { moteur: "arret" }]] }],
          exige: [{ bloc: "attendre", message: "Le portail doit attendre 5 secondes avant de se refermer." }],
          indices: ["À la suite de « arrêter », ajoute : attendre 5 secondes, puis fermer.", "Comme pour l'ouverture : fermer → répéter jusqu'à ce que (portail fermé ?) → arrêter."] },
        { id: "b6e3", titre: "La sécurité anti-obstacle", type: "blocs", objet: O.portail,
          enonce: "<p>Si un <strong>obstacle</strong> est détecté pendant la fermeture, le moteur doit <strong>s'arrêter tout de suite</strong>, sans attendre que le portail soit fermé.</p><p>Modifie la condition de la boucle de fermeture : on ferme jusqu'à ce que le portail soit fermé <strong>ou</strong> qu'un obstacle soit détecté.</p>",
          depart: [["toujours", [["si", ["capteur", "telecommande"], [["moteur", "moteur", "ouvrir"], ["jusqua", ["capteur", "ouvert"], []], ["moteur", "moteur", "arret"], ["attendre", 5], ["moteur", "moteur", "fermer"], ["jusqua", ["capteur", "ferme"], []], ["moteur", "moteur", "arret"]]]]]],
          solution: [["toujours", [["si", ["capteur", "telecommande"], [["moteur", "moteur", "ouvrir"], ["jusqua", ["capteur", "ouvert"], []], ["moteur", "moteur", "arret"], ["attendre", 5], ["moteur", "moteur", "fermer"], ["jusqua", ["ou", ["capteur", "ferme"], ["capteur", "obstacle"]], []], ["moteur", "moteur", "arret"]]]]]],
          tests: [
            { nom: "Un enfant passe pendant la fermeture", duree: 18, capteurs: { telecommande: [[0, false], [1, true], [1.3, false]], ouvert: [[0, false], [5, true], [10.5, false]], ferme: [[0, true], [1.5, false]], obstacle: [[0, false], [12, true], [13, false]] },
              verifs: [[3, { moteur: "ouvrir" }], [7, { moteur: "arret" }], [11, { moteur: "fermer" }], [12.5, { moteur: "arret" }], [15, { moteur: "arret" }]] },
            { nom: "Sans obstacle", duree: 19, capteurs: { telecommande: [[0, false], [1, true], [1.3, false]], ouvert: [[0, false], [5, true], [10.5, false]], ferme: [[0, true], [1.5, false], [16, true]], obstacle: [[0, false]] },
              verifs: [[3, { moteur: "ouvrir" }], [7, { moteur: "arret" }], [12, { moteur: "fermer" }], [15.5, { moteur: "fermer" }], [16.5, { moteur: "arret" }]] }],
          exige: [{ bloc: "op_ou", message: "Utilise « ou » : portail fermé ou obstacle détecté." }],
          indices: ["La boucle à modifier est celle qui suit « fermer ».", "Mets un bloc « ou » dans sa case : (portail fermé ?) ou (obstacle détecté ?)."] },
        { id: "b6e4", titre: "La serre automatique", type: "blocs", objet: O.serre,
          enonce: "<p>Dans une serre, le programme affiche la température et gère la ventilation : ventilateur en marche au-dessus de <strong>28 °C</strong>.</p><p>Ajoute l'<strong>arrosage</strong> : la pompe est en marche quand l'<strong>humidité du sol est inférieure à 40 %</strong>, à l'arrêt sinon. Les deux fonctions doivent marcher en même temps.</p>",
          depart: [["toujours", [["ecran", ["capteur", "temperature"]], ["sisinon", ["cmp", ["capteur", "temperature"], ">", 28], [["allumer", "ventilateur"]], [["eteindre", "ventilateur"]]]]]],
          solution: [["toujours", [["ecran", ["capteur", "temperature"]], ["sisinon", ["cmp", ["capteur", "temperature"], ">", 28], [["allumer", "ventilateur"]], [["eteindre", "ventilateur"]]], ["sisinon", ["cmp", ["capteur", "humidite"], "<", 40], [["allumer", "pompe"]], [["eteindre", "pompe"]]]]]],
          tests: [{ nom: "Une journée dans la serre", duree: 12, capteurs: { temperature: [[0, 22], [4, 30], [8, 25]], humidite: [[0, 50], [2, 35], [6, 70], [10, 30]] },
            verifs: [[1, { ecran: "22", ventilateur: false, pompe: false }], [3, { pompe: true, ventilateur: false }], [5, { ecran: "30", ventilateur: true, pompe: true }], [7, { ventilateur: true, pompe: false }], [9, { ecran: "25", ventilateur: false, pompe: false }], [11, { pompe: true }]] }],
          indices: ["Sous le premier « si … sinon » (dans la boucle), ajoute un deuxième « si … alors … sinon ».", "Condition : humidité du sol < 40 ; alors : allumer la pompe ; sinon : éteindre la pompe."] }
      ]
    }
  ];
})();
