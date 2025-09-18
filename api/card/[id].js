// /api/card/[id].js – Vercel Serverless: devolve HTML com OG e redireciona humanos
export default function handler(req, res) {
  const { id } = req.query;
  let data = {};
  try {
    const json = Buffer.from(String(id).replace(/-/g,'+').replace(/_/g,'/'), 'base64').toString('utf8');
    data = JSON.parse(json);
  } catch {}
  const n   = String(data.n || '').trim().slice(0, 40);
  const fs  = Number(data.fs || 26);
  const x   = Number(data.x || 140);
  const y   = Number(data.y || 50);
  const co  = String(data.co || '3d352e').replace(/[^0-9a-f]/gi,'').slice(0,6);
  const o   = Math.max(0, Math.min(100, Number(data.o || 65)));
  const blur= Math.max(0, Math.min(12, Number(data.blur || 8)));
  const title = String(data.title || 'Convite especial para você 👋').slice(0, 90);
  const desc  = String(data.desc || 'Acesso prioritário por tempo limitado.').slice(0, 200);
  const dest  = String(data.dest || 'https://www.linkedin.com/in/marciomiranda/');
  const base  = String((data.base || 'v1758136687/copo_qyzeoa.jpg'));

  const cloud = 'dr3r1szcw';
  const name = encodeURIComponent(n);
  const overlay = `l_text:Permanent%20Marker_${fs}:${name},co_rgb:${co},o_${o},e_blur:${blur}/fl_layer_apply,g_center,x_${x},y_${y}`;
  const img = `https://res.cloudinary.com/${cloud}/image/upload/c_fill,w_1200,h_627/${overlay}/${base}`;

  const origin = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
  const selfUrl = `${origin}${req.url}`;

  const ua = String(req.headers['user-agent'] || '').toLowerCase();
  const isBot = /(bot|facebook|linkedin|twitter|crawler|spider|slurp|whatsapp|preview)/.test(ua);

  const html = `<!doctype html>
<html><head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(desc)}">
<meta property="og:image" content="${img}">
<meta property="og:url" content="${selfUrl}">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="${selfUrl}">
${isBot ? '' : `<meta http-equiv="refresh" content="0;url=${escapeHtml(dest)}">`}
<style>body{background:#0e1217;color:#eee;font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;padding:24px}a{color:#9cf}</style>
</head><body>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(desc)}</p>
<p><img src="${img}" alt="" style="max-width:100%;height:auto;border:1px solid #333;border-radius:8px"></p>
<p><a href="${escapeHtml(dest)}">Ir para o destino</a></p>
</body></html>`;

  res.setHeader('Cache-Control','public, max-age=60, s-maxage=600, stale-while-revalidate=600');
  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.status(200).send(html);
}

function escapeHtml(str){return String(str).replace(/[&<>"']/g,s=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}
