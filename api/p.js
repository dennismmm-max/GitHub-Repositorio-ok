// api/p.js — OG + redirect humano + crop/pad Cloudinary + links curtos (defaults: pad + auto)
// Parâmetros curtos: n (nome), f (font), x, y, c (hex), o (opacity), b (blur), g (gravity), m (mode fill|pad), d (dest)
export default function handler(req, res) {
  try {
    const q = req.query;
    const val = (k, def) => (q[k] !== undefined ? String(q[k]) : def);
    const name = (val('n','').trim().slice(0, 40) || '').replace(/\s+/g, ' ');
    const enc = encodeURIComponent(name);

    const CLOUD = 'dr3r1szcw';
    const PUBLIC_ID = 'v1758136687/copo_qyzeoa.jpg';

    const f = Math.max(10, Math.min(120, Number(val('f',27)) || 27));
    const x = Number(val('x',140)) || 140;
    const y = Number(val('y',50))  || 50;
    const c = (val('c','2b2b2b').replace(/[^0-9a-f]/gi,'').slice(0,6) || '2b2b2b');
    const o = Math.max(0, Math.min(100, Number(val('o',65)) || 65));
    const b = Math.max(0, Math.min(50,  Number(val('b',8))  || 8));
    const g = val('g','auto');
    const m = val('m','pad'); // default: sem corte (bordas)

    const extras = [`co_rgb:${c}`];
    if (o > 0)    extras.push(`o_${o}`);
    if (b > 0)    extras.push(`e_blur:${b}`);

    const box = (m === 'pad')
      ? `c_pad,${g!=='center'?`g_${g},`:''}w_1200,h_627,b_auto`
      : `c_fill,g_${g},w_1200,h_627`;

    const ogImage =
      `https://res.cloudinary.com/${CLOUD}/image/upload/` +
      `l_text:Permanent%20Marker_${f}:${enc},${extras.join(',')}/` +
      `fl_layer_apply,g_center,x_${x},y_${y}/` +
      `${box}/` +
      `${PUBLIC_ID}` + `?v=${Date.now()}`;

    const CLICK_DEST = val('d','https://www.linkedin.com/in/marciomiranda/');

    const ua = String(req.headers['user-agent'] || '').toLowerCase();
    const isBot = /(linkedinbot|twitterbot|facebookexternalhit|slackbot|embedly|bot|crawler|spider)/.test(ua);

    if (!isBot) {
      res.writeHead(302, { Location: CLICK_DEST });
      res.end();
      return;
    }

    const TITLE = ' ';
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(`<!doctype html><html lang="pt-br"><head>
<meta charset="utf-8">
<title>${TITLE}</title>
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${TITLE}">
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
