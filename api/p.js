// api/p.js — OG + redirect humano + crop Cloudinary
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

    const ogImage =
      `https://res.cloudinary.com/${CLOUD}/image/upload/` +
      `l_text:Permanent%20Marker_${fs}:${enc},${extras.join(',')}/` +
      `fl_layer_apply,g_center,x_${x},y_${y}/` +
      `c_fill,g_center,w_1200,h_627/` +
      `${PUBLIC_ID}`;

    const CLICK_DEST = String(q.dest || 'https://www.linkedin.com/in/marciomiranda/');

    const ua = String(req.headers['user-agent'] || '').toLowerCase();
    const isBot = /(linkedinbot|twitterbot|facebookexternalhit|slackbot|embedly|bot|crawler|spider)/.test(ua);

    if (!isBot) {
      res.writeHead(302, { Location: CLICK_DEST });
      res.end();
      return;
    }

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
<meta property="og:site_name" content="Márcio Miranda">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${ogImage}">
</head><body></body></html>`);
  } catch (e) {
    res.status(500).send('Internal error');
  }
}
