// api/p.js — Vercel Serverless Function (OG card minimizado)
// GET /api/p?n=Nome&fs=27&x=140&y=50&co=2b2b2b&o=65&blur=8
export default function handler(req, res) {
  try {
    const q = req.query;
    const name = String(q.n || '').trim().slice(0, 40).replace(/\s+/g, ' ');
    const enc = encodeURIComponent(name || '');

    const CLOUD = 'dr3r1szcw';
    const PUBLIC_ID = 'v1758136687/copo_qyzeoa.jpg';

    const fs   = Number(q.fs ?? 27)  || 27;
    const x    = Number(q.x  ?? 140) || 140;
    const y    = Number(q.y  ?? 50)  || 50;
    const co   = (String(q.co ?? '2b2b2b').replace(/[^0-9a-f]/gi,'').slice(0,6) || '2b2b2b');
    const o    = Math.max(0, Math.min(100, Number(q.o ?? 65)));
    const blur = Math.max(0, Math.min(50,  Number(q.blur ?? 8)));

    const extras = [`co_rgb:${co}`];
    if (o > 0)    extras.push(`o_${o}`);
    if (blur > 0) extras.push(`e_blur:${blur}`);

    // imagem 1200x627 para evitar cortes no LinkedIn
    const ogImage =
      `https://res.cloudinary.com/${CLOUD}/image/upload/` +
      `l_text:Permanent%20Marker_${fs}:${enc},${extras.join(',')}/` +
      `fl_layer_apply,g_center,x_${x},y_${y}/` +
      `c_pad,w_1200,h_627,b_auto/` +
      `${PUBLIC_ID}`;

    // título e descrição invisíveis (não remove o domínio do cartão)
    const ZWSP = '\\u200B';

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(`<!doctype html><html lang="pt-br"><head>
<meta charset="utf-8">
<title>${ZWSP}</title>
<meta property="og:title" content="${ZWSP}">
<meta property="og:description" content="${ZWSP}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="627">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${ogImage}">
</head><body></body></html>`);
  } catch (e) {
    res.status(500).send('Internal error');
  }
}
