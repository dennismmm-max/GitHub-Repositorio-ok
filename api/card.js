// API: /api/card -> retorna HTML com metatags OG para thumb grande (1200x1200)
// Parâmetros: n, fs, x, y, co, o, blur, title, descr, dest
export default async function handler(req, res) {
  const q = req.query;
  const nameRaw = String(q.n || '').trim().slice(0, 40);
  const name = encodeURIComponent(nameRaw || '');

  const CLOUD = "dr3r1szcw";
  const PUBLIC = "v1758136687/copo_qyzeoa.jpg";

  const w = 1200, h = 1200;
  const fs = Number(q.fs ?? 28);
  const x  = Number(q.x ?? 140);
  const y  = Number(q.y ?? 50);
  const co = (String(q.co || "3d352e").replace(/[^0-9a-f]/gi,"")).slice(0,6) || "3d352e";
  const o  = Math.max(0, Math.min(100, Number(q.o ?? 65)));
  const blur = Math.max(0, Math.min(20, Number(q.blur ?? 8)));

  const title = String(q.title || "Convite especial").slice(0, 120);
  const descr = String(q.descr || "").slice(0, 200);
  const dest  = String(q.dest || "");

  const overlay = `l_text:Permanent%20Marker_${fs}:${name},co_rgb:${co},o_${o},e_blur:${blur}`;
  const apply = `fl_layer_apply,g_center,x_${x},y_${y}`;
  const ogImage = `https://res.cloudinary.com/${CLOUD}/image/upload/`+
                  `c_fill,w_${w},h_${h}/`+
                  `${overlay}/${apply}/${PUBLIC}`;

  const metaRefresh = dest ? `<meta http-equiv="refresh" content="0;url=${encodeURI(dest)}" />` : "";

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${descr}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="${w}">
  <meta property="og:image:height" content="${h}">
  ${metaRefresh}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${descr}">
  <meta name="twitter:image" content="${ogImage}">
</head>
<body>
  <img src="${ogImage}" alt="preview" style="max-width:100%;height:auto;display:block;margin:40px auto;border:1px solid #eee;border-radius:8px">
  <div style="text-align:center;color:#666;font:14px system-ui,sans-serif">Título: <strong>${title}</strong>${dest ? '<br>Destino: '+dest : ''}</div>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
