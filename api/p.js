// api/p.js  (Vercel Serverless Function)
// GET /api/p?n=Nome&fs=27&x=140&y=50&co=2b2b2b&o=65&blur=8
export default function handler(req, res) {
  const q = req.query;
  const name = String(q.n || '').trim().slice(0, 40).replace(/\s+/g, ' ');
  const encName = encodeURIComponent(name || '');

  const CLOUD = 'dr3r1szcw';
  const PUBLIC_ID = 'v1758136687/copo_qyzeoa.jpg';

  const fs   = Number(q.fs ?? 27) || 27;
  const x    = Number(q.x  ?? 140) || 140;
  const y    = Number(q.y  ?? 50)  || 50;
  const co   = String(q.co ?? '2b2b2b').replace(/[^0-9a-f]/gi,'').slice(0,6) || '2b2b2b';
  const o    = Math.max(0, Math.min(100, Number(q.o ?? 65)));
  const blur = Math.max(0, Math.min(50,  Number(q.blur ?? 8)));

  const extras = [`co_rgb:${co}`];
  if (o>0) extras.push(`o_${o}`);
  if (blur>0) extras.push(`e_blur:${blur}`);

  const ogImage =
    `https://res.cloudinary.com/${CLOUD}/image/upload/` +
    `l_text:Permanent%20Marker_${fs}:${encName},${extras.join(',')}/` +
    `fl_layer_apply,g_center,x_${x},y_${y}/` +
    `${PUBLIC_ID}`;

  const title = name ? `Oi, ${name} 👋` : `Oi!`;
  const desc  = `Detalhe feito pra você.`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!doctype html><html lang="pt-br"><head>
<meta charset="utf-8">
<title>${title}</title>
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${ogImage}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${ogImage}">
<meta name="robots" content="noindex">
</head><body></body></html>`);
}
