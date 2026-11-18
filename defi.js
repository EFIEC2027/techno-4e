/*
 * Défi des algorithmes — technologie 4e — PAS NOTÉ.
 * 65 exercices sur les 5 notions du parcours « Algorithmes » (identifiants « d »).
 * Règle : en binôme, réussir le plus d'exercices possible en 55 minutes (chronomètre affiché sur la page).
 * Ne changez pas l'id d'un exercice déjà utilisé.
 */
window.PARCOURS_DEFI_ALGO = [
 {
  "id": "d1",
  "titre": "La chaîne d'information",
  "notion": "acquérir, traiter, communiquer",
  "rappel": "a1",
  "cours": "<p>Un objet automatique <strong>acquiert</strong> une information (capteur), la <strong>traite</strong> (programme) et <strong>communique</strong> un ordre à un actionneur.</p>",
  "exercices": [
   {
    "titre": "Capteur ou actionneur ?",
    "type": "qcm",
    "enonce": "<p>Dans un portail automatique, <strong>la télécommande</strong> est…</p>",
    "choix": [
     "un capteur",
     "un actionneur",
     "le programme",
     "une énergie"
    ],
    "bonne": 0,
    "explication": "La télécommande envoie une information (ouvrir) : elle sert à acquérir.",
    "indices": [
     "Est-ce qu'il mesure (capteur) ou est-ce qu'il agit (actionneur) ?"
    ],
    "id": "d1e1"
   },
   {
    "titre": "Capteur ou actionneur ?",
    "type": "qcm",
    "enonce": "<p>Dans un portail automatique, <strong>le moteur</strong> est…</p>",
    "choix": [
     "un actionneur",
     "un capteur",
     "le programme",
     "une information"
    ],
    "bonne": 0,
    "explication": "Le moteur agit : il fait bouger le portail.",
    "indices": [
     "Est-ce qu'il mesure (capteur) ou est-ce qu'il agit (actionneur) ?"
    ],
    "id": "d1e2"
   },
   {
    "titre": "Capteur ou actionneur ?",
    "type": "qcm",
    "enonce": "<p>Dans un aspirateur robot, <strong>le capteur de choc</strong> est…</p>",
    "choix": [
     "un capteur",
     "un actionneur",
     "la batterie",
     "le programme"
    ],
    "bonne": 0,
    "explication": "Il détecte qu'on touche un obstacle : c'est un capteur.",
    "indices": [
     "Est-ce qu'il mesure (capteur) ou est-ce qu'il agit (actionneur) ?"
    ],
    "id": "d1e3"
   },
   {
    "titre": "Capteur ou actionneur ?",
    "type": "qcm",
    "enonce": "<p>Dans un aspirateur robot, <strong>les roues motorisées</strong> est…</p>",
    "choix": [
     "un actionneur",
     "un capteur",
     "le programme",
     "une information"
    ],
    "bonne": 0,
    "explication": "Les roues font avancer le robot : elles agissent.",
    "indices": [
     "Est-ce qu'il mesure (capteur) ou est-ce qu'il agit (actionneur) ?"
    ],
    "id": "d1e4"
   },
   {
    "titre": "Capteur ou actionneur ?",
    "type": "qcm",
    "enonce": "<p>Dans un feu tricolore, <strong>les lampes</strong> est…</p>",
    "choix": [
     "un actionneur",
     "un capteur",
     "le programme",
     "une information"
    ],
    "bonne": 0,
    "explication": "Les lampes agissent : elles éclairent.",
    "indices": [
     "Est-ce qu'il mesure (capteur) ou est-ce qu'il agit (actionneur) ?"
    ],
    "id": "d1e5"
   },
   {
    "titre": "Capteur ou actionneur ?",
    "type": "qcm",
    "enonce": "<p>Dans une serre connectée, <strong>le thermomètre</strong> est…</p>",
    "choix": [
     "un capteur",
     "un actionneur",
     "le programme",
     "une énergie"
    ],
    "bonne": 0,
    "explication": "Le thermomètre mesure la température : il acquiert une information.",
    "indices": [
     "Est-ce qu'il mesure (capteur) ou est-ce qu'il agit (actionneur) ?"
    ],
    "id": "d1e6"
   },
   {
    "titre": "Quelle fonction ?",
    "type": "qcm",
    "enonce": "<p>Le détecteur de présence repère quelqu'un dans le couloir. Quelle fonction de la chaîne d'information est-ce ?</p>",
    "choix": [
     "Acquérir",
     "Traiter",
     "Communiquer",
     "Agir"
    ],
    "bonne": 0,
    "explication": "Prendre une information sur le monde réel : acquérir.",
    "indices": [
     "Acquérir = capteur ; Traiter = programme ; Communiquer = ordre vers l'actionneur."
    ],
    "id": "d1e7"
   },
   {
    "titre": "Quelle fonction ?",
    "type": "qcm",
    "enonce": "<p>La carte compare la température mesurée avec 19 °C. Quelle fonction de la chaîne d'information est-ce ?</p>",
    "choix": [
     "Traiter",
     "Acquérir",
     "Communiquer",
     "Agir"
    ],
    "bonne": 0,
    "explication": "Comparer, calculer, décider : traiter.",
    "indices": [
     "Acquérir = capteur ; Traiter = programme ; Communiquer = ordre vers l'actionneur."
    ],
    "id": "d1e8"
   },
   {
    "titre": "Quelle fonction ?",
    "type": "qcm",
    "enonce": "<p>La carte envoie l'ordre « allume-toi » à la lampe. Quelle fonction de la chaîne d'information est-ce ?</p>",
    "choix": [
     "Communiquer",
     "Acquérir",
     "Traiter",
     "Agir"
    ],
    "bonne": 0,
    "explication": "Transmettre un ordre vers l'actionneur : communiquer.",
    "indices": [
     "Acquérir = capteur ; Traiter = programme ; Communiquer = ordre vers l'actionneur."
    ],
    "id": "d1e9"
   },
   {
    "titre": "Quelle fonction ?",
    "type": "qcm",
    "enonce": "<p>Le programme décide d'ouvrir la barrière car le ticket est valide. Quelle fonction de la chaîne d'information est-ce ?</p>",
    "choix": [
     "Traiter",
     "Acquérir",
     "Communiquer",
     "Agir"
    ],
    "bonne": 0,
    "explication": "Décider à partir d'une information : traiter.",
    "indices": [
     "Acquérir = capteur ; Traiter = programme ; Communiquer = ordre vers l'actionneur."
    ],
    "id": "d1e10"
   },
   {
    "titre": "Quelle fonction ?",
    "type": "qcm",
    "enonce": "<p>Le lecteur lit le code-barres du ticket. Quelle fonction de la chaîne d'information est-ce ?</p>",
    "choix": [
     "Acquérir",
     "Traiter",
     "Communiquer",
     "Agir"
    ],
    "bonne": 0,
    "explication": "Lire une information : acquérir.",
    "indices": [
     "Acquérir = capteur ; Traiter = programme ; Communiquer = ordre vers l'actionneur."
    ],
    "id": "d1e11"
   },
   {
    "titre": "Quelle fonction ?",
    "type": "qcm",
    "enonce": "<p>La carte transmet l'ordre « sonne » à la sirène. Quelle fonction de la chaîne d'information est-ce ?</p>",
    "choix": [
     "Communiquer",
     "Acquérir",
     "Traiter",
     "Agir"
    ],
    "bonne": 0,
    "explication": "Envoyer l'ordre à l'actionneur : communiquer.",
    "indices": [
     "Acquérir = capteur ; Traiter = programme ; Communiquer = ordre vers l'actionneur."
    ],
    "id": "d1e12"
   }
  ]
 },
 {
  "id": "d2",
  "titre": "Algorithme et algorigramme",
  "notion": "séquence d'instructions",
  "rappel": "a2",
  "cours": "<p>Ovale = début / fin ; rectangle = action ; parallélogramme = entrée / sortie (lire un capteur, afficher) ; losange = test. On suit les flèches de haut en bas.</p>",
  "exercices": [
   {
    "titre": "Quel symbole ?",
    "type": "qcm",
    "enonce": "<p>Dans un algorigramme, <code>Lire luminosité</code> se dessine dans…</p>",
    "choix": [
     "un parallélogramme",
     "un rectangle",
     "un losange",
     "un ovale"
    ],
    "bonne": 0,
    "explication": "Lire une valeur (entrée) : parallélogramme.",
    "indices": [
     "Ovale = début / fin, rectangle = action, parallélogramme = entrée / sortie, losange = test."
    ],
    "id": "d2e1"
   },
   {
    "titre": "Quel symbole ?",
    "type": "qcm",
    "enonce": "<p>Dans un algorigramme, <code>Afficher la distance</code> se dessine dans…</p>",
    "choix": [
     "un parallélogramme",
     "un rectangle",
     "un losange",
     "un ovale"
    ],
    "bonne": 0,
    "explication": "Afficher (sortie) : parallélogramme.",
    "indices": [
     "Ovale = début / fin, rectangle = action, parallélogramme = entrée / sortie, losange = test."
    ],
    "id": "d2e2"
   },
   {
    "titre": "Quel symbole ?",
    "type": "qcm",
    "enonce": "<p>Dans un algorigramme, <code>compteur ← compteur + 1</code> se dessine dans…</p>",
    "choix": [
     "un rectangle",
     "un parallélogramme",
     "un losange",
     "un ovale"
    ],
    "bonne": 0,
    "explication": "Un calcul (action) : rectangle.",
    "indices": [
     "Ovale = début / fin, rectangle = action, parallélogramme = entrée / sortie, losange = test."
    ],
    "id": "d2e3"
   },
   {
    "titre": "Quel symbole ?",
    "type": "qcm",
    "enonce": "<p>Dans un algorigramme, <code>porte ouverte ?</code> se dessine dans…</p>",
    "choix": [
     "un losange",
     "un parallélogramme",
     "un rectangle",
     "un ovale"
    ],
    "bonne": 0,
    "explication": "Une question oui / non : losange.",
    "indices": [
     "Ovale = début / fin, rectangle = action, parallélogramme = entrée / sortie, losange = test."
    ],
    "id": "d2e4"
   },
   {
    "titre": "À la main 1",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "a ← 6"
     },
     {
      "t": "action",
      "txt": "a ← a + 9"
     },
     {
      "t": "action",
      "txt": "a ← a − 5"
     },
     {
      "t": "es",
      "txt": "Afficher a"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais tourner l'algorigramme à la main.</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "10",
    "accepte": [],
    "explication": "a vaut 6, puis 15, puis 10.",
    "indices": [
     "Note la valeur après chaque case."
    ],
    "id": "d2e5"
   },
   {
    "titre": "À la main 2",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "b ← 4"
     },
     {
      "t": "action",
      "txt": "b ← b × 5"
     },
     {
      "t": "action",
      "txt": "b ← b + 1"
     },
     {
      "t": "es",
      "txt": "Afficher b"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais tourner l'algorigramme à la main.</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "21",
    "accepte": [],
    "explication": "b vaut 4, puis 20, puis 21.",
    "indices": [
     "Note la valeur après chaque case."
    ],
    "id": "d2e6"
   },
   {
    "titre": "À la main 3",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "c ← 40"
     },
     {
      "t": "action",
      "txt": "c ← c ÷ 4"
     },
     {
      "t": "action",
      "txt": "c ← c × 3"
     },
     {
      "t": "es",
      "txt": "Afficher c"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais tourner l'algorigramme à la main.</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "30",
    "accepte": [],
    "explication": "c vaut 40, puis 10, puis 30.",
    "indices": [
     "Note la valeur après chaque case."
    ],
    "id": "d2e7"
   },
   {
    "titre": "À la main 4",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "d ← 2"
     },
     {
      "t": "action",
      "txt": "d ← d × 2"
     },
     {
      "t": "action",
      "txt": "d ← d × 2"
     },
     {
      "t": "action",
      "txt": "d ← d + 2"
     },
     {
      "t": "es",
      "txt": "Afficher d"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais tourner l'algorigramme à la main.</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "10",
    "accepte": [],
    "explication": "d vaut 2, puis 4, puis 8, puis 10.",
    "indices": [
     "Note la valeur après chaque case."
    ],
    "id": "d2e8"
   },
   {
    "titre": "À la main 5",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "e ← 100"
     },
     {
      "t": "action",
      "txt": "e ← e − 25"
     },
     {
      "t": "action",
      "txt": "e ← e ÷ 5"
     },
     {
      "t": "es",
      "txt": "Afficher e"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais tourner l'algorigramme à la main.</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "15",
    "accepte": [],
    "explication": "e vaut 100, puis 75, puis 15.",
    "indices": [
     "Note la valeur après chaque case."
    ],
    "id": "d2e9"
   },
   {
    "titre": "Avec une entrée 1",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire n"
     },
     {
      "t": "action",
      "txt": "n ← n × 5"
     },
     {
      "t": "es",
      "txt": "Afficher n"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>L'utilisateur tape <strong>6</strong>.</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "30",
    "accepte": [],
    "explication": "6 × 5 = 30.",
    "indices": [
     "Remplace la variable par la valeur tapée."
    ],
    "id": "d2e10"
   },
   {
    "titre": "Avec une entrée 2",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire t"
     },
     {
      "t": "action",
      "txt": "t ← t + 15"
     },
     {
      "t": "es",
      "txt": "Afficher t"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>L'utilisateur tape <strong>20</strong>.</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "35",
    "accepte": [],
    "explication": "20 + 15 = 35.",
    "indices": [
     "Remplace la variable par la valeur tapée."
    ],
    "id": "d2e11"
   },
   {
    "titre": "Compléter : l'ordre",
    "type": "completer",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "",
      "trou": "A"
     },
     {
      "t": "action",
      "txt": "double ← n × 2"
     },
     {
      "t": "es",
      "txt": "",
      "trou": "B"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>L'algorigramme doit lire un nombre et afficher son double. Complète <strong>A</strong> et <strong>B</strong>.</p>",
    "trous": {
     "A": {
      "choix": [
       "Lire n",
       "Afficher double",
       "double ← n × 2"
      ],
      "bonne": 0
     },
     "B": {
      "choix": [
       "Afficher double",
       "Lire n",
       "Afficher n"
      ],
      "bonne": 0
     }
    },
    "explication": "On lit d'abord, on calcule, puis on affiche le résultat.",
    "indices": [
     "Que faut-il faire avant de calculer ?"
    ],
    "id": "d2e12"
   },
   {
    "titre": "Compléter : la variable",
    "type": "completer",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "points ← 0"
     },
     {
      "t": "action",
      "txt": "",
      "trou": "A"
     },
     {
      "t": "es",
      "txt": "Afficher points"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>L'algorigramme doit afficher <strong>10</strong> : on ajoute 10 points. Que faut-il écrire en <strong>A</strong> ?</p>",
    "trous": {
     "A": {
      "choix": [
       "points ← points + 10",
       "points ← 0",
       "Afficher 10",
       "points = 10 ?"
      ],
      "bonne": 0
     }
    },
    "explication": "points ← points + 10 : la variable prend sa valeur actuelle (0) + 10.",
    "indices": [
     "La flèche ← change la valeur de la variable."
    ],
    "id": "d2e13"
   }
  ]
 },
 {
  "id": "d3",
  "titre": "Instructions conditionnelles",
  "notion": "si… alors… sinon",
  "rappel": "a3",
  "cours": "<p>Au losange, on répond à la question : oui → une branche, non → l'autre. Attention : 20 &lt; 20 est faux.</p>",
  "exercices": [
   {
    "titre": "Quelle branche ? 1",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire température"
     },
     {
      "t": "si",
      "txt": "température < 18 ?",
      "oui": [
       {
        "t": "action",
        "txt": "Allumer le chauffage"
       }
      ],
      "non": [
       {
        "t": "action",
        "txt": "Éteindre le chauffage"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Le capteur mesure <strong>18 °C</strong>.</p>",
    "question": "Que fait le système ? (recopie l'action)",
    "attendu": "Éteindre le chauffage",
    "accepte": [
     "éteindre le chauffage"
    ],
    "explication": "18 < 18 est faux : branche non.",
    "indices": [
     "< et > : strictement. ≤ et ≥ : « ou égal »."
    ],
    "id": "d3e1"
   },
   {
    "titre": "Quelle branche ? 2",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire luminosité"
     },
     {
      "t": "si",
      "txt": "luminosité < 25 ?",
      "oui": [
       {
        "t": "action",
        "txt": "Allumer la lampe"
       }
      ],
      "non": [
       {
        "t": "action",
        "txt": "Éteindre la lampe"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Le capteur mesure <strong>24 %</strong>.</p>",
    "question": "Que fait le système ? (recopie l'action)",
    "attendu": "Allumer la lampe",
    "accepte": [
     "allumer la lampe"
    ],
    "explication": "24 < 25 est vrai : branche oui.",
    "indices": [
     "< et > : strictement. ≤ et ≥ : « ou égal »."
    ],
    "id": "d3e2"
   },
   {
    "titre": "Quelle branche ? 3",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire distance"
     },
     {
      "t": "si",
      "txt": "distance ≤ 15 ?",
      "oui": [
       {
        "t": "action",
        "txt": "Arrêter le robot"
       }
      ],
      "non": [
       {
        "t": "action",
        "txt": "Avancer"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Le capteur mesure <strong>15 cm</strong>.</p>",
    "question": "Que fait le système ? (recopie l'action)",
    "attendu": "Arrêter le robot",
    "accepte": [
     "arrêter le robot"
    ],
    "explication": "15 ≤ 15 est vrai : branche oui.",
    "indices": [
     "< et > : strictement. ≤ et ≥ : « ou égal »."
    ],
    "id": "d3e3"
   },
   {
    "titre": "Quelle branche ? 4",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire humidité"
     },
     {
      "t": "si",
      "txt": "humidité < 40 ?",
      "oui": [
       {
        "t": "action",
        "txt": "Arroser"
       }
      ],
      "non": [
       {
        "t": "action",
        "txt": "Ne pas arroser"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Le capteur mesure <strong>40 %</strong>.</p>",
    "question": "Que fait le système ? (recopie l'action)",
    "attendu": "Ne pas arroser",
    "accepte": [
     "ne pas arroser"
    ],
    "explication": "40 < 40 est faux : branche non.",
    "indices": [
     "< et > : strictement. ≤ et ≥ : « ou égal »."
    ],
    "id": "d3e4"
   },
   {
    "titre": "Quelle branche ? 5",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire niveau"
     },
     {
      "t": "si",
      "txt": "niveau ≥ 90 ?",
      "oui": [
       {
        "t": "action",
        "txt": "Fermer la vanne"
       }
      ],
      "non": [
       {
        "t": "action",
        "txt": "Remplir"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Le capteur mesure <strong>90 %</strong>.</p>",
    "question": "Que fait le système ? (recopie l'action)",
    "attendu": "Fermer la vanne",
    "accepte": [
     "fermer la vanne"
    ],
    "explication": "90 ≥ 90 est vrai : branche oui.",
    "indices": [
     "< et > : strictement. ≤ et ≥ : « ou égal »."
    ],
    "id": "d3e5"
   },
   {
    "titre": "Quelle branche ? 6",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire vitesse"
     },
     {
      "t": "si",
      "txt": "vitesse > 30 ?",
      "oui": [
       {
        "t": "action",
        "txt": "Allumer le voyant"
       }
      ],
      "non": [
       {
        "t": "action",
        "txt": "Éteindre le voyant"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Le capteur mesure <strong>31 km/h</strong>.</p>",
    "question": "Que fait le système ? (recopie l'action)",
    "attendu": "Allumer le voyant",
    "accepte": [
     "allumer le voyant"
    ],
    "explication": "31 > 30 est vrai : branche oui.",
    "indices": [
     "< et > : strictement. ≤ et ≥ : « ou égal »."
    ],
    "id": "d3e6"
   },
   {
    "titre": "Deux tests (10 °C)",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire t"
     },
     {
      "t": "si",
      "txt": "t < 10 ?",
      "oui": [
       {
        "t": "es",
        "txt": "Afficher \"froid\""
       }
      ],
      "non": [
       {
        "t": "si",
        "txt": "t < 28 ?",
        "oui": [
         {
          "t": "es",
          "txt": "Afficher \"doux\""
         }
        ],
        "non": [
         {
          "t": "es",
          "txt": "Afficher \"chaud\""
         }
        ]
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Le capteur mesure <strong>10 °C</strong>.</p>",
    "question": "Qu'affiche l'algorigramme ?",
    "attendu": "doux",
    "accepte": [
     "\"doux\""
    ],
    "explication": "On répond au premier losange, puis au second.",
    "indices": [
     "10 < 10 est-il vrai ?"
    ],
    "id": "d3e7"
   },
   {
    "titre": "Deux tests (30 °C)",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire t"
     },
     {
      "t": "si",
      "txt": "t < 10 ?",
      "oui": [
       {
        "t": "es",
        "txt": "Afficher \"froid\""
       }
      ],
      "non": [
       {
        "t": "si",
        "txt": "t < 28 ?",
        "oui": [
         {
          "t": "es",
          "txt": "Afficher \"doux\""
         }
        ],
        "non": [
         {
          "t": "es",
          "txt": "Afficher \"chaud\""
         }
        ]
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Le capteur mesure <strong>30 °C</strong>.</p>",
    "question": "Qu'affiche l'algorigramme ?",
    "attendu": "chaud",
    "accepte": [
     "\"chaud\""
    ],
    "explication": "On répond au premier losange, puis au second.",
    "indices": [
     "10 < 10 est-il vrai ?"
    ],
    "id": "d3e8"
   },
   {
    "titre": "Compléter : le ventilateur",
    "type": "completer",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire température"
     },
     {
      "t": "si",
      "txt": "",
      "oui": [
       {
        "t": "action",
        "txt": "Allumer le ventilateur"
       }
      ],
      "non": [
       {
        "t": "action",
        "txt": "Éteindre le ventilateur"
       }
      ],
      "trou": "A"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Le ventilateur doit tourner quand il fait <strong>plus de 27 °C</strong>. Que faut-il écrire dans le losange <strong>A</strong> ?</p>",
    "trous": {
     "A": {
      "choix": [
       "température > 27 ?",
       "température < 27 ?",
       "ventilateur > 27 ?",
       "température ← 27"
      ],
      "bonne": 0
     }
    },
    "explication": "« Plus de 27 » : température > 27. On teste le capteur, pas l'actionneur.",
    "indices": [
     "Que mesure le capteur ?"
    ],
    "id": "d3e9"
   },
   {
    "titre": "Compléter : le badge",
    "type": "completer",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire badge"
     },
     {
      "t": "si",
      "txt": "",
      "oui": [
       {
        "t": "action",
        "txt": "Ouvrir la porte"
       }
      ],
      "non": [
       {
        "t": "action",
        "txt": "Allumer le voyant rouge"
       }
      ],
      "trou": "A"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>La porte s'ouvre seulement si le badge est <strong>valide</strong>. Que faut-il écrire dans le losange <strong>A</strong> ?</p>",
    "trous": {
     "A": {
      "choix": [
       "badge valide ?",
       "porte ouverte ?",
       "voyant rouge ?",
       "Ouvrir la porte"
      ],
      "bonne": 0
     }
    },
    "explication": "On teste l'information lue par le capteur : le badge.",
    "indices": [
     "Que mesure le capteur ?"
    ],
    "id": "d3e10"
   },
   {
    "titre": "Compléter : l'éclairage",
    "type": "completer",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire luminosité"
     },
     {
      "t": "si",
      "txt": "",
      "oui": [
       {
        "t": "action",
        "txt": "Allumer la lampe"
       }
      ],
      "non": [
       {
        "t": "action",
        "txt": "Éteindre la lampe"
       }
      ],
      "trou": "A"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>La lampe doit s'allumer quand la luminosité est <strong>inférieure à 20 %</strong>. Que faut-il écrire dans le losange <strong>A</strong> ?</p>",
    "trous": {
     "A": {
      "choix": [
       "luminosité < 20 ?",
       "luminosité > 20 ?",
       "lampe < 20 ?",
       "luminosité ← 20"
      ],
      "bonne": 0
     }
    },
    "explication": "Inférieure à 20 : luminosité < 20.",
    "indices": [
     "Que mesure le capteur ?"
    ],
    "id": "d3e11"
   },
   {
    "titre": "Que fait-il ?",
    "type": "qcm",
    "enonce": "<p>Que fait cet algorigramme ?</p>",
    "choix": [
     "Il allume la lampe seulement s'il y a quelqu'un ET qu'il fait sombre",
     "Il allume la lampe dès qu'il y a quelqu'un",
     "Il allume la lampe dès qu'il fait sombre",
     "Il allume toujours la lampe"
    ],
    "bonne": 0,
    "explication": "Il faut passer deux losanges « oui » pour allumer.",
    "indices": [
     "Suis les deux losanges."
    ],
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire présence"
     },
     {
      "t": "es",
      "txt": "Lire luminosité"
     },
     {
      "t": "si",
      "txt": "présence ?",
      "oui": [
       {
        "t": "si",
        "txt": "luminosité < 30 ?",
        "oui": [
         {
          "t": "action",
          "txt": "Allumer la lampe"
         }
        ],
        "non": [
         {
          "t": "action",
          "txt": "Éteindre la lampe"
         }
        ]
       }
      ],
      "non": [
       {
        "t": "action",
        "txt": "Éteindre la lampe"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "id": "d3e12"
   },
   {
    "titre": "Quelle valeur pour sonner ?",
    "type": "qcm",
    "enonce": "<p>Pour laquelle de ces mesures l'alarme sonne-t-elle ?</p>",
    "choix": [
     "12 cm",
     "15 cm",
     "20 cm",
     "40 cm"
    ],
    "bonne": 0,
    "explication": "12 < 15 est vrai ; 15 < 15 est faux.",
    "indices": [
     "15 < 15 est-il vrai ?"
    ],
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire distance"
     },
     {
      "t": "si",
      "txt": "distance < 15 ?",
      "oui": [
       {
        "t": "action",
        "txt": "Faire sonner l'alarme"
       }
      ],
      "non": [
       {
        "t": "action",
        "txt": "Ne rien faire"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "id": "d3e13"
   }
  ]
 },
 {
  "id": "d4",
  "titre": "Instructions itératives",
  "notion": "boucles",
  "rappel": "a4",
  "cours": "<p>Une boucle répète des instructions : un nombre de fois connu, tant qu'une condition est vraie, ou indéfiniment.</p>",
  "exercices": [
   {
    "titre": "Combien de clignotements ? 1",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "n ← 0"
     },
     {
      "t": "tantque",
      "txt": "n < 5 ?",
      "corps": [
       {
        "t": "action",
        "txt": "Allumer la LED"
       },
       {
        "t": "action",
        "txt": "Éteindre la LED"
       },
       {
        "t": "action",
        "txt": "n ← n + 1"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais un tableau de suivi de n.</p>",
    "question": "Combien de fois la LED s'allume-t-elle ? (un nombre)",
    "attendu": "5",
    "accepte": [
     "5 fois"
    ],
    "explication": "Le test est vrai 5 fois avant de devenir faux.",
    "indices": [
     "Note n et la réponse au test à chaque passage."
    ],
    "id": "d4e1"
   },
   {
    "titre": "Combien de clignotements ? 2",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "n ← 1"
     },
     {
      "t": "tantque",
      "txt": "n ≤ 6 ?",
      "corps": [
       {
        "t": "action",
        "txt": "Allumer la LED"
       },
       {
        "t": "action",
        "txt": "Éteindre la LED"
       },
       {
        "t": "action",
        "txt": "n ← n + 1"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais un tableau de suivi de n.</p>",
    "question": "Combien de fois la LED s'allume-t-elle ? (un nombre)",
    "attendu": "6",
    "accepte": [
     "6 fois"
    ],
    "explication": "Le test est vrai 6 fois avant de devenir faux.",
    "indices": [
     "Note n et la réponse au test à chaque passage."
    ],
    "id": "d4e2"
   },
   {
    "titre": "Combien de clignotements ? 3",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "n ← 0"
     },
     {
      "t": "tantque",
      "txt": "n < 10 ?",
      "corps": [
       {
        "t": "action",
        "txt": "Allumer la LED"
       },
       {
        "t": "action",
        "txt": "Éteindre la LED"
       },
       {
        "t": "action",
        "txt": "n ← n + 2"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais un tableau de suivi de n.</p>",
    "question": "Combien de fois la LED s'allume-t-elle ? (un nombre)",
    "attendu": "5",
    "accepte": [
     "5 fois"
    ],
    "explication": "Le test est vrai 5 fois avant de devenir faux.",
    "indices": [
     "Note n et la réponse au test à chaque passage."
    ],
    "id": "d4e3"
   },
   {
    "titre": "Combien de clignotements ? 4",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "n ← 8"
     },
     {
      "t": "tantque",
      "txt": "n > 0 ?",
      "corps": [
       {
        "t": "action",
        "txt": "Allumer la LED"
       },
       {
        "t": "action",
        "txt": "Éteindre la LED"
       },
       {
        "t": "action",
        "txt": "n ← n − 2"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais un tableau de suivi de n.</p>",
    "question": "Combien de fois la LED s'allume-t-elle ? (un nombre)",
    "attendu": "4",
    "accepte": [
     "4 fois"
    ],
    "explication": "Le test est vrai 4 fois avant de devenir faux.",
    "indices": [
     "Note n et la réponse au test à chaque passage."
    ],
    "id": "d4e4"
   },
   {
    "titre": "Valeur finale 1",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "x ← 2"
     },
     {
      "t": "tantque",
      "txt": "x < 50 ?",
      "corps": [
       {
        "t": "action",
        "txt": "x ← x × 2"
       }
      ]
     },
     {
      "t": "es",
      "txt": "Afficher x"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais tourner la boucle à la main.</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "64",
    "accepte": [],
    "explication": "Après 5 tours, x vaut 64 et le test devient faux.",
    "indices": [
     "Écris les valeurs de x."
    ],
    "id": "d4e5"
   },
   {
    "titre": "Valeur finale 2",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "x ← 90"
     },
     {
      "t": "tantque",
      "txt": "x > 20 ?",
      "corps": [
       {
        "t": "action",
        "txt": "x ← x − 25"
       }
      ]
     },
     {
      "t": "es",
      "txt": "Afficher x"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais tourner la boucle à la main.</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "15",
    "accepte": [],
    "explication": "Après 3 tours, x vaut 15 et le test devient faux.",
    "indices": [
     "Écris les valeurs de x."
    ],
    "id": "d4e6"
   },
   {
    "titre": "Valeur finale 3",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "x ← 1"
     },
     {
      "t": "tantque",
      "txt": "x < 30 ?",
      "corps": [
       {
        "t": "action",
        "txt": "x ← x × 3"
       }
      ]
     },
     {
      "t": "es",
      "txt": "Afficher x"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais tourner la boucle à la main.</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "81",
    "accepte": [],
    "explication": "Après 4 tours, x vaut 81 et le test devient faux.",
    "indices": [
     "Écris les valeurs de x."
    ],
    "id": "d4e7"
   },
   {
    "titre": "La somme",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "s ← 0"
     },
     {
      "t": "action",
      "txt": "i ← 1"
     },
     {
      "t": "tantque",
      "txt": "i ≤ 5 ?",
      "corps": [
       {
        "t": "action",
        "txt": "s ← s + i"
       },
       {
        "t": "action",
        "txt": "i ← i + 1"
       }
      ]
     },
     {
      "t": "es",
      "txt": "Afficher s"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Fais un tableau avec s et i.</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "15",
    "accepte": [],
    "explication": "s = 1 + 2 + 3 + 4 + 5 = 15.",
    "indices": [
     "Au 1er tour, s devient 1."
    ],
    "id": "d4e8"
   },
   {
    "titre": "Compléter : 3 bips",
    "type": "completer",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "n ← 0"
     },
     {
      "t": "tantque",
      "txt": "",
      "corps": [
       {
        "t": "action",
        "txt": "Bip"
       },
       {
        "t": "action",
        "txt": "n ← n + 1"
       }
      ],
      "trou": "A"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>Le buzzer doit faire exactement <strong>3 bips</strong>. Que faut-il écrire en <strong>A</strong> ?</p>",
    "trous": {
     "A": {
      "choix": [
       "n < 3 ?",
       "n ≤ 3 ?",
       "n > 3 ?",
       "n = 3 ?"
      ],
      "bonne": 0
     }
    },
    "explication": "n vaut 0, 1, 2 : trois tours avec n < 3. Avec n ≤ 3, il y aurait 4 bips.",
    "indices": [
     "Compte les tours avec chaque proposition."
    ],
    "id": "d4e9"
   },
   {
    "titre": "Compléter : le compte à rebours",
    "type": "completer",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "n ← 5"
     },
     {
      "t": "tantque",
      "txt": "n > 0 ?",
      "corps": [
       {
        "t": "es",
        "txt": "Afficher n"
       },
       {
        "t": "action",
        "txt": "",
        "trou": "A"
       }
      ]
     },
     {
      "t": "es",
      "txt": "Afficher \"Partez !\""
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>L'algorigramme doit afficher 5, 4, 3, 2, 1 puis « Partez ! ». Que faut-il écrire en <strong>A</strong> ?</p>",
    "trous": {
     "A": {
      "choix": [
       "n ← n − 1",
       "n ← n + 1",
       "n ← 0",
       "Afficher n − 1"
      ],
      "bonne": 0
     }
    },
    "explication": "n doit diminuer pour que n > 0 devienne faux.",
    "indices": [
     "Que doit devenir n après chaque affichage ?"
    ],
    "id": "d4e10"
   },
   {
    "titre": "La boucle sans fin",
    "type": "qcm",
    "enonce": "<p>Cette boucle ne s'arrête jamais. Pourquoi ?</p>",
    "choix": [
     "n ne change jamais dans la boucle",
     "La LED est en panne",
     "Le test devrait être n > 5",
     "Il manque la case Fin"
    ],
    "bonne": 0,
    "explication": "Sans n ← n + 1, n reste à 0 et le test reste vrai.",
    "indices": [
     "Que vaut n au 2e tour ?"
    ],
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "n ← 0"
     },
     {
      "t": "tantque",
      "txt": "n < 5 ?",
      "corps": [
       {
        "t": "action",
        "txt": "Allumer la LED"
       },
       {
        "t": "action",
        "txt": "Éteindre la LED"
       }
      ]
     },
     {
      "t": "fin"
     }
    ],
    "id": "d4e11"
   },
   {
    "titre": "Compléter : relire le capteur",
    "type": "completer",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "es",
      "txt": "Lire niveau"
     },
     {
      "t": "tantque",
      "txt": "niveau < 100 ?",
      "corps": [
       {
        "t": "action",
        "txt": "Remplir la cuve"
       },
       {
        "t": "es",
        "txt": "",
        "trou": "A"
       }
      ]
     },
     {
      "t": "action",
      "txt": "Arrêter la pompe"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>La pompe remplit la cuve jusqu'à 100 %. Que faut-il écrire en <strong>A</strong> pour que la boucle s'arrête ?</p>",
    "trous": {
     "A": {
      "choix": [
       "Lire niveau",
       "Afficher niveau",
       "niveau ← 0",
       "Arrêter la pompe"
      ],
      "bonne": 0
     }
    },
    "explication": "Il faut relire le capteur à chaque tour, sinon niveau ne change jamais.",
    "indices": [
     "Comment la carte sait-elle que la cuve se remplit ?"
    ],
    "id": "d4e12"
   }
  ]
 },
 {
  "id": "d5",
  "titre": "Événements et données",
  "notion": "événements, listes",
  "rappel": "a5",
  "cours": "<p>Un <strong>événement</strong> déclenche une action (« quand le bouton est appuyé… »). Une <strong>liste</strong> range plusieurs valeurs, par exemple des relevés.</p>",
  "exercices": [
   {
    "titre": "Quelle sorte d'événement ?",
    "type": "qcm",
    "enonce": "<p>« Quand on <strong>appuie sur la télécommande</strong>, le portail s'ouvre. » De quelle sorte d'événement s'agit-il ?</p>",
    "choix": [
     "Un événement physique",
     "Un événement temporel",
     "Un événement logique",
     "Ce n'est pas un événement"
    ],
    "bonne": 0,
    "explication": "Une action de l'utilisateur sur l'objet (appui, télécommande) : événement physique.",
    "indices": [
     "Qui déclenche : l'utilisateur, le temps, ou une condition ?"
    ],
    "id": "d5e1"
   },
   {
    "titre": "Quelle sorte d'événement ?",
    "type": "qcm",
    "enonce": "<p>« <strong>30 secondes après</strong> l'ouverture, le portail se referme. » De quelle sorte d'événement s'agit-il ?</p>",
    "choix": [
     "Un événement temporel",
     "Un événement physique",
     "Un événement logique",
     "Ce n'est pas un événement"
    ],
    "bonne": 0,
    "explication": "Il se produit au bout d'un certain temps : événement temporel.",
    "indices": [
     "Qui déclenche : l'utilisateur, le temps, ou une condition ?"
    ],
    "id": "d5e2"
   },
   {
    "titre": "Quelle sorte d'événement ?",
    "type": "qcm",
    "enonce": "<p>« Quand la <strong>température devient supérieure à 28 °C</strong>, le ventilateur démarre. » De quelle sorte d'événement s'agit-il ?</p>",
    "choix": [
     "Un événement logique",
     "Un événement physique",
     "Un événement temporel",
     "Ce n'est pas un événement"
    ],
    "bonne": 0,
    "explication": "Il se produit quand une condition devient vraie : événement logique.",
    "indices": [
     "Qui déclenche : l'utilisateur, le temps, ou une condition ?"
    ],
    "id": "d5e3"
   },
   {
    "titre": "Quelle sorte d'événement ?",
    "type": "qcm",
    "enonce": "<p>« La lampe <strong>est allumée</strong>. » De quelle sorte d'événement s'agit-il ?</p>",
    "choix": [
     "Ce n'est pas un événement",
     "Un événement physique",
     "Un événement temporel",
     "Un événement logique"
    ],
    "bonne": 0,
    "explication": "C'est un état qui dure, pas quelque chose qui déclenche une action à un moment précis.",
    "indices": [
     "Qui déclenche : l'utilisateur, le temps, ou une condition ?"
    ],
    "id": "d5e4"
   },
   {
    "titre": "Quelle sorte d'événement ?",
    "type": "qcm",
    "enonce": "<p>« Quand on <strong>appuie sur l'interrupteur</strong> de la hotte, elle démarre. » De quelle sorte d'événement s'agit-il ?</p>",
    "choix": [
     "Un événement physique",
     "Un événement temporel",
     "Un événement logique",
     "Ce n'est pas un événement"
    ],
    "bonne": 0,
    "explication": "Une action de l'utilisateur sur l'objet (appui, télécommande) : événement physique.",
    "indices": [
     "Qui déclenche : l'utilisateur, le temps, ou une condition ?"
    ],
    "id": "d5e5"
   },
   {
    "titre": "Quelle sorte d'événement ?",
    "type": "qcm",
    "enonce": "<p>« Le four <strong>s'éteint au bout de 20 minutes</strong>. » De quelle sorte d'événement s'agit-il ?</p>",
    "choix": [
     "Un événement temporel",
     "Un événement physique",
     "Un événement logique",
     "Ce n'est pas un événement"
    ],
    "bonne": 0,
    "explication": "Il se produit au bout d'un certain temps : événement temporel.",
    "indices": [
     "Qui déclenche : l'utilisateur, le temps, ou une condition ?"
    ],
    "id": "d5e6"
   },
   {
    "titre": "Quelle sorte d'événement ?",
    "type": "qcm",
    "enonce": "<p>« Quand le <strong>niveau d'eau atteint 90 %</strong>, la pompe s'arrête. » De quelle sorte d'événement s'agit-il ?</p>",
    "choix": [
     "Un événement logique",
     "Un événement physique",
     "Un événement temporel",
     "Ce n'est pas un événement"
    ],
    "bonne": 0,
    "explication": "Il se produit quand une condition devient vraie : événement logique.",
    "indices": [
     "Qui déclenche : l'utilisateur, le temps, ou une condition ?"
    ],
    "id": "d5e7"
   },
   {
    "titre": "Qu'est-ce qu'un événement ?",
    "type": "qcm",
    "enonce": "<p>Dans un programme, qu'est-ce qu'un événement ?</p>",
    "choix": [
     "Un phénomène qui déclenche une action",
     "Une valeur rangée dans une liste",
     "Une boucle qui ne s'arrête jamais",
     "Le symbole de fin d'un algorigramme"
    ],
    "bonne": 0,
    "explication": "Un événement déclenche une action : il permet à l'objet de réagir à son environnement et à l'utilisateur.",
    "indices": [
     "« Quand… alors… »"
    ],
    "id": "d5e8"
   },
   {
    "titre": "Lire une liste",
    "type": "suivre",
    "enonce": "<p>Un capteur a rangé ses relevés de température dans la liste <code>releves</code> = [22 ; 19 ; 24 ; 17 ; 20].</p>",
    "question": "Quelle est la valeur de l'élément n° 2 ?",
    "attendu": "19",
    "accepte": [],
    "explication": "On compte à partir de 1 : élément 1 = 22, élément 2 = 19.",
    "indices": [
     "L'élément n° 1 est le premier de la liste."
    ],
    "id": "d5e9"
   },
   {
    "titre": "Lire une liste",
    "type": "suivre",
    "enonce": "<p>Un capteur a rangé ses relevés de température dans la liste <code>releves</code> = [22 ; 19 ; 24 ; 17 ; 20].</p>",
    "question": "Quelle est la longueur de la liste ?",
    "attendu": "5",
    "accepte": [],
    "explication": "La liste contient 5 valeurs.",
    "indices": [
     "L'élément n° 1 est le premier de la liste."
    ],
    "id": "d5e10"
   },
   {
    "titre": "Lire une liste",
    "type": "suivre",
    "enonce": "<p>Un capteur a rangé ses relevés de température dans la liste <code>releves</code> = [22 ; 19 ; 24 ; 17 ; 20].</p>",
    "question": "Quelle est la valeur du dernier élément ?",
    "attendu": "20",
    "accepte": [],
    "explication": "Le dernier élément (n° 5) est 20.",
    "indices": [
     "L'élément n° 1 est le premier de la liste."
    ],
    "id": "d5e11"
   },
   {
    "titre": "Lire une liste",
    "type": "suivre",
    "enonce": "<p>Un capteur a rangé ses relevés de température dans la liste <code>releves</code> = [22 ; 19 ; 24 ; 17 ; 20].</p>",
    "question": "Quel est le numéro de l'élément qui vaut 24 ?",
    "attendu": "3",
    "accepte": [],
    "explication": "22 (n° 1), 19 (n° 2), 24 (n° 3).",
    "indices": [
     "L'élément n° 1 est le premier de la liste."
    ],
    "id": "d5e12"
   },
   {
    "titre": "Ajouter à une liste",
    "type": "suivre",
    "enonce": "<p>La liste <code>notes</code> vaut [12 ; 15]. On ajoute 9 à la fin de la liste, puis 18.</p>",
    "question": "Quelle est maintenant la longueur de la liste ?",
    "attendu": "4",
    "accepte": [],
    "explication": "[12 ; 15 ; 9 ; 18] : 4 éléments.",
    "indices": [
     "Chaque ajout allonge la liste d'un élément."
    ],
    "id": "d5e13"
   },
   {
    "titre": "Parcourir une liste : le total",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "i ← 1"
     },
     {
      "t": "action",
      "txt": "total ← 0"
     },
     {
      "t": "tantque",
      "txt": "i ≤ longueur de releves ?",
      "corps": [
       {
        "t": "action",
        "txt": "total ← total + élément i de releves"
       },
       {
        "t": "action",
        "txt": "i ← i + 1"
       }
      ]
     },
     {
      "t": "es",
      "txt": "Afficher total"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>La liste vaut <code>releves</code> = [3 ; 8 ; 2 ; 7].</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "20",
    "accepte": [],
    "explication": "total = 3 + 8 + 2 + 7 = 20.",
    "indices": [
     "Ajoute les éléments un par un."
    ],
    "id": "d5e14"
   },
   {
    "titre": "Parcourir une liste : compter",
    "type": "suivre",
    "schema": [
     {
      "t": "debut"
     },
     {
      "t": "action",
      "txt": "i ← 1"
     },
     {
      "t": "action",
      "txt": "n ← 0"
     },
     {
      "t": "tantque",
      "txt": "i ≤ longueur de releves ?",
      "corps": [
       {
        "t": "si",
        "txt": "élément i de releves > 20 ?",
        "oui": [
         {
          "t": "action",
          "txt": "n ← n + 1"
         }
        ],
        "non": []
       },
       {
        "t": "action",
        "txt": "i ← i + 1"
       }
      ]
     },
     {
      "t": "es",
      "txt": "Afficher n"
     },
     {
      "t": "fin"
     }
    ],
    "enonce": "<p>La liste vaut <code>releves</code> = [18 ; 23 ; 20 ; 25 ; 21].</p>",
    "question": "Quelle valeur est affichée ?",
    "attendu": "3",
    "accepte": [],
    "explication": "Les valeurs strictement supérieures à 20 sont 23, 25 et 21 : 3 valeurs (20 > 20 est faux).",
    "indices": [
     "20 > 20 est-il vrai ?"
    ],
    "id": "d5e15"
   }
  ]
 }
];
