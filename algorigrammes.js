/*
 * Parcours « Algorithmes et chaîne d'information » — technologie 4e.
 * Programme de technologie cycle 4 (BO n° 9 du 29 février 2024), repères de 4e :
 *   chaîne d'information (identifier les constituants d'un objet réel et les associer à leurs fonctions),
 *   programmation des OST (modifier un algorithme pour répondre à un besoin, puis le traduire en programme),
 *   instructions conditionnelles et itératives, variables, événements, listes.
 * Algorigrammes selon la norme ISO 5807 : terminal (début/fin), traitement (rectangle),
 * entrée/sortie de données (parallélogramme), décision (losange).
 *
 * Types d'exercices : qcm (choix, bonne), suivre (question, attendu, accepte), completer (trous).
 * Ne changez pas l'id d'un exercice déjà utilisé par les élèves.
 */
(function () {
  const DEBUT = { t: "debut" }, FIN = { t: "fin" };
  const act = (txt, trou) => ({ t: "action", txt, trou });
  const es = (txt, trou) => ({ t: "es", txt, trou });
  const si = (txt, oui, non, trou) => ({ t: "si", txt, oui, non, trou });
  const tantque = (txt, corps, trou) => ({ t: "tantque", txt, corps, trou });

  window.PARCOURS_ALGO = [
    {
      id: "a1", titre: "La chaîne d'information", notion: "acquérir, traiter, communiquer",
      cours: `
<p>Un <strong>système automatisé</strong> (éclairage automatique, portail, store…) est organisé en deux chaînes :</p>
<table class="ops">
<tr><td><strong>Chaîne d'information</strong></td><td><strong>Acquérir</strong> : les <em>capteurs</em> et les boutons prélèvent des informations (présence, luminosité, appui).<br><strong>Traiter</strong> : la <em>carte programmable</em> (microcontrôleur) exécute le programme et décide.<br><strong>Communiquer</strong> : elle envoie des ordres à la chaîne d'énergie et informe l'utilisateur (voyant, écran, buzzer).</td></tr>
<tr><td><strong>Chaîne d'énergie</strong></td><td><strong>Alimenter</strong> (pile, secteur) → <strong>Distribuer</strong> (relais, carte de commande) → <strong>Convertir</strong> (les <em>actionneurs</em> : moteur, lampe) → <strong>Transmettre</strong> (engrenages, poulies).</td></tr>
</table>
<p>Un capteur <strong>tout ou rien</strong> (TOR) donne seulement deux valeurs : oui ou non (bouton poussoir, détecteur de présence, fin de course). Un capteur de <strong>mesure</strong> donne une valeur (luminosité en %, température en °C, distance en cm).</p>`,
      exercices: [
        { id: "a1e1", titre: "Acquérir", type: "qcm",
          enonce: "<p>Dans un <strong>éclairage automatique de couloir</strong>, quel composant <strong>acquiert</strong> l'information « quelqu'un arrive » ?</p>",
          choix: ["Le détecteur de présence", "La lampe", "La carte programmable", "Le relais"], bonne: 0,
          explication: "Le détecteur de présence est un capteur : il acquiert l'information. La lampe convertit l'énergie, la carte traite.",
          indices: ["Acquérir = prélever une information sur l'environnement : c'est le rôle d'un capteur."] },
        { id: "a1e2", titre: "Traiter", type: "qcm",
          enonce: "<p>Dans un <strong>portail automatique</strong>, quel élément <strong>traite</strong> les informations et décide d'ouvrir ou de fermer ?</p>",
          choix: ["La carte programmable qui exécute le programme", "Le moteur", "La télécommande", "Le capteur de fin de course"], bonne: 0,
          explication: "La carte programmable (microcontrôleur) exécute le programme : c'est la fonction Traiter de la chaîne d'information.",
          indices: ["Le programme est stocké et exécuté dans quel composant ?"] },
        { id: "a1e3", titre: "Chaîne d'énergie", type: "qcm",
          enonce: "<p>Le moteur du portail transforme l'énergie électrique en énergie mécanique. À quelle fonction correspond-il ?</p>",
          choix: ["Convertir (chaîne d'énergie)", "Acquérir (chaîne d'information)", "Traiter (chaîne d'information)", "Alimenter (chaîne d'énergie)"], bonne: 0,
          explication: "Un actionneur comme le moteur convertit une énergie en une autre : fonction Convertir de la chaîne d'énergie.",
          indices: ["Le moteur change une forme d'énergie en une autre."] },
        { id: "a1e4", titre: "Tout ou rien, ou mesure ?", type: "qcm",
          enonce: "<p>Lequel de ces capteurs est un capteur <strong>tout ou rien</strong> (il ne donne que oui ou non) ?</p>",
          choix: ["Le capteur de fin de course du portail", "La sonde de température de la serre", "Le capteur de luminosité du lampadaire", "Le capteur de distance à ultrasons"], bonne: 0,
          explication: "Le fin de course est soit appuyé, soit relâché : deux valeurs seulement. Les trois autres donnent une mesure.",
          indices: ["Lequel répond seulement « oui » ou « non » ?"] }
      ]
    },
    {
      id: "a2", titre: "Algorithme et algorigramme", notion: "séquence d'instructions",
      cours: `
<p>Un <strong>algorithme</strong> est une suite d'instructions qui décrit, étape par étape, comment répondre à un besoin. On peut l'écrire en <strong>langage naturel</strong> (des phrases), le dessiner sous forme d'<strong>algorigramme</strong>, puis le traduire en <strong>programme</strong> pour la carte programmable.</p>
<table class="ops">
<tr><td><span class="forme ovale">Début</span></td><td><strong>Ovale</strong> (terminal) : le début et la fin.</td></tr>
<tr><td><span class="forme rect">Allumer la lampe</span></td><td><strong>Rectangle</strong> (traitement) : une action ou un calcul.</td></tr>
<tr><td><span class="forme para">Lire température</span></td><td><strong>Parallélogramme</strong> (entrée / sortie) : lire une donnée (capteur, clavier) ou afficher une information.</td></tr>
<tr><td><span class="forme losange">porte ouverte ?</span></td><td><strong>Losange</strong> (décision) : une question dont la réponse est oui ou non.</td></tr>
</table>
<p>Ces symboles suivent la norme ISO 5807. On lit l'algorigramme <strong>de haut en bas, en suivant les flèches</strong> : c'est une <strong>séquence d'instructions</strong>.</p>
<p>Une <strong>variable</strong> est une case mémoire qui porte un nom. <code>temps ← 30</code> se lit « temps prend la valeur 30 » : on dit qu'on <strong>affecte</strong> 30 à la variable temps.</p>`,
      schemaCours: [DEBUT, es("Lire luminosité"), act("Allumer la lampe"), act("Attendre 5 s"), act("Éteindre la lampe"), FIN],
      exercices: [
        { id: "a2e1", titre: "Le bon symbole", type: "qcm",
          enonce: "<p>Dans un algorigramme, quel symbole utilise-t-on pour <strong>lire la valeur d'un capteur</strong> (une entrée de données) ?</p>",
          choix: ["Le parallélogramme", "Le rectangle", "Le losange", "L'ovale"], bonne: 0,
          explication: "Lire ou afficher une donnée est une entrée / sortie : on la dessine dans un parallélogramme.",
          indices: ["Relis le tableau des symboles du cours."] },
        { id: "a2e2", titre: "De l'algorigramme au langage naturel", type: "qcm",
          schema: [DEBUT, act("Allumer le feu vert"), act("Attendre 20 s"), act("Éteindre le feu vert"), act("Allumer le feu orange"), act("Attendre 3 s"), act("Éteindre le feu orange"), act("Allumer le feu rouge"), FIN],
          enonce: "<p>Quelle phrase décrit cet algorigramme d'un feu tricolore ?</p>",
          choix: ["Le feu est vert 20 s, puis orange 3 s, puis rouge.", "Le feu est rouge 20 s, puis orange 3 s, puis vert.", "Les trois feux s'allument en même temps.", "Le feu passe du vert au rouge sans orange."], bonne: 0,
          explication: "On suit les flèches de haut en bas : vert pendant 20 s, orange pendant 3 s, puis rouge.",
          indices: ["Lis les rectangles dans l'ordre, de haut en bas."] },
        { id: "a2e3", titre: "Compléter : la minuterie", type: "completer",
          schema: [DEBUT, act("Allumer la lampe"), act("", "A"), act("", "B"), FIN],
          enonce: "<p>Besoin : la lampe de l'escalier reste <strong>allumée 3 minutes</strong>, puis s'éteint. Complète les cases <strong>A</strong> et <strong>B</strong>.</p>",
          trous: {
            A: { choix: ["Attendre 3 min", "Éteindre la lampe", "Allumer la lampe", "Lire présence"], bonne: 0 },
            B: { choix: ["Éteindre la lampe", "Attendre 3 min", "Allumer la lampe", "Afficher 3"], bonne: 0 }
          },
          explication: "La lampe est allumée, on attend 3 minutes, puis on l'éteint. L'ordre des instructions compte.",
          indices: ["Que se passe-t-il entre « allumer » et « éteindre » ?"] },
        { id: "a2e4", titre: "Les variables", type: "suivre",
          schema: [DEBUT, act("temps ← 30"), act("temps ← temps − 10"), act("temps ← temps × 2"), es("Afficher temps"), FIN],
          enonce: "<p>Un minuteur suit cet algorigramme. Fais-le fonctionner à la main en notant la valeur de la variable <code>temps</code> après chaque bloc.</p>",
          question: "Quelle valeur est affichée ?", attendu: "40",
          explication: "temps vaut 30, puis 30 − 10 = 20, puis 20 × 2 = 40.",
          indices: ["Après le 2e bloc, temps vaut 20.", "Puis on multiplie par 2."] }
      ]
    },
    {
      id: "a3", titre: "Instructions conditionnelles", notion: "si… alors… sinon",
      cours: `
<p>Une <strong>instruction conditionnelle</strong> choisit les instructions à exécuter selon une <strong>condition</strong>. La condition est une question dont la réponse est <strong>vraie</strong> (oui) ou <strong>fausse</strong> (non). Dans l'algorigramme, c'est le <strong>losange</strong> : on suit la branche oui ou la branche non.</p>
<p>Pour écrire une condition, on compare une valeur à un <strong>seuil</strong> avec <code>&lt;</code> (inférieur), <code>&gt;</code> (supérieur) ou <code>=</code> (égal). Attention : 19 &lt; 19 est faux.</p>
<p>Pour combiner deux conditions, on utilise les <strong>opérateurs logiques</strong> : <strong>ET</strong> (les deux doivent être vraies), <strong>OU</strong> (au moins une), <strong>NON</strong> (l'inverse).</p>`,
      schemaCours: [DEBUT, es("Lire température"), si("température < 19 ?", [act("Allumer le chauffage")], [act("Éteindre le chauffage")]), FIN],
      exercices: [
        { id: "a3e1", titre: "Le thermostat", type: "qcm",
          schema: [DEBUT, es("Lire température"), si("température < 19 ?", [act("Allumer le chauffage")], [act("Éteindre le chauffage")]), FIN],
          enonce: "<p>Le capteur mesure <strong>21 °C</strong>. Que fait le thermostat ?</p>",
          choix: ["Il éteint le chauffage", "Il allume le chauffage", "Il affiche 21", "Il attend que la température baisse"], bonne: 0,
          explication: "21 < 19 est faux : on suit la branche non, le chauffage est éteint.",
          indices: ["21 est-il inférieur à 19 ?"] },
        { id: "a3e2", titre: "Compléter : le lampadaire", type: "completer",
          schema: [DEBUT, es("Lire luminosité"), si("", [act("", "B")], [act("Éteindre la lampe")], "A"), FIN],
          enonce: "<p>Besoin : le lampadaire s'allume quand il fait sombre, c'est-à-dire quand la <strong>luminosité est inférieure à 30 %</strong>. Complète les cases <strong>A</strong> et <strong>B</strong>.</p>",
          trous: {
            A: { choix: ["luminosité < 30 ?", "luminosité > 30 ?", "luminosité = 100 ?", "Lire luminosité"], bonne: 0 },
            B: { choix: ["Allumer la lampe", "Éteindre la lampe", "Attendre 30 s", "Lire luminosité"], bonne: 0 }
          },
          explication: "La condition est « luminosité < 30 ? » ; si c'est vrai (il fait sombre), on allume la lampe.",
          indices: ["Il fait sombre quand la luminosité est petite.", "La branche oui correspond à « il fait sombre »."] },
        { id: "a3e3", titre: "Deux conditions", type: "qcm",
          schema: [DEBUT, es("Lire présence"), es("Lire luminosité"), si("présence ET luminosité < 30 ?", [act("Allumer la lampe")], [act("Éteindre la lampe")]), FIN],
          enonce: "<p>En plein jour (luminosité <strong>80 %</strong>), quelqu'un passe devant le détecteur. Que fait la lampe ?</p>",
          choix: ["Elle reste éteinte", "Elle s'allume", "Elle clignote", "Elle s'allume 30 secondes"], bonne: 0,
          explication: "Avec ET, les deux conditions doivent être vraies. Il y a une présence, mais 80 < 30 est faux : la lampe reste éteinte.",
          indices: ["ET : il faut que les deux conditions soient vraies en même temps."] },
        { id: "a3e4", titre: "Modifier un algorithme : la porte automatique", type: "completer",
          schema: [DEBUT, es("Lire présence"), si("présence ?", [act("Ouvrir la porte"), act("Attendre 5 s"), si("", [act("Attendre 2 s")], [act("Fermer la porte")], "A")], []), FIN],
          enonce: "<p>La porte automatique d'un magasin s'ouvre 5 s quand une personne est détectée. <strong>Nouvelle exigence</strong> : pour la sécurité, la porte ne doit pas se refermer si un obstacle est détecté dans le passage. Quelle condition faut-il ajouter dans la case <strong>A</strong> ?</p>",
          trous: { A: { choix: ["obstacle ?", "présence ?", "porte fermée ?", "Fermer la porte"], bonne: 0 } },
          explication: "S'il y a un obstacle (oui), on attend encore ; sinon (non), on ferme la porte. On a modifié l'algorithme pour répondre à un nouveau besoin.",
          indices: ["La porte se ferme dans la branche non : quelle question doit avoir la réponse « non » pour qu'on puisse fermer sans danger ?"] }
      ]
    },
    {
      id: "a4", titre: "Instructions itératives", notion: "boucles",
      cours: `
<p>Une <strong>boucle</strong> (ou instruction itérative) répète une suite d'instructions. Dans l'algorigramme, une flèche <strong>remonte</strong> vers un losange : on refait le tour <strong>tant que</strong> la réponse est oui, et on sort de la boucle dès que c'est non.</p>
<p>Il existe trois sortes de boucles : répéter <strong>un nombre de fois connu</strong> (clignoter 5 fois), répéter <strong>jusqu'à un événement</strong> (tourner jusqu'au capteur de fin de course) et répéter <strong>sans fin</strong> (un système automatisé surveille ses capteurs en permanence).</p>
<p>Pour suivre une boucle à la main, on note la valeur des variables à chaque tour :</p>
<table class="trace"><tr><th>Tour</th><th>n avant le test</th><th>n &gt; 0 ?</th><th>Affiché</th></tr>
<tr><td>1</td><td>3</td><td>oui</td><td>3</td></tr><tr><td>2</td><td>2</td><td>oui</td><td>2</td></tr><tr><td>3</td><td>1</td><td>oui</td><td>1</td></tr><tr><td>–</td><td>0</td><td>non : on sort</td><td></td></tr></table>`,
      schemaCours: [DEBUT, act("n ← 3"), tantque("n > 0 ?", [es("Afficher n"), act("n ← n − 1")]), FIN],
      exercices: [
        { id: "a4e1", titre: "Le clignotant", type: "suivre",
          schema: [DEBUT, act("compteur ← 0"), tantque("compteur < 4 ?", [act("Allumer la LED"), act("Attendre 1 s"), act("Éteindre la LED"), act("compteur ← compteur + 1")]), FIN],
          enonce: "<p>Fais tourner la boucle à la main.</p>", question: "Combien de fois la LED s'allume-t-elle ? (réponds par un nombre)",
          attendu: "4", accepte: ["4 fois", "quatre"], explication: "compteur vaut 0, 1, 2, 3 : quatre tours. Quand il vaut 4, le test est faux.",
          indices: ["Note la valeur de compteur à chaque tour.", "On sort quand compteur < 4 devient faux."] },
        { id: "a4e2", titre: "L'arrosage", type: "suivre",
          schema: [DEBUT, act("humidité ← 20"), tantque("humidité < 50 ?", [act("Arroser 1 min"), act("humidité ← humidité + 10")]), es("Afficher humidité"), FIN],
          enonce: "<p>Chaque minute d'arrosage augmente l'humidité du sol de 10 %.</p>", question: "Quelle valeur est affichée à la fin ?",
          attendu: "50", explication: "humidité vaut 20, 30, 40, puis 50 : 50 < 50 est faux, on sort et on affiche 50.",
          indices: ["Fais un tableau avec la valeur d'humidité à chaque tour.", "Attention : 50 < 50 est faux."] },
        { id: "a4e3", titre: "Compléter : jusqu'à la fin de course", type: "completer",
          schema: [DEBUT, act("Moteur : ouvrir"), tantque("", [act("Attendre 0,1 s")], "A"), act("", "B"), FIN],
          enonce: "<p>Besoin : le portail s'ouvre <strong>jusqu'à ce que</strong> le capteur de fin de course détecte qu'il est complètement ouvert, puis le moteur s'arrête. Complète les cases <strong>A</strong> et <strong>B</strong>.</p>",
          trous: {
            A: { choix: ["fin de course non atteinte ?", "fin de course atteinte ?", "Moteur : ouvrir", "obstacle ?"], bonne: 0 },
            B: { choix: ["Moteur : arrêter", "Moteur : ouvrir", "Moteur : fermer", "Attendre 5 s"], bonne: 0 }
          },
          explication: "On reste dans la boucle tant que le portail n'est pas au bout, puis on arrête le moteur. C'est une boucle « jusqu'à un événement ».",
          indices: ["On répète tant que la réponse est oui : tant que le portail n'est PAS encore au bout.", "Une fois sorti de la boucle, que doit faire le moteur ?"] },
        { id: "a4e4", titre: "Une boucle sans fin", type: "qcm",
          schema: [DEBUT, tantque("toujours", [es("Lire présence"), si("présence ?", [act("Allumer la lampe")], [act("Éteindre la lampe")])])],
          enonce: "<p>Pourquoi cet éclairage automatique utilise-t-il une boucle qui se répète <strong>sans fin</strong> ?</p>",
          choix: ["Pour surveiller le détecteur en permanence et réagir à chaque passage", "Pour allumer la lampe une seule fois", "Pour compter les personnes", "Parce que la lampe doit clignoter"], bonne: 0,
          explication: "Un système automatisé fonctionne en permanence : la boucle relit le capteur sans arrêt, ce qui permet de réagir à chaque passage.",
          indices: ["Sans la boucle, le capteur ne serait lu qu'une seule fois."] }
      ]
    },
    {
      id: "a5", titre: "Événements et données", notion: "événements, listes",
      cours: `
<p>Un <strong>événement</strong> est un phénomène qui déclenche une action dans un programme. Il permet à l'objet de réagir à son environnement et à l'utilisateur. On en distingue trois sortes :</p>
<table class="ops">
<tr><td><strong>Physique</strong></td><td>une action de l'utilisateur sur l'objet : appui sur un bouton, sur une télécommande.</td></tr>
<tr><td><strong>Temporel</strong></td><td>il se produit au bout d'un certain temps : « 5 s après l'allumage ».</td></tr>
<tr><td><strong>Logique</strong></td><td>il se produit quand une condition devient vraie : la distance devient inférieure à 10 cm.</td></tr>
</table>
<p>Un objet peut aussi <strong>enregistrer des données</strong>. Une <strong>liste</strong> range plusieurs valeurs dans l'ordre, sous un seul nom. Exemple : une station météo range ses relevés de température dans la liste <code>releves</code> = [18 ; 21 ; 25 ; 19]. L'élément n° 1 est 18, l'élément n° 3 est 25, la longueur de la liste est 4.</p>`,
      exercices: [
        { id: "a5e1", titre: "Événement physique", type: "qcm",
          enonce: "<p>« Quand on <strong>appuie sur le bouton</strong> de la sonnette, le carillon sonne. » De quelle sorte d'événement s'agit-il ?</p>",
          choix: ["Un événement physique", "Un événement temporel", "Un événement logique", "Ce n'est pas un événement"], bonne: 0,
          explication: "L'appui sur un bouton est une action de l'utilisateur sur l'objet : c'est un événement physique.",
          indices: ["Qui déclenche l'action : l'utilisateur, le temps qui passe, ou une condition ?"] },
        { id: "a5e2", titre: "Événement temporel ou logique ?", type: "qcm",
          enonce: "<p>« Le robot s'arrête <strong>quand la distance mesurée devient inférieure à 10 cm</strong>. » De quelle sorte d'événement s'agit-il ?</p>",
          choix: ["Un événement logique", "Un événement physique", "Un événement temporel", "Ce n'est pas un événement"], bonne: 0,
          explication: "L'action se déclenche quand une condition (distance < 10) devient vraie : c'est un événement logique.",
          indices: ["Ici, c'est une condition sur une mesure qui déclenche l'action."] },
        { id: "a5e3", titre: "Lire une liste", type: "suivre",
          enonce: "<p>Une station météo a rangé ses relevés de température (en °C) dans la liste <code>releves</code> = [18 ; 21 ; 25 ; 19 ; 16].</p>",
          question: "Quelle est la valeur de l'élément n° 3 de la liste ?", attendu: "25", accepte: ["25 °C", "25°C"],
          explication: "On compte à partir de 1 : élément 1 = 18, élément 2 = 21, élément 3 = 25.",
          indices: ["L'élément n° 1 est le premier de la liste."] },
        { id: "a5e4", titre: "Parcourir une liste", type: "suivre",
          schema: [DEBUT, act("i ← 1"), act("total ← 0"), tantque("i ≤ longueur de releves ?", [act("total ← total + élément i de releves"), act("i ← i + 1")]), es("Afficher total"), FIN],
          enonce: "<p>La liste vaut <code>releves</code> = [4 ; 6 ; 5]. Cet algorigramme parcourt la liste élément par élément.</p>",
          question: "Quelle valeur est affichée ?", attendu: "15",
          explication: "total vaut 4, puis 4 + 6 = 10, puis 10 + 5 = 15. Quand i vaut 4, i ≤ 3 est faux : on sort.",
          indices: ["La longueur de la liste est 3 : on fait 3 tours.", "À chaque tour, on ajoute l'élément suivant à total."] }
      ]
    }
  ];
})();
