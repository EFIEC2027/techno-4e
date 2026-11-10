/*
 * Entraînement — technologie 4e — PAS NOTÉ, pour s'exercer en autonomie ou à la maison.
 * Algorithmes : 5 notions × 2 exercices (identifiants « ta »).
 * Programmer un objet : 8 notions × 2 exercices (identifiants « tb »), mêmes objets que le parcours.
 * Doit être chargé après blocs.js. Ne changez pas l'id d'un exercice déjà utilisé.
 */
(function () {
  const DEBUT = { t: "debut" }, FIN = { t: "fin" };
  const act = (txt, trou) => ({ t: "action", txt, trou });
  const es = (txt, trou) => ({ t: "es", txt, trou });
  const si = (txt, oui, non, trou) => ({ t: "si", txt, oui, non, trou });
  const tantque = (txt, corps, trou) => ({ t: "tantque", txt, corps, trou });

  window.PARCOURS_ENTR_ALGO = [
    { id: "ta1", titre: "La chaîne d'information", notion: "acquérir, traiter, communiquer", rappel: "a1",
      cours: "<p>Un objet automatique <strong>acquiert</strong> une information (capteur), la <strong>traite</strong> (programme) et <strong>communique</strong> un ordre à un actionneur.</p>",
      exercices: [
        { id: "ta1e1", titre: "Le distributeur de gel", type: "qcm", enonce: "<p>Dans un distributeur de gel automatique, quel élément <strong>acquiert</strong> l'information « une main est là » ?</p>",
          choix: ["Le capteur infrarouge", "La pompe", "Le programme", "Le réservoir"], bonne: 0, explication: "C'est le capteur qui détecte la main : il acquiert l'information.", indices: ["Acquérir = prendre une information."] },
        { id: "ta1e2", titre: "Capteur ou actionneur ?", type: "qcm", enonce: "<p>Dans une alarme incendie, la <strong>sirène</strong> est…</p>",
          choix: ["un actionneur", "un capteur", "le programme", "une information"], bonne: 0, explication: "La sirène agit (elle sonne) : c'est un actionneur.", indices: ["Est-ce qu'elle mesure ou est-ce qu'elle agit ?"] } ] },
    { id: "ta2", titre: "Algorithme et algorigramme", notion: "séquence d'instructions", rappel: "a2",
      cours: "<p>Ovale = début / fin ; rectangle = action ; parallélogramme = entrée / sortie (lire un capteur, afficher) ; losange = test. On suit les flèches de haut en bas.</p>",
      exercices: [
        { id: "ta2e1", titre: "Quel symbole ?", type: "qcm", enonce: "<p>Dans un algorigramme, l'instruction « Lire la température » se dessine dans…</p>",
          choix: ["un parallélogramme", "un rectangle", "un losange", "un ovale"], bonne: 0, explication: "Lire un capteur est une entrée : on utilise le parallélogramme.", indices: ["Entrée ou sortie de données…"] },
        { id: "ta2e2", titre: "Compléter : la minuterie", type: "completer", schema: [DEBUT, act("Allumer la lampe"), act("", "A"), act("Éteindre la lampe"), FIN],
          enonce: "<p>La lampe de l'escalier doit rester allumée 2 minutes. Que faut-il écrire dans la case <strong>A</strong> ?</p>",
          trous: { A: { choix: ["Attendre 2 min", "Lire présence", "Allumer la lampe", "Fin"], bonne: 0 } }, explication: "Entre « allumer » et « éteindre », il faut laisser passer le temps.", indices: ["Que se passe-t-il entre allumer et éteindre ?"] } ] },
    { id: "ta3", titre: "Instructions conditionnelles", notion: "si… alors… sinon", rappel: "a3",
      cours: "<p>Au losange, on répond à la question : oui → une branche, non → l'autre. Attention : 20 &lt; 20 est faux.</p>",
      exercices: [
        { id: "ta3e1", titre: "Le radiateur", type: "suivre", schema: [DEBUT, es("Lire température"), si("température < 19 ?", [act("Allumer le radiateur")], [act("Éteindre le radiateur")]), FIN],
          enonce: "<p>Le capteur mesure <strong>19 °C</strong>.</p>", question: "Le radiateur est-il allumé ou éteint ?", attendu: "éteint", accepte: ["eteint", "il est éteint"],
          explication: "19 < 19 est faux : on suit la branche non, le radiateur est éteint.", indices: ["19 est-il strictement plus petit que 19 ?"] },
        { id: "ta3e2", titre: "Compléter : l'arrosage", type: "completer", schema: [DEBUT, es("Lire humidité"), si("", [act("Mettre en marche la pompe")], [act("Arrêter la pompe")], "A"), FIN],
          enonce: "<p>La pompe doit arroser quand l'humidité du sol est <strong>inférieure à 40 %</strong>. Que faut-il écrire dans le losange <strong>A</strong> ?</p>",
          trous: { A: { choix: ["humidité < 40 ?", "humidité > 40 ?", "humidité = 40 ?", "pompe < 40 ?"], bonne: 0 } }, explication: "On arrose si le sol est trop sec : humidité inférieure à 40.", indices: ["Sol sec = humidité faible."] } ] },
    { id: "ta4", titre: "Instructions itératives", notion: "boucles", rappel: "a4",
      cours: "<p>Une boucle répète des instructions : un nombre de fois connu, tant qu'une condition est vraie, ou indéfiniment.</p>",
      exercices: [
        { id: "ta4e1", titre: "Combien de bips ?", type: "suivre", schema: [DEBUT, act("n ← 0"), tantque("n < 4 ?", [act("Bip"), act("n ← n + 1")]), FIN],
          enonce: "<p>Fais tourner la boucle à la main.</p>", question: "Combien de bips ? (un nombre)", attendu: "4", accepte: ["4 bips", "quatre"],
          explication: "n vaut 0, 1, 2, 3 : quatre tours. À 4, le test est faux.", indices: ["Note n à chaque tour."] },
        { id: "ta4e2", titre: "Quelle boucle ?", type: "qcm", enonce: "<p>Un détecteur de fumée doit surveiller la pièce <strong>en permanence</strong>. Quelle boucle faut-il ?</p>",
          choix: ["répéter indéfiniment", "répéter 10 fois", "répéter jusqu'à fumée", "aucune boucle"], bonne: 0, explication: "La surveillance ne s'arrête jamais : on répète indéfiniment.", indices: ["Quand doit-il arrêter de surveiller ?"] } ] },
    { id: "ta5", titre: "Événements et données", notion: "événements, listes", rappel: "a5",
      cours: "<p>Un <strong>événement</strong> déclenche une action (« quand le bouton est appuyé… »). Une <strong>liste</strong> range plusieurs valeurs, par exemple des relevés.</p>",
      exercices: [
        { id: "ta5e1", titre: "Événement ou pas ?", type: "qcm", enonce: "<p>Lequel est un <strong>événement</strong> ?</p>",
          choix: ["Quand on appuie sur la sonnette", "La lampe est allumée", "La température vaut 20 °C", "Le moteur tourne"], bonne: 0, explication: "L'appui sur la sonnette arrive à un moment précis et déclenche une action.", indices: ["Un événement se produit à un instant précis."] },
        { id: "ta5e2", titre: "La liste des relevés", type: "suivre", enonce: "<p>La liste <code>releves</code> contient : <strong>[12, 15, 18, 14]</strong>.</p>",
          question: "Quel est le 3e élément de la liste ?", attendu: "18", explication: "1er : 12, 2e : 15, 3e : 18.", indices: ["Compte à partir du début de la liste."] } ] }
  ];

  const C = window.BLOCS_COMMUNS;
  if (!C) return;
  const { O, B } = C;
  window.PARCOURS_ENTR_BLOCS = [
    { id: "tb1", titre: "Commander un objet", notion: "actionneurs et séquence", blocs: B.B1, rappel: "b1",
      cours: "<p>Les blocs s'exécutent dans l'ordre, de haut en bas. « attendre » laisse passer du temps.</p>",
      exercices: [
        { id: "tb1e1", titre: "La sonnette", type: "blocs", objet: O.signal,
          enonce: "<p>Fais sonner le buzzer pendant <strong>2 secondes</strong>, puis arrête-le. La LED reste éteinte.</p>",
          depart: [], solution: [["allumer", "buzzer"], ["attendre", 2], ["eteindre", "buzzer"]],
          tests: [{ nom: "Sonnerie", duree: 4, verifs: [[0.5, { buzzer: true, led: false }], [1.5, { buzzer: true }], [2.5, { buzzer: false }], [3.5, { buzzer: false }]] }],
          indices: ["allumer le buzzer → attendre 2 → éteindre le buzzer."] },
        { id: "tb1e2", titre: "Le volet qui remonte", type: "blocs", objet: O.volet,
          enonce: "<p>Le volet doit <strong>monter pendant 3 secondes</strong>, s'<strong>arrêter 2 secondes</strong>, puis <strong>descendre 3 secondes</strong> et s'arrêter.</p>",
          depart: [], solution: [["moteur", "volet", "monter"], ["attendre", 3], ["moteur", "volet", "arret"], ["attendre", 2], ["moteur", "volet", "descendre"], ["attendre", 3], ["moteur", "volet", "arret"]],
          tests: [{ nom: "Monter, pause, descendre", duree: 10, verifs: [[1, { volet: "monter" }], [4, { volet: "arret" }], [6, { volet: "descendre" }], [7.5, { volet: "descendre" }], [9, { volet: "arret" }]] }],
          indices: ["Il faut 7 blocs : moteur, attendre, moteur, attendre, moteur, attendre, moteur."] } ] },
    { id: "tb2", titre: "Répéter", notion: "boucles", blocs: B.B2, rappel: "b2",
      cours: "<p>« répéter … fois » répète un nombre de fois connu ; « répéter indéfiniment » ne s'arrête jamais.</p>",
      exercices: [
        { id: "tb2e1", titre: "Trois bips", type: "blocs", objet: O.signal,
          enonce: "<p>Le buzzer doit faire <strong>3 bips</strong> : en marche 1 s, arrêté 1 s, trois fois. Utilise une boucle.</p>",
          depart: [], solution: [["fois", 3, [["allumer", "buzzer"], ["attendre", 1], ["eteindre", "buzzer"], ["attendre", 1]]]],
          tests: [{ nom: "3 bips", duree: 8, verifs: [[0.5, { buzzer: true }], [1.5, { buzzer: false }], [2.5, { buzzer: true }], [4.5, { buzzer: true }], [5.5, { buzzer: false }], [6.5, { buzzer: false }], [7.5, { buzzer: false }]] }],
          exige: [{ bloc: "repeter_fois", message: "Utilise « répéter … fois »." }], indices: ["répéter 3 fois : allumer, attendre 1, éteindre, attendre 1."] },
        { id: "tb2e2", titre: "Le phare", type: "blocs", objet: O.led,
          enonce: "<p>Un phare clignote <strong>sans arrêt</strong> : allumé <strong>1 s</strong>, éteint <strong>2 s</strong>.</p>",
          depart: [], solution: [["toujours", [["allumer", "led"], ["attendre", 1], ["eteindre", "led"], ["attendre", 2]]]],
          tests: [{ nom: "Le phare", duree: 9, verifs: [[0.5, { led: true }], [1.5, { led: false }], [2.5, { led: false }], [3.5, { led: true }], [4.5, { led: false }], [6.5, { led: true }], [8, { led: false }]] }],
          exige: [{ bloc: "repeter_toujours", message: "Le phare ne s'arrête jamais : utilise « répéter indéfiniment »." }], indices: ["répéter indéfiniment : allumer, attendre 1, éteindre, attendre 2."] } ] },
    { id: "tb3", titre: "Capteurs et conditions", notion: "si… alors… sinon", blocs: B.B3, rappel: "b3",
      cours: "<p>Dans « répéter indéfiniment », le « si … alors … sinon » lit le capteur en permanence et choisit l'action.</p>",
      exercices: [
        { id: "tb3e1", titre: "La veilleuse", type: "blocs", objet: O.crepuscule,
          enonce: "<p>Une veilleuse s'allume quand la luminosité est <strong>inférieure à 20 %</strong>, et s'éteint sinon.</p>",
          depart: [], solution: [["toujours", [["sisinon", ["cmp", ["capteur", "lumiere"], "<", 20], [["allumer", "lampe"]], [["eteindre", "lampe"]]]]]],
          tests: [{ nom: "Le soir", duree: 8, capteurs: { lumiere: [[0, 60], [3, 25], [5, 15]] }, verifs: [[1, { lampe: false }], [4, { lampe: false }], [6, { lampe: true }]] },
                  { nom: "Le matin", duree: 6, capteurs: { lumiere: [[0, 5], [3, 50]] }, verifs: [[1, { lampe: true }], [4, { lampe: false }]] }],
          exige: [{ bloc: "si_sinon", message: "Utilise « si … alors … sinon »." }], indices: ["répéter indéfiniment → si luminosité < 20 alors allumer sinon éteindre."] },
        { id: "tb3e2", titre: "Le radiateur", type: "blocs", objet: O.chauffage,
          enonce: "<p>Le radiateur chauffe quand la température est <strong>inférieure à 20 °C</strong>, sinon il est éteint.</p>",
          depart: [["toujours", [["sisinon", null, [["allumer", "radiateur"]], [["eteindre", "radiateur"]]]]]],
          solution: [["toujours", [["sisinon", ["cmp", ["capteur", "temperature"], "<", 20], [["allumer", "radiateur"]], [["eteindre", "radiateur"]]]]]],
          tests: [{ nom: "Matinée", duree: 8, capteurs: { temperature: [[0, 16], [3, 19], [5, 21]] }, verifs: [[1, { radiateur: true }], [4, { radiateur: true }], [6, { radiateur: false }]] }],
          exige: [{ bloc: "capteur_num", message: "La condition doit utiliser le capteur de température." }], indices: ["Construis la condition : température < 20."] } ] },
    { id: "tb4", titre: "Combiner des conditions", notion: "et, ou, non", blocs: B.B4, rappel: "b4",
      cours: "<p><strong>et</strong> : les deux conditions doivent être vraies. <strong>ou</strong> : il suffit d'une. <strong>non</strong> : inverse la condition.</p>",
      exercices: [
        { id: "tb4e1", titre: "L'alarme d'ouverture", type: "blocs", objet: O.alarme,
          enonce: "<p>La sirène sonne si la <strong>porte</strong> est ouverte <strong>ou</strong> si la <strong>fenêtre</strong> est ouverte. Sinon, elle est arrêtée.</p>",
          depart: [], solution: [["toujours", [["sisinon", ["ou", ["capteur", "porte"], ["capteur", "fenetre"]], [["allumer", "sirene"]], [["eteindre", "sirene"]]]]]],
          tests: [{ nom: "Ouvertures", duree: 10, capteurs: { porte: [[0, false], [2, true], [4, false]], fenetre: [[0, false], [6, true], [8, false]] },
            verifs: [[1, { sirene: false }], [3, { sirene: true }], [5, { sirene: false }], [7, { sirene: true }], [9, { sirene: false }]] }],
          exige: [{ bloc: "op_ou", message: "Utilise le bloc « ou »." }], indices: ["La condition : porte ouverte ou fenêtre ouverte."] },
        { id: "tb4e2", titre: "L'arrosage s'il ne pleut pas", type: "blocs", objet: O.arrosage,
          enonce: "<p>La pompe arrose quand l'humidité est <strong>inférieure à 30 %</strong> <strong>et</strong> qu'il <strong>ne pleut pas</strong>.</p>",
          depart: [["toujours", [["sisinon", ["cmp", ["capteur", "humidite"], "<", 30], [["allumer", "pompe"]], [["eteindre", "pompe"]]]]]],
          solution: [["toujours", [["sisinon", ["et", ["cmp", ["capteur", "humidite"], "<", 30], ["non", ["capteur", "pluie"]]], [["allumer", "pompe"]], [["eteindre", "pompe"]]]]]],
          tests: [{ nom: "Sol sec, sans pluie", duree: 5, capteurs: { humidite: [[0, 20]], pluie: [[0, false]] }, verifs: [[1, { pompe: true }], [4, { pompe: true }]] },
                  { nom: "Sol sec, il pleut", duree: 5, capteurs: { humidite: [[0, 20]], pluie: [[0, true]] }, verifs: [[1, { pompe: false }], [4, { pompe: false }]] },
                  { nom: "Sol humide", duree: 5, capteurs: { humidite: [[0, 60]], pluie: [[0, false]] }, verifs: [[1, { pompe: false }]] }],
          exige: [{ bloc: "op_non", message: "Utilise « non » pour « il ne pleut pas »." }], indices: ["Combine avec « et » : humidité < 30 et non pluie."] } ] },
    { id: "tb5", titre: "Événements", notion: "déclencher une action", blocs: B.B5, rappel: "bev",
      cours: "<p>« quand [capteur] » déclenche des instructions au moment où le capteur devient vrai (un appui, une détection).</p>",
      exercices: [
        { id: "tb5e1", titre: "La sonnette d'entrée", type: "blocs", objet: { capteurs: { bouton: { label: "bouton appuyé", type: "bool" } }, actionneurs: { buzzer: { label: "le buzzer", type: "tor", on: "en marche", off: "arrêté" } } },
          enonce: "<p>Quand on <strong>appuie sur le bouton</strong>, le buzzer sonne <strong>2 secondes</strong>.</p>",
          depart: [], solution: [["quand", "bouton", [["allumer", "buzzer"], ["attendre", 2], ["eteindre", "buzzer"]]]],
          tests: [{ nom: "Deux visiteurs", duree: 12, capteurs: { bouton: [[0, false], [1, true], [1.3, false], [7, true], [7.3, false]] },
            verifs: [[0.5, { buzzer: false }], [1.5, { buzzer: true }], [3.5, { buzzer: false }], [7.5, { buzzer: true }], [10, { buzzer: false }]] }],
          exige: [{ bloc: "quand_capteur", message: "Utilise l'événement « quand bouton appuyé »." }], indices: ["Catégorie Événements : « quand … ».", "Dedans : allumer le buzzer, attendre 2, éteindre."] },
        { id: "tb5e2", titre: "Le détecteur de passage", type: "blocs", objet: O.presence,
          enonce: "<p>Quand une <strong>présence est détectée</strong>, la lampe s'allume <strong>4 secondes</strong> puis s'éteint.</p>",
          depart: [], solution: [["quand", "presence", [["allumer", "lampe"], ["attendre", 4], ["eteindre", "lampe"]]]],
          tests: [{ nom: "Un passage", duree: 9, capteurs: { presence: [[0, false], [2, true], [2.5, false]] }, verifs: [[1, { lampe: false }], [3, { lampe: true }], [5.5, { lampe: true }], [7, { lampe: false }]] }],
          exige: [{ bloc: "quand_capteur", message: "Utilise l'événement « quand présence détectée »." }], indices: ["quand présence détectée : allumer, attendre 4, éteindre."] } ] },
    { id: "tb6", titre: "Variables", notion: "affecter, compter, mémoriser", blocs: B.B6, rappel: "b5",
      cours: "<p>Une variable garde une valeur : « mettre temps à 5 », « ajouter -1 à temps ». On peut l'afficher sur l'écran.</p>",
      exercices: [
        { id: "tb6e1", titre: "Compter jusqu'à 3", type: "blocs", objet: O.minuteur,
          enonce: "<p>L'écran doit afficher <strong>1, 2, 3</strong> (une valeur par seconde), puis le buzzer sonne. Utilise la variable <code>temps</code> : mets-la à 1, puis ajoute 1 à chaque tour.</p>",
          depart: [], solution: [["mettre", "temps", 1], ["fois", 3, [["ecran", ["var", "temps"]], ["attendre", 1], ["ajouter", "temps", 1]]], ["allumer", "buzzer"]],
          tests: [{ nom: "1, 2, 3", duree: 5, verifs: [[0.5, { ecran: "1" }], [1.5, { ecran: "2" }], [2.5, { ecran: "3", buzzer: false }], [3.5, { buzzer: true }]] }],
          exige: [{ bloc: "var_ajouter", message: "Utilise « ajouter … à temps »." }], indices: ["mettre temps à 1, puis répéter 3 fois : afficher temps, attendre 1, ajouter 1 à temps."] },
        { id: "tb6e2", titre: "Le compteur de passages", type: "blocs", objet: O.compteur,
          enonce: "<p>À chaque <strong>personne détectée</strong>, le compteur augmente de 1 et l'écran affiche sa valeur. Au départ, compteur vaut 0.</p>",
          depart: [["mettre", "compteur", 0]], solution: [["mettre", "compteur", 0], ["quand", "presence", [["ajouter", "compteur", 1], ["ecran", ["var", "compteur"]]]]],
          tests: [{ nom: "Trois personnes", duree: 8, capteurs: { presence: [[0, false], [1, true], [1.5, false], [3, true], [3.5, false], [5, true], [5.5, false]] },
            verifs: [[2, { "$compteur": 1 }], [4, { "$compteur": 2 }], [6, { "$compteur": 3, ecran: "3" }]] }],
          exige: [{ bloc: "var_ajouter", message: "Utilise « ajouter 1 à compteur »." }], indices: ["Événement : quand personne détectée.", "Dedans : ajouter 1 à compteur, puis afficher compteur."] } ] },
    { id: "tb7", titre: "Listes", notion: "enregistrer et analyser des données", blocs: B.B7, rappel: "bli",
      cours: "<p>« ajouter … à la liste » range une valeur à la fin de la liste. « élément n de la liste » lit une valeur.</p>",
      exercices: [
        { id: "tb7e1", titre: "Trois relevés", type: "blocs", objet: O.meteo,
          enonce: "<p>Relève la température <strong>3 fois, toutes les secondes</strong>, et range chaque relevé dans la liste <code>releves</code>.</p>",
          depart: [], solution: [["fois", 3, [["lajouter", "releves", ["capteur", "temperature"]], ["attendre", 1]]]],
          tests: [{ nom: "Relevés", duree: 4, capteurs: { temperature: [[0, 10], [1, 12], [2, 15]] }, verifs: [[0.5, { "#releves": [10] }], [3.5, { "#releves": [10, 12, 15] }]] }],
          exige: [{ bloc: "liste_ajouter", message: "Utilise « ajouter … à la liste releves »." }], indices: ["répéter 3 fois : ajouter température à releves, attendre 1."] },
        { id: "tb7e2", titre: "Afficher le premier relevé", type: "blocs", objet: O.meteo,
          enonce: "<p>Le programme fait 3 relevés. Ajoute à la fin l'instruction qui <strong>affiche le premier relevé</strong> de la liste sur l'écran.</p>",
          depart: [["fois", 3, [["lajouter", "releves", ["capteur", "temperature"]], ["attendre", 1]]]],
          solution: [["fois", 3, [["lajouter", "releves", ["capteur", "temperature"]], ["attendre", 1]]], ["ecran", ["lelement", "releves", 1]]],
          tests: [{ nom: "Premier relevé", duree: 5, capteurs: { temperature: [[0, 8], [1, 13], [2, 17]] }, verifs: [[4, { ecran: "8" }]] }],
          exige: [{ bloc: "liste_element", message: "Utilise « élément … de la liste releves »." }], indices: ["Sous la boucle : afficher « élément 1 de releves »."] } ] },
    { id: "tb8", titre: "Projet", notion: "modifier une fonctionnalité", blocs: B.B8, rappel: "b6",
      cours: "<p>On part d'un programme qui marche et on le modifie pour répondre à un nouveau besoin du cahier des charges.</p>",
      exercices: [
        { id: "tb8e1", titre: "La serre : arroser moins", type: "blocs", objet: O.arrosage,
          enonce: "<p>La pompe arrose quand l'humidité est inférieure à 50 %. Les plantes ont trop d'eau : modifie le seuil à <strong>35 %</strong>.</p>",
          depart: [["toujours", [["sisinon", ["cmp", ["capteur", "humidite"], "<", 50], [["allumer", "pompe"]], [["eteindre", "pompe"]]]]]],
          solution: [["toujours", [["sisinon", ["cmp", ["capteur", "humidite"], "<", 35], [["allumer", "pompe"]], [["eteindre", "pompe"]]]]]],
          tests: [{ nom: "Le sol sèche", duree: 8, capteurs: { humidite: [[0, 60], [2, 45], [4, 34]] }, verifs: [[1, { pompe: false }], [3, { pompe: false }], [5, { pompe: true }]] }],
          indices: ["Change seulement le nombre dans la condition."] },
        { id: "tb8e2", titre: "Le feu piéton", type: "blocs", objet: O.feu,
          enonce: "<p>Un feu piéton reste <strong>rouge</strong>. Quand le système démarre, il passe au <strong>vert 4 s</strong>, puis à l'<strong>orange 1 s</strong>, puis revient au rouge, et ce cycle se répète <strong>2 fois</strong>.</p>",
          depart: [], solution: [["fois", 2, [["eteindre", "rouge"], ["allumer", "vert"], ["attendre", 4], ["eteindre", "vert"], ["allumer", "orange"], ["attendre", 1], ["eteindre", "orange"], ["allumer", "rouge"], ["attendre", 2]]]],
          tests: [{ nom: "Deux cycles", duree: 15, verifs: [[1, { vert: true, rouge: false }], [4.5, { orange: true, vert: false }], [5.5, { rouge: true }], [8, { vert: true }], [11.5, { orange: true }], [13, { rouge: true, vert: false }], [14.5, { rouge: true }]] }],
          exige: [{ bloc: "repeter_fois", message: "Le cycle se répète 2 fois : utilise « répéter … fois »." }],
          indices: ["Dans la boucle : éteindre rouge, allumer vert, attendre 4, éteindre vert, allumer orange, attendre 1, éteindre orange, allumer rouge, attendre 2."] } ] }
  ];
})();
