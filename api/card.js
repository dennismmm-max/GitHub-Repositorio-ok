// /api/card — OG via querystring (compatibilidade)
export default function handler(req, res){
  const q = req.query || {};
  const name = String(q.n || '').slice(0,40);
  const fs = Number(q.fs || 28);
  const x  = Number(q.x  || 140);
  const y  = Number(q.y  || 50);
  const o  = Number(q.o  || 65);
  const blur = Number(q.blur || 8);
  const co = String(q.co || '3d352e').replace(/[^0-9a-f]/gi,'');
  const title = String(q.title || 'Convite especial');
  const descr = String(q.descr || 'Acesso prioritário por tempo limitado.');

  const CLOUD = 'dr3r1szcw';
  const PUBLIC = 'v1758136687/copo_qyzeoa.jpg';
  const w=1200,h=1200;
  const overlay = `l_text:Permanent%20Marker_${fs}:${encodeURIComponent(name)},co_rgb:${co},o_${o},e_blur:${blur}`;
  const apply   = `fl_layer_apply,g_center,x_${x},y_${y}`;
  const ogImage = `https://res.cloudinary.com/${CLOUD}/image/upload/c_fill,w_${w},h_${h}/${overlay}/${apply}/${PUBLIC}`;

  const html = `<!doctype html><html><head>
    <meta charset="utf-8">
    <title>${escapeHtml(title)}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(descr)}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:width" content="${w}">
    <meta property="og:image:height" content="${h}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(descr)}">
    <meta name="twitter:image" content="${ogImage}">
  </head><body style="margin:0;background:#0b1020;display:flex;align-items:center;justify-content:center;height:100vh">
    <img src="${ogImage}" style="max-width:90%;max-height:80vh;border-radius:10px;border:1px solid #1e293b">
  </body></html>`;

  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.status(200).send(html);
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
