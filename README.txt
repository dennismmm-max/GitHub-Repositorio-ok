PASSO A PASSO – Publicar no Vercel

1) Descompacte o arquivo ZIP em alguma pasta local.
   Estrutura:
     copo-vercel/
       index.html
       vercel.json
       api/
         p.js

2) Publique no Vercel (sem Git):
   - Crie conta em https://vercel.com (free).
   - Clique em "Add New" > "Project" > "Import" > "Upload".
   - Faça upload da pasta "copo-vercel".
   - Aguarde o deploy. O site ficará algo como: https://SEU-PROJETO.vercel.app

3) Testes:
   - Acesse a página do gerador: https://SEU-PROJETO.vercel.app/
   - Gere e copie o "link Cloudinary (.jpg)" e cole onde quiser.
   - Se o inbox não mostrar a imagem do .jpg, use o link OG:
     https://SEU-PROJETO.vercel.app/p?n=Denis
     (Esse link retorna HTML com og:image para mostrar o cartão com imagem.)

4) Onde editar:
   - index.html: ajuste Cloud name e Public ID nos campos da página (já estão preenchidos com seus valores).
   - api/p.js: ajuste constantes CLOUD/PUBLIC_ID se mudar a imagem base.
   - vercel.json: já mapeia /p -> /api/p (não precisa mexer).

DICAS:
- Se o LinkedIn cachear a prévia, adicione um parâmetro extra para "forçar" atualização, ex.: /p?n=Denis&v=123
- Você pode usar o projeto nesse subdomínio *.vercel.app sem custo.
- Mais tarde, se quiser, adicione um domínio próprio em Settings > Domains.
