# Launch log

## 2026-09-01 — v3 "Exposure Record" promoted to root
The v3 design (built at `/v3/`, chosen by Javi over v2) replaced the root site the same day
v2 had been swapped in. v2 is preserved on branch `v2-design` and tag `v2-final`; v1 on
`v1-backup`. `/v2/` and `/v3/` hold redirect stubs to `/`. noindex removed; JSON-LD/OG ported
with the updated prices (1,300 / 1,500 / from 5,500; add-ons 500 / 500 / from 2,500; EPK
delivery within 2 weeks); og.jpg regenerated from the v3 hero; tests rewritten
(`tests/dom.test.js`, `tests/static.test.js`), 18/18 green.

### Post-deploy checklist (run after every push that changes the root page)
1. PageSpeed Insights against https://estrela.photo/ — investigate any regression.
2. Google Search Console: request re-indexing of the root URL; submit sitemap.
3. Verify OG cards (WhatsApp / Twitter / Facebook debuggers) — og.jpg absolute URL must resolve.
