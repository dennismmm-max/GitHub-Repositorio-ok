# vercel-og-thumb-app • v9

- `/` → UI compacta (60/40), preview grande sem scroll lateral, sliders e campos em tempo real.
- `/api/card` → compat: OG por querystring.
- `/r/[t]` → **rota curta** com OG servido **nesta** rota (ideal para LinkedIn DM). Bots veem o OG; humanos vão para `dest` (se definido).

## Como usar
1) Deploy no Vercel.
2) Abra `/`, ajuste e clique **Copiar link curto** (gera `/r/<token>`).
3) (Primeira vez de um link) passe no **LinkedIn Post Inspector** para reindexar.
4) Cole no DM. O cartão mostra **apenas seu domínio** + a imagem OG 1200×1200.

> Dica: mantenha `title` e `descr` não vazios para evitar “Link da internet”.
