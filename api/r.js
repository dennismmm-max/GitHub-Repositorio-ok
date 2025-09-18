function decodeToken(t){try{return JSON.parse(Buffer.from(t,'base64').toString('utf8'))}catch(e){return{}}}
export default function handler(req,res){
  const ua=String(req.headers['user-agent']||'').toLowerCase();
  const isBot=/(linkedinbot|twitterbot|facebookexternalhit|slackbot|embedly|quora link preview|whatsapp|bot)/i.test(ua);
  const token=String(req.query.u||'');
  const q=decodeToken(token);
  const params=new URLSearchParams(q).toString();
  const cardUrl=`${req.headers['x-forwarded-proto']||'https'}://${req.headers.host}/api/card?${params}`;
  const dest=String(q.dest||'');
  if(isBot){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    res.end(`<!DOCTYPE html><html><head><meta charset="utf-8">
      <meta http-equiv="refresh" content="0; url='${cardUrl}'" /><link rel="canonical" href="${cardUrl}"></head><body>Preview…</body></html>`);
  }else{res.writeHead(302,{Location:dest||cardUrl});res.end();}
}