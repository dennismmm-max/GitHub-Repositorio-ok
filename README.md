# Projeto Vercel – Gerador Cloudinary (rápido + sliders em tempo real)

## O que vem
- `index.html`: campo **Nome** + botões **Copiar link p/ LinkedIn** e **Baixar JPG** + **sliders em tempo real** (fonte, X, Y, cor, opacidade, blur) com **preview**.
- `api/p.js`: endpoint OG minimizado (imagem 1200x627, título/descrição invisíveis).
- `vercel.json`: rewrite para usar `/p?n=...`.

## Como publicar
1) Suba estes arquivos num repo (GitHub Desktop → Commit/Push).
2) No Vercel: **Add New Project** → selecione o repo → Deploy.

## Uso rápido
- Digite o **Nome** → Enter (ou clique **Copiar link p/ LinkedIn**).
- Se quiser **só a imagem** no inbox: clique **Baixar JPG** e **anexe** no LinkedIn.

## Observação
- O **domínio do cartão** sempre aparece no LinkedIn (regra da plataforma). Para “diminuir visualmente”, deixamos título/descrição vazios. Se quiser um domínio curto, aponte um subdomínio próprio no Vercel.
