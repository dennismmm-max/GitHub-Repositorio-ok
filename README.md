# Vercel • Thumb grande tipo Hyperise (com título)

## Rotas
- `/` UI com sliders e campos (nome, título, descr, destino). Gera o link automaticamente.
- `/api/card` Endpoint que devolve HTML com **Open Graph** (1200×1200) para o LinkedIn renderizar o **preview grande**.

## Como usar
1) Suba a pasta no Vercel (Import Git ou upload manual).
2) Abra `https://SEU_DOMINIO/` e preencha os campos.
3) Clique em **Copiar link** e cole no **LinkedIn Post Inspector** para forçar recrawl.
4) Cole a mesma URL na DM do LinkedIn.

## Parâmetros suportados pela API
`n, fs, x, y, co, o, blur, title, descr, dest`

> OBS: O domínio sempre aparece no card (política do LinkedIn). Para deixar “curto e limpo”, use um domínio curto apontado ao Vercel.
