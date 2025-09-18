// /r/[t] — link curto com OG direto nesta rota.
// Bots (LinkedIn, etc.) lerão o OG aqui mesmo; humanos são redirecionados ao 'dest' (se existir).
export default function handler(req, res){
  const { t = "" } = req.query;
  let data = {};
  try{
    const raw = Buffer.from(String(t).replace(/-/g,'+').replace(/_/g,'/'), 'base64').toString('utf8');
    data = JSON.parse(raw || "{}");
  }catch(e){ data = {}; }

  const ua = String(req.headers['user-agent'] || '').toLowerCase();
  const isBot = /(linkedinbot|twitterbot|facebookexternalhit|slackbot|whatsapp|telegrambot|bot|embedly)/i.test(ua);

  const name = String(data.n || '').slice(0,40);
  const fs = Number(data.fs || 28);
  const x  = Number(data.x  || 140);
  const y  = Number(data.y  || 50);
  const o  = Number(data.o  || 65);
  const blur = Number(data.blur || 8);
  const co = String(data.co || '3d352e').replace(/[^0-9a-f]/gi,'');
  const title = String(data.title || 'Convite especial');
  const descr = String(data.descr || 'Acesso prioritário por tempo limitado.');
  const dest  = String(data.dest || '');

  const CLOUD = 'dr3r1szcw';
  const PUBLIC = 'v1758136687/copo_qyzeoa.jpg';
  const w=1200,h=1200;
  const overlay = `l_text:Permanent%20Marker_${fs}:${encodeURIComponent(name)},co_rgb:${co},o_${o},e_blur:${blur}`;
  const apply   = `fl_layer_apply,g_center,x_${x},y_${y}`;
  const ogImage = `https://res.cloudinary.com/${CLOUD}/image/upload/c_fill,w_${w},h_${h}/${overlay}/${apply}/${PUBLIC}`;

  if(!isBot && dest){
    res.writeHead(302, { Location: dest });
    res.end();
    return;
  }

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
    <style>body{margin:0;background:#0b1020;color:#e5e7eb;font:16px system-ui}</style>
  </head><body>
    <div style="max-width:860px;margin:40px auto;padding:10px">
      <img src="${ogImage}" style="max-width:100%;display:block;margin:20px auto;border:1px solid #1e293b;border-radius:10px">
      ${dest ? `<p style="text-align:center"><a href="${dest}" style="color:#80dfff">Continuar &rarr;</a></p>` : ``}
    </div>
  </body></html>`;

  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.status(200).send(html);
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
