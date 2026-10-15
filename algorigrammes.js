/*
 * Parcours « Algorigrammes » — 5 notions × 4 exercices.
 *
 * Les schémas sont décrits avec ces briques (dessinées automatiquement) :
 *   DEBUT, FIN              ovale de début / fin
 *   act("texte")            rectangle : action ou calcul (affectation avec ←)
 *   Convention de la classe : ovale = début/fin, losange = test, rectangle = tout le reste.
 *   es("texte")             rectangle : entrée (Lire) ou sortie (Afficher)
 *   si("test ?", [oui], [non])        losange avec deux branches
 *   tantque("test ?", [corps])        boucle : on répète le corps tant que le test est vrai
 *   Une brique avec trou: "A" est affichée comme une case à compléter.
 *
 * Types d'exercices :
 *   qcm       : choisir une réponse (choix, bonne = indice de la bonne réponse)
 *   suivre    : faire fonctionner l'algorigramme et donner le résultat (attendu, accepte)
 *   completer : choisir le contenu de chaque case vide (trous: { A: { choix, bonne } })
 *   python    : traduire en Python (possible, mais non utilisé : ce parcours vient avant Python)
 * Ne changez pas l'id d'un exercice déjà utilisé par les élèves.
 */
(function () {
  const DEBUT = { t: "debut" }, FIN = { t: "fin" };
  const act = (txt, trou) => ({ t: "action", txt, trou });
  const es = (txt, trou) => ({ t: "es", txt, trou });
  const si = (txt, oui, non, trou) => ({ t: "si", txt, oui, non, trou });
  const tantque = (txt, corps, trou) => ({ t: "tantque", txt, corps, trou });

  const SYMBOLES = [DEBUT, es("Lire n"), act("n ← n × 2"), si("n > 10 ?", [es("Afficher \"grand\"")], [es("Afficher \"petit\"")]), FIN];

  window.PARCOURS_ALGO = [
    {
      id: "g1", titre: "Lire un algorigramme", notion: "les symboles",
      cours: `
<p>Un <strong>algorigramme</strong> (ou organigramme) représente un algorithme par un dessin. On le lit <strong>de haut en bas, en suivant les flèches</strong>.</p>
<table class="ops">
<tr><td><span class="forme ovale">Début</span></td><td><strong>Ovale</strong> : le début et la fin.</td></tr>
<tr><td><span class="forme rect">n ← n × 2</span></td><td><strong>Rectangle</strong> : une action. Ce peut être un calcul, une entrée (<em>Lire</em> : l'utilisateur tape une valeur, un capteur mesure) ou une sortie (<em>Afficher</em>). La flèche <code>←</code> signifie « prend la valeur » : <code>n ← n × 2</code> veut dire « n prend la valeur n × 2 ».</td></tr>
<tr><td><span class="forme losange">n > 10 ?</span></td><td><strong>Losange</strong> : un test. La réponse est <em>oui</em> ou <em>non</em>, et on suit la flèche correspondante.</td></tr>
</table>`,
      schemaCours: SYMBOLES,
      exercices: [
        { id: "g1e1", titre: "Début et fin", type: "qcm",
          enonce: "<p>Quel symbole marque le <strong>début</strong> et la <strong>fin</strong> d'un algorigramme ?</p>",
          choix: ["L'ovale", "Le rectangle", "Le losange", "Le cercle"], bonne: 0,
          explication: "Un algorigramme commence et se termine toujours par un ovale.",
          indices: ["Regarde le haut et le bas du schéma du cours."] },
        { id: "g1e2", titre: "Le test", type: "qcm",
          enonce: "<p>Dans quel symbole écrit-on un <strong>test</strong>, c'est-à-dire une question à laquelle on répond oui ou non ?</p>",
          choix: ["Le losange", "Le rectangle", "L'ovale", "Le cercle"], bonne: 0,
          explication: "Le losange a deux sorties : une pour oui, une pour non.",
          indices: ["C'est le seul symbole d'où partent deux flèches."] },
        { id: "g1e3", titre: "Afficher, c'est quoi ?", type: "qcm",
          enonce: "<p>Dans quel symbole écrit-on <code>Afficher \"Bonjour\"</code> ?</p>",
          choix: ["Le rectangle (action)", "Le losange (test)", "L'ovale (début / fin)", "Le cercle"], bonne: 0,
          explication: "Afficher est une action : on l'écrit dans un rectangle, comme Lire et les calculs.",
          indices: ["Ce n'est ni un début, ni une fin, ni une question."] },
        { id: "g1e4", titre: "Que fait cet algorigramme ?", type: "qcm",
          schema: [DEBUT, es("Lire prix"), act("total ← prix × 3"), es("Afficher total"), FIN],
          enonce: "<p>Que fait cet algorigramme ?</p>",
          choix: ["Il affiche le prix de 3 articles identiques", "Il affiche le nombre 3", "Il demande 3 prix différents", "Il affiche le prix d'un seul article"], bonne: 0,
          explication: "Il lit un prix, le multiplie par 3 et affiche le total.",
          indices: ["Suis les flèches bloc par bloc : que devient prix ?"] }
      ]
    },
    {
      id: "g2", titre: "Séquence", notion: "variables et calculs",
      cours: `
<p>Une <strong>séquence</strong> est une suite de blocs exécutés <strong>dans l'ordre</strong>, un seul chemin du début à la fin.</p>
<p>Pour savoir ce que fait un algorigramme, on le <strong>fait tourner à la main</strong> : on note la valeur de chaque variable après chaque bloc.</p>
<table class="trace"><tr><th>Bloc</th><th>a</th><th>b</th></tr>
<tr><td>a ← 4</td><td>4</td><td></td></tr>
<tr><td>b ← a + 3</td><td>4</td><td>7</td></tr>
<tr><td>a ← b × 2</td><td>14</td><td>7</td></tr></table>
`,
      exercices: [
        { id: "g2e1", titre: "Faire tourner à la main", type: "suivre",
          schema: [DEBUT, act("a ← 4"), act("b ← a + 3"), act("a ← b × 2"), es("Afficher a"), FIN],
          enonce: "<p>Fais tourner l'algorigramme à la main.</p>", question: "Qu'affiche-t-il ?",
          attendu: "14", explication: "a vaut 4, puis b vaut 7, puis a vaut 7 × 2 = 14.",
          indices: ["Fais un tableau avec une colonne a et une colonne b.", "Attention : à la 3e ligne, a change de valeur."] },
        { id: "g2e2", titre: "Avec une entrée", type: "suivre",
          schema: [DEBUT, es("Lire n"), act("n ← n × 2"), act("n ← n + 1"), es("Afficher n"), FIN],
          enonce: "<p>L'utilisateur tape <strong>5</strong>.</p>", question: "Qu'affiche l'algorigramme ?",
          attendu: "11", explication: "n vaut 5, puis 10, puis 11.",
          indices: ["Au départ, n vaut 5.", "5 × 2 = 10, puis 10 + 1."] },
        { id: "g2e3", titre: "Compléter : minutes en secondes", type: "completer",
          schema: [DEBUT, es("Lire minutes"), act("", "A"), es("Afficher secondes"), FIN],
          enonce: "<p>Cet algorigramme doit convertir une durée en minutes en secondes. Que faut-il écrire dans la case <strong>A</strong> ?</p>",
          trous: { A: { choix: ["secondes ← minutes × 60", "secondes ← minutes + 60", "minutes ← secondes × 60", "Afficher minutes"], bonne: 0 } },
          explication: "Une minute = 60 secondes : secondes prend la valeur minutes × 60.",
          indices: ["La variable affichée à la fin doit avoir été calculée avant.", "Combien de secondes dans une minute ?"] },
        { id: "g2e4", titre: "Compléter : la moyenne", type: "completer",
          schema: [DEBUT, es("Lire note1"), es("Lire note2"), act("", "A"), es("", "B"), FIN],
          enonce: "<p>Cet algorigramme doit calculer puis afficher la moyenne de deux notes. Complète les cases <strong>A</strong> et <strong>B</strong>.</p>",
          trous: {
            A: { choix: ["moyenne ← (note1 + note2) ÷ 2", "moyenne ← note1 + note2", "Afficher moyenne", "Lire moyenne"], bonne: 0 },
            B: { choix: ["Afficher moyenne", "Lire moyenne", "moyenne ← 0", "Afficher note1"], bonne: 0 }
          },
          explication: "On calcule d'abord la moyenne (A), puis on l'affiche (B). Pour la moyenne de deux notes, on les additionne et on divise par 2.",
          indices: ["On ne peut afficher la moyenne qu'après l'avoir calculée.", "La moyenne de deux nombres : on les additionne, puis on divise par 2."] }
      ]
    },
    {
      id: "g3", titre: "Conditions", notion: "si… alors… sinon",
      cours: `
<p>Un <strong>losange</strong> pose une question. Selon la réponse, on suit la branche <strong>oui</strong> ou la branche <strong>non</strong>, puis les deux chemins se rejoignent.</p>
<p>Les signes de comparaison : <code>&lt;</code> plus petit que, <code>&gt;</code> plus grand que, <code>≤</code> plus petit ou égal, <code>≥</code> plus grand ou égal, <code>=</code> égal, <code>≠</code> différent.</p>
<p>Attention : 18 ≥ 18 est <strong>vrai</strong>, mais 18 &gt; 18 est <strong>faux</strong>.</p>`,
      schemaCours: [DEBUT, es("Lire age"), si("age ≥ 18 ?", [es("Afficher \"majeur\"")], [es("Afficher \"mineur\"")]), FIN],
      exercices: [
        { id: "g3e1", titre: "Majeur ou mineur", type: "suivre",
          schema: [DEBUT, es("Lire age"), si("age ≥ 18 ?", [es("Afficher \"majeur\"")], [es("Afficher \"mineur\"")]), FIN],
          enonce: "<p>L'utilisateur tape <strong>16</strong>.</p>", question: "Qu'affiche l'algorigramme ?",
          attendu: "mineur", explication: "16 ≥ 18 est faux : on suit la branche non.",
          indices: ["La réponse au test 16 ≥ 18 est-elle oui ou non ?"] },
        { id: "g3e2", titre: "Le thermostat", type: "suivre",
          schema: [DEBUT, es("Lire temperature"), si("temperature < 19 ?", [es("Afficher \"chauffage allumé\"")], [es("Afficher \"chauffage éteint\"")]), FIN],
          enonce: "<p>Un thermostat connecté suit cet algorigramme. Le capteur mesure <strong>21 °C</strong>.</p>", question: "Qu'affiche le thermostat ?",
          attendu: "chauffage éteint", accepte: ["chauffage eteint", "éteint", "eteint"],
          explication: "21 < 19 est faux : on suit la branche non.",
          indices: ["21 est-il plus petit que 19 ?"] },
        { id: "g3e3", titre: "Compléter : admis ou ajourné", type: "completer",
          schema: [DEBUT, es("Lire note"), si("", [es("", "B")], [es("Afficher \"ajourné\"")], "A"), FIN],
          enonce: "<p>Cet algorigramme doit afficher <code>admis</code> si la note est d'au moins 10, et <code>ajourné</code> sinon. Complète les cases <strong>A</strong> et <strong>B</strong>.</p>",
          trous: {
            A: { choix: ["note ≥ 10 ?", "note < 10 ?", "note = 20 ?", "Lire note"], bonne: 0 },
            B: { choix: ["Afficher \"admis\"", "Afficher \"ajourné\"", "note ← 10", "Afficher note"], bonne: 0 }
          },
          explication: "Le test est « note ≥ 10 ? » ; si oui, on affiche admis.",
          indices: ["La case A est un losange : c'est un test.", "La branche oui correspond au cas où le test est vrai."] },
        { id: "g3e4", titre: "Quelle valeur pour gagner ?", type: "qcm",
          schema: [DEBUT, es("Lire n"), si("n = 7 ?", [es("Afficher \"gagné\"")], [es("Afficher \"perdu\"")]), FIN],
          enonce: "<p>Quel nombre l'utilisateur doit-il taper pour que l'algorigramme affiche <code>gagné</code> ?</p>",
          choix: ["7", "0", "6", "Il ne peut jamais gagner"], bonne: 0,
          explication: "On affiche gagné seulement si la réponse au test n = 7 est oui.",
          indices: ["Pars de « gagné » et remonte la flèche jusqu'au losange."] }
      ]
    },
    {
      id: "g4", titre: "Boucles", notion: "tant que",
      cours: `
<p>Quand une flèche <strong>remonte</strong> vers un losange, c'est une <strong>boucle</strong> : on répète les blocs <strong>tant que</strong> la réponse au test est oui. Dès que c'est non, on sort de la boucle.</p>
<p>Pour suivre une boucle, on note les valeurs à chaque tour :</p>
<table class="trace"><tr><th>Tour</th><th>i avant le test</th><th>i &lt; 3 ?</th></tr>
<tr><td>1</td><td>0</td><td>oui</td></tr><tr><td>2</td><td>1</td><td>oui</td></tr><tr><td>3</td><td>2</td><td>oui</td></tr><tr><td>–</td><td>3</td><td>non : on sort</td></tr></table>
<p>Attention : si rien ne change dans la boucle, le test reste toujours vrai et la boucle ne s'arrête jamais.</p>`,
      schemaCours: [DEBUT, act("i ← 0"), tantque("i < 3 ?", [es("Afficher \"Bip\""), act("i ← i + 1")]), FIN],
      exercices: [
        { id: "g4e1", titre: "Combien de Bip ?", type: "suivre",
          schema: [DEBUT, act("i ← 0"), tantque("i < 3 ?", [es("Afficher \"Bip\""), act("i ← i + 1")]), FIN],
          enonce: "<p>Fais tourner la boucle à la main.</p>", question: "Combien de fois « Bip » est-il affiché ? (réponds par un nombre)",
          attendu: "3", accepte: ["3 fois", "trois"], explication: "i vaut 0, 1, 2 : trois tours. Quand i vaut 3, le test est faux.",
          indices: ["Note la valeur de i à chaque tour.", "On s'arrête quand i < 3 devient faux."] },
        { id: "g4e2", titre: "Valeur finale", type: "suivre",
          schema: [DEBUT, act("n ← 1"), tantque("n < 50 ?", [act("n ← n × 2")]), es("Afficher n"), FIN],
          enonce: "<p>Fais tourner la boucle à la main.</p>", question: "Qu'affiche l'algorigramme ?",
          attendu: "64", explication: "n vaut 1, 2, 4, 8, 16, 32, 64. À 64, le test n < 50 est faux.",
          indices: ["n double à chaque tour.", "Continue tant que n est plus petit que 50."] },
        { id: "g4e3", titre: "Compléter : compte à rebours", type: "completer",
          schema: [DEBUT, act("n ← 5"), tantque("n > 0 ?", [es("Afficher n"), act("", "A")]), es("Afficher \"Décollage !\""), FIN],
          enonce: "<p>Cet algorigramme doit afficher 5, 4, 3, 2, 1 puis <code>Décollage !</code>. Que faut-il écrire dans la case <strong>A</strong> ?</p>",
          trous: { A: { choix: ["n ← n − 1", "n ← n + 1", "n ← 0", "Afficher n"], bonne: 0 } },
          explication: "n doit diminuer de 1 à chaque tour, sinon la boucle ne s'arrête jamais.",
          indices: ["Que doit devenir n après avoir affiché 5 ?", "Si n ne diminue pas, le test n > 0 reste toujours vrai."] },
        { id: "g4e4", titre: "La somme", type: "suivre",
          schema: [DEBUT, act("total ← 0"), act("i ← 1"), tantque("i ≤ 4 ?", [act("total ← total + i"), act("i ← i + 1")]), es("Afficher total"), FIN],
          enonce: "<p>Fais tourner la boucle à la main, en notant total et i à chaque tour.</p>", question: "Qu'affiche l'algorigramme ?",
          attendu: "10", explication: "total vaut 1, puis 3, puis 6, puis 10 (1 + 2 + 3 + 4). Quand i vaut 5, le test i ≤ 4 est faux.",
          indices: ["Fais un tableau avec deux colonnes : total et i.", "Au 1er tour, total ← 0 + 1 = 1 et i devient 2."] }
      ]
    },
    {
      id: "g5", titre: "Objets connectés", notion: "situations concrètes",
      cours: `
<p>Les objets connectés (thermostat, lampe automatique, arrosage, alarme) suivent des algorithmes : ils <strong>lisent des capteurs</strong> (entrées), <strong>testent</strong> les valeurs et <strong>commandent des actionneurs</strong> (sorties).</p>
<p>Un test peut en contenir un autre : on suit d'abord le premier losange, puis le second.</p>`,
      exercices: [
        { id: "g5e1", titre: "La lampe automatique", type: "suivre",
          schema: [DEBUT, es("Lire mouvement"), es("Lire lumiere"),
            si("mouvement = 1 ?", [si("lumiere < 30 ?", [es("Allumer la lampe")], [es("Éteindre la lampe")])], [es("Éteindre la lampe")]), FIN],
          enonce: "<p>Une lampe de jardin suit cet algorigramme. Le capteur de mouvement renvoie <strong>1</strong> (quelqu'un passe) et le capteur de lumière mesure <strong>20</strong>.</p>",
          question: "Que fait la lampe ?",
          attendu: "Allumer la lampe", accepte: ["allumer", "allumée", "allumee", "elle s'allume", "la lampe s'allume", "allume la lampe"],
          explication: "mouvement = 1 : oui. lumiere < 30 : 20 < 30, oui. On allume la lampe.",
          indices: ["Réponds d'abord au premier losange, puis au second."] },
        { id: "g5e2", titre: "L'arrosage automatique", type: "suivre",
          schema: [DEBUT, es("Lire humidite"), tantque("humidite < 40 ?", [es("Arroser 1 minute"), act("humidite ← humidite + 10")]), es("Afficher \"terminé\""), FIN],
          enonce: "<p>Le capteur mesure une humidité de <strong>15</strong> au départ.</p>", question: "Combien de minutes le système arrose-t-il ? (réponds par un nombre)",
          attendu: "3", accepte: ["3 minutes", "trois"], explication: "humidite vaut 15, 25, 35 : trois tours. À 45, le test est faux.",
          indices: ["Note la valeur de humidite à chaque tour."] },
        { id: "g5e3", titre: "Compléter : l'alarme", type: "completer",
          schema: [DEBUT, es("Lire distance"), si("", [es("", "B")], [], "A"), FIN],
          enonce: "<p>Un capteur mesure la distance (en cm) entre la porte et une personne. L'alarme doit se déclencher si quelqu'un est à <strong>moins de 10 cm</strong>. Complète les cases <strong>A</strong> et <strong>B</strong>.</p>",
          trous: {
            A: { choix: ["distance < 10 ?", "distance > 10 ?", "distance ← 10", "Lire distance"], bonne: 0 },
            B: { choix: ["Déclencher l'alarme", "Lire distance", "Éteindre l'alarme", "distance ← 0"], bonne: 0 }
          },
          explication: "On teste si la distance est plus petite que 10 ; si oui, on déclenche l'alarme.",
          indices: ["« À moins de 10 cm » veut dire « distance plus petite que 10 »."] },
        { id: "g5e4", titre: "Compléter : l'arrosage", type: "completer",
          schema: [DEBUT, es("Lire humidite"), tantque("", [es("Arroser 1 minute"), act("", "B")], "A"), es("Afficher \"terminé\""), FIN],
          enonce: "<p>Chaque minute d'arrosage augmente l'humidité de 10. L'arrosage doit continuer <strong>tant que l'humidité est inférieure à 40</strong>. Complète les cases <strong>A</strong> et <strong>B</strong>.</p>",
          trous: {
            A: { choix: ["humidite < 40 ?", "humidite > 40 ?", "humidite ← 40", "Arroser 1 minute"], bonne: 0 },
            B: { choix: ["humidite ← humidite + 10", "humidite ← humidite − 10", "humidite ← 40", "Afficher \"terminé\""], bonne: 0 }
          },
          explication: "On arrose tant que humidite < 40, et chaque minute ajoute 10 à l'humidité.",
          indices: ["La case A est le test de la boucle.", "Après chaque minute d'arrosage, que devient l'humidité ?"] }
      ]
    }
  ];
})();
