/* Dessin automatique d'algorigrammes en SVG.
 * Schema.dessiner(briques, { remplis }) renvoie le code SVG.
 * remplis : { A: "texte choisi" } pour afficher le contenu choisi dans une case à compléter. */
(function (global) {
  const GAP = 26, CHAR = 7.4;
  const esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const largeurTexte = t => String(t).length * CHAR;

  function libelle(it, opts) {
    if (!it.trou) return it.txt || (it.t === "debut" ? "Début" : it.t === "fin" ? "Fin" : "");
    const r = opts.remplis && opts.remplis[it.trou];
    return r ? r : `Case ${it.trou} : ?`;
  }

  function noeud(it, opts) {
    const txt = libelle(it, opts), tw = largeurTexte(txt);
    let w, h;
    if (it.t === "debut" || it.t === "fin") { w = Math.max(90, tw + 36); h = 34; }

    else { w = Math.max(110, tw + 28); h = 38; }
    // Norme ISO 5807 : entrées / sorties (Lire, Afficher) dans un parallélogramme.
    if (it.t === "es") w += 24;
    const classe = (it.trou ? "sch-trou " : "") + "sch-" + it.t;
    return {
      L: w / 2, R: w / 2, H: h,
      dessin(x, y) {
        let forme;
        if (it.t === "debut" || it.t === "fin") forme = `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" class="${classe}"/>`;
        else if (it.t === "es") { const d = 12; forme = `<polygon points="${x - w / 2 + d},${y} ${x + w / 2},${y} ${x + w / 2 - d},${y + h} ${x - w / 2},${y + h}" class="${classe}"/>`; }
        else forme = `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="4" class="${classe}"/>`;
        return forme + `<text x="${x}" y="${y + h / 2}" class="sch-texte${it.trou ? " sch-texte-trou" : ""}">${esc(txt)}</text>`;
      }
    };
  }

  function losange(it, opts) {
    const txt = libelle(it, opts), tw = largeurTexte(txt);
    const w = Math.max(130, tw + 76), h = 64;
    const classe = (it.trou ? "sch-trou " : "") + "sch-si";
    return {
      w, h,
      dessin(x, y) {
        return `<polygon points="${x},${y} ${x + w / 2},${y + h / 2} ${x},${y + h} ${x - w / 2},${y + h / 2}" class="${classe}"/>` +
          `<text x="${x}" y="${y + h / 2}" class="sch-texte${it.trou ? " sch-texte-trou" : ""}">${esc(txt)}</text>`;
      }
    };
  }

  const fleche = (pts) => `<polyline points="${pts.map(p => p.join(",")).join(" ")}" class="sch-fleche" marker-end="url(#sch-pointe)"/>`;
  const trait = (pts) => `<polyline points="${pts.map(p => p.join(",")).join(" ")}" class="sch-trait"/>`;
  const etiquette = (x, y, t, ancre) => `<text x="${x}" y="${y}" class="sch-etiquette" text-anchor="${ancre || "middle"}">${t}</text>`;

  function sequence(items, opts) {
    const blocs = items.map(it => bloc(it, opts));
    if (!blocs.length) return { L: 0, R: 0, H: 0, vide: true, dessin: () => "" };
    return {
      L: Math.max(...blocs.map(b => b.L)), R: Math.max(...blocs.map(b => b.R)),
      H: blocs.reduce((a, b) => a + b.H, 0) + GAP * (blocs.length - 1),
      dessin(x, y) {
        let s = "", cy = y;
        blocs.forEach((b, i) => {
          if (i > 0) { s += fleche([[x, cy], [x, cy + GAP]]); cy += GAP; }
          s += b.dessin(x, cy);
          cy += b.H;
        });
        return s;
      }
    };
  }

  function blocSi(it, opts) {
    const d = losange(it, opts);
    const oui = sequence(it.oui || [], opts), non = sequence(it.non || [], opts);
    const xl = Math.min(-(oui.R + 22), -d.w / 2);
    const xr = Math.max(non.L + 22, d.w / 2);
    const corpsH = Math.max(oui.H, non.H);
    const H = d.h + 24 + corpsH + 20;
    return {
      L: Math.max(d.w / 2, -xl + oui.L), R: Math.max(d.w / 2, xr + non.R) + 4, H,
      dessin(x, y) {
        const ym = y + d.h / 2, yb = y + d.h + 24, yfin = y + H;
        let s = d.dessin(x, y);
        // branche oui (gauche)
        s += etiquette(x - d.w / 2 - 6, ym - 6, "oui", "end");
        if (oui.vide) s += trait([[x - d.w / 2, ym], [x + xl, ym], [x + xl, yfin]]);
        else { s += fleche([[x - d.w / 2, ym], [x + xl, ym], [x + xl, yb]]); s += oui.dessin(x + xl, yb); s += trait([[x + xl, yb + oui.H], [x + xl, yfin]]); }
        // branche non (droite)
        s += etiquette(x + d.w / 2 + 6, ym - 6, "non", "start");
        if (non.vide) s += trait([[x + d.w / 2, ym], [x + xr, ym], [x + xr, yfin]]);
        else { s += fleche([[x + d.w / 2, ym], [x + xr, ym], [x + xr, yb]]); s += non.dessin(x + xr, yb); s += trait([[x + xr, yb + non.H], [x + xr, yfin]]); }
        s += trait([[x + xl, yfin], [x + xr, yfin]]);
        return s;
      }
    };
  }

  function blocTantQue(it, opts) {
    const d = losange(it, opts);
    const corps = sequence(it.corps || [], opts);
    const entree = 16;
    const xg = -(Math.max(corps.L, d.w / 2) + 26), xd = Math.max(corps.R, d.w / 2) + 26;
    const yCorps = entree + d.h + 24;
    const H = yCorps + corps.H + 18 + 18;
    return {
      L: -xg + 4, R: xd + 4, H,
      dessin(x, y) {
        const yd = y + entree, ym = yd + d.h / 2, yc = y + yCorps, yRetour = yc + corps.H + 18, yfin = y + H;
        let s = trait([[x, y], [x, yd - 1]]);
        s += `<polygon points="${x - 5},${yd - 9} ${x + 5},${yd - 9} ${x},${yd - 1}" class="sch-pointe"/>`;
        s += d.dessin(x, yd);
        s += fleche([[x, yd + d.h], [x, yc]]);
        s += etiquette(x + 8, yd + d.h + 15, "oui", "start");
        s += corps.dessin(x, yc);
        // retour vers le test
        s += fleche([[x, yc + corps.H], [x, yRetour], [x + xg, yRetour], [x + xg, y + 7], [x - 6, y + 7]]);
        // sortie non
        s += etiquette(x + d.w / 2 + 6, ym - 6, "non", "start");
        s += trait([[x + d.w / 2, ym], [x + xd, ym], [x + xd, yfin], [x, yfin]]);
        return s;
      }
    };
  }

  function bloc(it, opts) {
    if (it.t === "si") return blocSi(it, opts);
    if (it.t === "tantque") return blocTantQue(it, opts);
    return noeud(it, opts);
  }

  function dessiner(items, opts) {
    opts = opts || {};
    const seq = sequence(items, opts);
    const marge = 18;
    const larg = Math.ceil(seq.L + seq.R + 2 * marge), haut = Math.ceil(seq.H + 2 * marge);
    const x = marge + seq.L;
    return `<svg class="schema" viewBox="0 0 ${larg} ${haut}" width="${larg}" height="${haut}" role="img" aria-label="Algorigramme">` +
      `<defs><marker id="sch-pointe" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="sch-pointe"/></marker></defs>` +
      seq.dessin(x, marge) + `</svg>`;
  }

  /* Petites icônes de forme pour le cours */
  global.Schema = { dessiner };
})(typeof window !== "undefined" ? window : globalThis);
