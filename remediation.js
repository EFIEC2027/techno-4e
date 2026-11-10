/*
 * Remédiation — technologie 4e — exercices NOUVEAUX pour retravailler les points faibles
 * repérés par le diagnostic « Algorithmes 1 à 4 ». Pas noté.
 * 4 notions × 4 exercices (identifiants « ra »). Ne changez pas l'id d'un exercice déjà utilisé.
 */
(function () {
  const DEBUT = { t: "debut" }, FIN = { t: "fin" };
  const act = (txt, trou) => ({ t: "action", txt, trou });
  const es = (txt, trou) => ({ t: "es", txt, trou });
  const si = (txt, oui, non, trou) => ({ t: "si", txt, oui, non, trou });
  const tantque = (txt, corps, trou) => ({ t: "tantque", txt, corps, trou });

  window.PARCOURS_REMED_ALGO = [
    { id: "ra1", titre: "Retravailler : la chaîne d'information", notion: "capteur, actionneur, acquérir / traiter / communiquer", rappel: "a1",
      cours: "<p><strong>Capteur</strong> = il mesure ou détecte (il donne une information). <strong>Actionneur</strong> = il agit : il bouge, chauffe, éclaire ou fait du bruit.</p><p>L'information circule toujours dans cet ordre : <strong>Acquérir</strong> (le capteur) → <strong>Traiter</strong> (la carte programmable compare et décide) → <strong>Communiquer</strong> (la carte envoie l'ordre à l'actionneur).</p>",
      exercices: [
        { id: "ra1e1", titre: "La porte du supermarché", type: "qcm", enonce: "<p>Une porte de supermarché s'ouvre toute seule quand un client approche. Lequel de ces éléments est un <strong>capteur</strong> ?</p>",
          choix: ["Le radar au-dessus de la porte", "Le moteur qui fait glisser la porte", "Les vitres de la porte", "Le voyant vert"], bonne: 0,
          explication: "Le radar détecte le client : il donne une information, c'est un capteur. Le moteur et le voyant agissent : ce sont des actionneurs.", indices: ["Lequel donne une information ?", "Les autres bougent ou s'allument : ils agissent."] },
        { id: "ra1e2", titre: "Le grille-pain", type: "qcm", enonce: "<p>Dans un grille-pain programmable, la <strong>résistance qui chauffe le pain</strong> est…</p>",
          choix: ["un actionneur", "un capteur", "la carte programmable", "une information"], bonne: 0,
          explication: "La résistance agit sur le pain : elle chauffe. C'est un actionneur.", indices: ["Est-ce qu'elle mesure quelque chose, ou est-ce qu'elle agit ?"] },
        { id: "ra1e3", titre: "Quelle fonction ?", type: "qcm", enonce: "<p>Dans une station météo, la carte programmable <strong>calcule</strong> la température moyenne de la journée. Quelle fonction de la chaîne d'information est-ce ?</p>",
          choix: ["Traiter", "Acquérir", "Communiquer", "Agir"], bonne: 0,
          explication: "Calculer, comparer, décider : c'est le travail de la carte programmable, la fonction Traiter.", indices: ["Qui fait les calculs : le capteur, la carte ou l'écran ?"] },
        { id: "ra1e4", titre: "Remettre dans l'ordre", type: "qcm", enonce: "<p>Une alarme de voiture. Quel est le bon ordre ?</p>",
          choix: ["Le capteur détecte un choc → la carte décide de déclencher → la sirène sonne", "La sirène sonne → le capteur détecte un choc → la carte décide", "La carte décide → le capteur détecte un choc → la sirène sonne", "Le capteur détecte un choc → la sirène sonne → la carte décide"], bonne: 0,
          explication: "Acquérir (le capteur détecte), puis Traiter (la carte décide), puis Communiquer (l'ordre part vers la sirène, qui sonne).", indices: ["Qu'est-ce qui se passe en tout premier ?", "La carte doit décider AVANT que la sirène sonne."] } ] },

    { id: "ra2", titre: "Retravailler : algorigrammes et variables", notion: "symboles, séquence, variables, ordre des instructions", rappel: "a2",
      cours: "<p><strong>Ovale</strong> = Début / Fin · <strong>Rectangle</strong> = action ou calcul · <strong>Parallélogramme</strong> = lire (entrée) ou afficher (sortie) · <strong>Losange</strong> = question oui / non.</p><p>On lit de haut en bas, une case après l'autre. « x ← x + 2 » veut dire : prends la valeur actuelle de x, ajoute 2, range le résultat dans x. Une variable ne garde qu'<strong>une</strong> valeur : la dernière.</p><p>Ordre logique : d'abord <strong>lire</strong>, ensuite <strong>tester ou calculer</strong>, enfin <strong>agir ou afficher</strong>.</p>",
      exercices: [
        { id: "ra2e1", titre: "Le bon symbole", type: "qcm", enonce: "<p>Dans un algorigramme, l'instruction « <strong>Calculer prix ← quantité × 2</strong> » se dessine dans…</p>",
          choix: ["un rectangle", "un parallélogramme", "un losange", "un ovale"], bonne: 0,
          explication: "Un calcul est une action (traitement) : rectangle. Le parallélogramme est réservé à lire et afficher.", indices: ["Est-ce qu'on lit, qu'on affiche, qu'on pose une question, ou qu'on fait un calcul ?"] },
        { id: "ra2e2", titre: "Suivre pas à pas", type: "suivre", schema: [DEBUT, act("score ← 10"), act("score ← score − 3"), act("score ← score × 2"), es("Afficher score"), FIN],
          enonce: "<p>Fais tourner cet algorigramme à la main, case par case. Conseil : écris la valeur de <code>score</code> après chaque case.</p>", question: "Quelle valeur est affichée ?", attendu: "14",
          explication: "score vaut 10, puis 10 − 3 = 7, puis 7 × 2 = 14.", indices: ["Après la 2e case, score vaut 7.", "Ensuite on multiplie 7 par 2."] },
        { id: "ra2e3", titre: "La variable qui ne bouge plus", type: "suivre", schema: [DEBUT, act("a ← 8"), act("b ← a + 1"), act("a ← 0"), es("Afficher b"), FIN],
          enonce: "<p>Attention : on affiche <strong>b</strong>, pas a.</p>", question: "Quelle valeur est affichée ?", attendu: "9",
          explication: "b reçoit 8 + 1 = 9 au moment où on l'écrit. Mettre a à 0 ensuite ne change pas b.", indices: ["Quand on calcule b, a vaut encore 8.", "Changer a après ne change pas b."] },
        { id: "ra2e4", titre: "Compléter : le compteur de visiteurs", type: "completer", schema: [DEBUT, es("", "A"), act("total ← total + 1"), es("Afficher total"), FIN],
          enonce: "<p>Un compteur ajoute 1 au total quand un visiteur passe, puis affiche le total. Que faut-il mettre dans la case <strong>A</strong>, au tout début ?</p>",
          trous: { A: { choix: ["Lire capteur de passage", "Afficher total", "Allumer la lampe", "Fin"], bonne: 0 } },
          explication: "On commence toujours par acquérir l'information : lire le capteur de passage. Ensuite on calcule, enfin on affiche.", indices: ["Que doit-on faire avant de compter ?"] } ] },

    { id: "ra3", titre: "Retravailler : les conditions", notion: "cas limite, choisir la condition", rappel: "a3",
      cours: "<p>Au losange, on répond à la question par <strong>oui</strong> ou <strong>non</strong>, et on suit la branche.</p><p><strong>&lt;</strong> = strictement plus petit : 25 &lt; 25 est <strong>faux</strong>. <strong>≤</strong> = plus petit ou égal : 25 ≤ 25 est <strong>vrai</strong>. Même chose pour &gt; et ≥.</p><p>Dans le losange, on teste l'information du <strong>capteur</strong> (température, distance…), jamais l'actionneur.</p>",
      exercices: [
        { id: "ra3e1", titre: "Pile sur la limite", type: "suivre", schema: [DEBUT, es("Lire température"), si("température > 25 ?", [act("Allumer le ventilateur")], [act("Éteindre le ventilateur")]), FIN],
          enonce: "<p>Le capteur mesure exactement <strong>25 °C</strong>.</p>", question: "Le ventilateur est-il allumé ou éteint ?", attendu: "éteint", accepte: ["eteint", "il est éteint", "il est eteint"],
          explication: "25 > 25 est faux (25 n'est pas strictement plus grand que 25) : branche non, le ventilateur est éteint.", indices: ["25 est-il STRICTEMENT plus grand que 25 ?"] },
        { id: "ra3e2", titre: "Avec « ou égal »", type: "suivre", schema: [DEBUT, es("Lire batterie"), si("batterie ≤ 20 ?", [act("Allumer le voyant rouge")], [act("Éteindre le voyant rouge")]), FIN],
          enonce: "<p>La batterie est exactement à <strong>20 %</strong>.</p>", question: "Le voyant rouge est-il allumé ou éteint ?", attendu: "allumé", accepte: ["allume", "il est allumé", "il est allume"],
          explication: "« ≤ » veut dire plus petit OU ÉGAL : 20 ≤ 20 est vrai, branche oui, le voyant est allumé.", indices: ["Le signe ≤ accepte l'égalité."] },
        { id: "ra3e3", titre: "Compléter : la veilleuse", type: "completer", schema: [DEBUT, es("Lire luminosité"), si("", [act("Allumer la veilleuse")], [act("Éteindre la veilleuse")], "A"), FIN],
          enonce: "<p>La veilleuse doit s'allumer quand la luminosité est <strong>inférieure à 15 %</strong>. Que faut-il écrire dans le losange <strong>A</strong> ?</p>",
          trous: { A: { choix: ["luminosité < 15 ?", "luminosité > 15 ?", "veilleuse < 15 ?", "Afficher luminosité"], bonne: 0 } },
          explication: "« Inférieure à 15 » s'écrit luminosité < 15. On teste le capteur (la luminosité), pas l'actionneur.", indices: ["Inférieure = plus petite : quel signe ?", "On teste ce que mesure le capteur."] },
        { id: "ra3e4", titre: "Compléter : le parking", type: "completer", schema: [DEBUT, es("Lire places libres"), si("places libres > 0 ?", [act("", "A")], [act("Afficher COMPLET")]), FIN],
          enonce: "<p>S'il reste des places libres, la barrière doit s'ouvrir. Sinon, on affiche « COMPLET ». Que faut-il écrire dans la case <strong>A</strong> (branche oui) ?</p>",
          trous: { A: { choix: ["Ouvrir la barrière", "Afficher COMPLET", "Lire places libres", "Fermer la barrière"], bonne: 0 } },
          explication: "Branche oui = il reste des places : on ouvre la barrière. La branche non affiche COMPLET.", indices: ["Que veut dire « oui » à la question « places libres > 0 ? »"] } ] },

    { id: "ra4", titre: "Retravailler : les boucles", notion: "compter les tours, boucle sans fin", rappel: "a4",
      cours: "<p>Pour compter les tours d'une boucle « tant que », fais un <strong>tableau</strong> : à chaque passage au losange, écris la valeur de la variable et si le test est vrai ou faux. Quand le test devient <strong>faux</strong>, on sort.</p><p>Pour qu'une boucle s'arrête, quelque chose doit <strong>changer</strong> dedans : le compteur (i ← i + 1) ou une nouvelle lecture du capteur. Sinon, c'est une <strong>boucle sans fin</strong>.</p>",
      exercices: [
        { id: "ra4e1", titre: "Le tableau des tours", type: "suivre", schema: [DEBUT, act("k ← 0"), tantque("k < 4 ?", [act("Faire un bip"), act("k ← k + 1")]), FIN],
          enonce: "<p>Fais le tableau : k = 0 → test vrai → bip ; k = 1 → … Continue jusqu'à ce que le test soit faux.</p>", question: "Combien de bips ? Réponds par un nombre.", attendu: "4",
          explication: "k vaut 0, 1, 2, 3 : quatre bips. Quand k vaut 4, 4 < 4 est faux, on sort.", indices: ["Quand k vaut 3, le test est encore vrai.", "Quand k vaut 4, on sort sans biper."] },
        { id: "ra4e2", titre: "De 3 en 3", type: "suivre", schema: [DEBUT, act("x ← 0"), tantque("x < 9 ?", [act("Allumer la LED"), act("x ← x + 3")]), FIN],
          enonce: "<p>Attention : x augmente de 3 à chaque tour.</p>", question: "Combien de fois la LED s'allume-t-elle ? Réponds par un nombre.", attendu: "3",
          explication: "x vaut 0, 3, 6 : trois tours. Quand x vaut 9, 9 < 9 est faux, on sort.", indices: ["Écris les valeurs : 0, 3, 6, 9…", "9 < 9 est-il vrai ?"] },
        { id: "ra4e3", titre: "Réparer la boucle sans fin", type: "completer", schema: [DEBUT, act("tour ← 0"), tantque("tour < 5 ?", [act("Faire tourner le moteur"), act("", "A")]), FIN],
          enonce: "<p>Sans la case <strong>A</strong>, ce moteur tourne pour toujours. Que faut-il écrire en <strong>A</strong> pour qu'il fasse exactement 5 tours ?</p>",
          trous: { A: { choix: ["tour ← tour + 1", "tour ← 0", "Afficher tour", "tour ← 5 + 1"], bonne: 0 } },
          explication: "Il faut que tour augmente à chaque passage : tour ← tour + 1. Avec tour ← 0, il reviendrait toujours à 0.", indices: ["Qu'est-ce qui doit changer à chaque tour ?"] },
        { id: "ra4e4", titre: "Relire le capteur", type: "completer", schema: [DEBUT, es("Lire distance"), tantque("distance > 10 ?", [act("Avancer un peu"), es("", "A")]), act("Arrêter le robot"), FIN],
          enonce: "<p>Le robot avance tant qu'il est loin du mur. Mais il fonce dans le mur ! Que faut-il mettre en <strong>A</strong>, dans la boucle ?</p>",
          trous: { A: { choix: ["Lire distance", "Afficher distance", "Arrêter le robot", "distance ← 100"], bonne: 0 } },
          explication: "Il faut relire le capteur à chaque tour : sinon la carte garde l'ancienne distance et le test reste toujours vrai.", indices: ["La distance change quand le robot avance : comment la carte le sait-elle ?"] } ] }
  ];
})();
