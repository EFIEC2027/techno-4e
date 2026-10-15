/* Vérification d'un exercice : comparaison des sorties, motifs exigés ou interdits,
 * et traduction des erreurs Python en messages compréhensibles. */
(function (global) {
  function normaliser(texte) {
    const lignes = String(texte).replace(/\r/g, "").split("\n").map(l => l.replace(/\s+$/, ""));
    while (lignes.length && lignes[lignes.length - 1] === "") lignes.pop();
    return lignes.join("\n");
  }

  // Retire les commentaires (# ...) sans toucher aux # placés dans des chaînes.
  function sansCommentaires(code) {
    let res = "", guillemet = null, i = 0;
    while (i < code.length) {
      const c = code[i];
      if (guillemet) {
        res += c;
        if (c === "\\") { res += code[i + 1] || ""; i += 2; continue; }
        if (code.startsWith(guillemet, i)) { res += guillemet.slice(1); i += guillemet.length; guillemet = null; continue; }
        if (c === "\n" && guillemet.length === 1) guillemet = null;
        i++;
      } else if (c === "#") {
        while (i < code.length && code[i] !== "\n") i++;
      } else if (c === '"' || c === "'") {
        guillemet = code.startsWith(c.repeat(3), i) ? c.repeat(3) : c;
        res += guillemet; i += guillemet.length;
      } else { res += c; i++; }
    }
    return res;
  }

  function problemesDeCode(exo, code) {
    const propre = sansCommentaires(code);
    const pbs = [];
    (exo.exige || []).forEach(r => { if (!new RegExp(r.motif).test(propre)) pbs.push(r.message); });
    (exo.interdit || []).forEach(r => { if (new RegExp(r.motif).test(propre)) pbs.push(r.message); });
    return pbs;
  }

  function messageErreur(err) {
    if (!err) return null;
    const ligne = err.ligne ? ` (ligne ${err.ligne})` : "";
    const m = err.message || "";
    let t;
    switch (err.type) {
      case "Expire":
        t = "Ton programme ne s'arrête pas. Vérifie ta boucle while : la condition finit-elle par devenir fausse ?"; break;
      case "SortieTropLongue":
        t = "Ton programme affiche beaucoup trop de lignes. Une boucle tourne-t-elle sans fin ?"; break;
      case "IndentationError":
      case "TabError":
        if (/expected an indented block/.test(m)) t = "Après une ligne qui finit par « : », la ligne suivante doit être décalée de 4 espaces";
        else if (/unexpected indent/.test(m)) t = "Cette ligne est décalée alors qu'elle ne devrait pas l'être";
        else t = "Les décalages (indentation) ne sont pas alignés";
        t += ligne + "."; break;
      case "SyntaxError":
        if (/expected ':'/.test(m)) t = `Il manque les deux-points « : » en fin de ligne${ligne}.`;
        else if (/unterminated string|EOL while scanning/.test(m)) t = `Un texte n'est pas fermé : il manque un guillemet${ligne}.`;
        else if (/was never closed/.test(m)) t = `Une parenthèse ouverte n'est jamais fermée${ligne}.`;
        else if (/unmatched/.test(m)) t = `Il y a une parenthèse fermante en trop${ligne}.`;
        else if (/Maybe you meant '=='/.test(m)) t = `Pour comparer deux valeurs, écris == (deux signes égal)${ligne}.`;
        else if (/Perhaps you forgot a comma/.test(m)) t = `Il manque une virgule entre deux éléments${ligne}.`;
        else t = `Erreur d'écriture${ligne} : vérifie les parenthèses, les guillemets et les deux-points.`;
        break;
      case "NameError": {
        const nom = (m.match(/name '(.+?)' is not defined/) || [])[1];
        if (nom && /^[A-Z]/.test(nom) && ["print", "input", "int", "range", "for", "if", "while", "def", "return"].includes(nom.toLowerCase()))
          t = `« ${nom} » s'écrit en minuscules : ${nom.toLowerCase()}${ligne}.`;
        else t = `« ${nom || "?"} » n'existe pas${ligne}. Faute de frappe, guillemets oubliés, ou variable utilisée avant d'être créée ?`;
        break;
      }
      case "TypeError":
        if (/str.*int|int.*str|concatenate|not supported between instances of 'str'/.test(m))
          t = `Tu mélanges du texte et un nombre${ligne}. As-tu converti input() avec int() ou float() ?`;
        else if (/takes \d+ positional argument|missing \d+ required/.test(m))
          t = `La fonction n'est pas appelée avec le bon nombre de valeurs${ligne}.`;
        else if (/not callable/.test(m)) t = `Tu utilises comme une fonction quelque chose qui n'en est pas une${ligne}.`;
        else t = `Opération impossible entre ces types de valeurs${ligne}.`;
        break;
      case "ValueError": {
        const v = (m.match(/invalid literal for int\(\) with base 10: '(.*)'/) || [])[1];
        if (v !== undefined) t = v.includes(".") ? `int() ne peut pas convertir « ${v} » : pour un nombre à virgule, utilise float()${ligne}.` : `int() ne peut pas convertir « ${v} » en nombre${ligne}.`;
        else t = `Valeur impossible à convertir${ligne}.`;
        break;
      }
      case "ZeroDivisionError": t = `Division par zéro${ligne}.`; break;
      case "EOFError": t = "Ton programme demande plus de valeurs au clavier (input) que prévu. Dans « Entrée clavier », mets une valeur par ligne."; break;
      case "RecursionError": t = "Ta fonction s'appelle elle-même sans fin."; break;
      default: t = `${err.type}${ligne}.`;
    }
    return { texte: t, brut: err.type === "Expire" || err.type === "SortieTropLongue" ? "" : `${err.type}: ${m}` };
  }

  global.VERIF = { normaliser, sansCommentaires, problemesDeCode, messageErreur };
})(typeof window !== "undefined" ? window : globalThis);
