# V2 → root launch checklist

**Status: swap executed locally on 2026-09-01** — steps 1–8 and 12 done (v2 promoted to root, noindex removed, `/v2/` left as a redirect, sitemap/robots/humans/tests updated, 16/16 tests green, real-browser QA passed). Steps 9–11 (production Lighthouse, Search Console re-index, OG card debuggers) can only run **after pushing to `main`** — do them right after the deploy.

1. **Backup safety**: branch `v1-backup` already preserves v1 (pushed to origin).
2. **Move v2 to root**: copy `v2/index.html`, `v2/css/`, `v2/js/`, `v2/img/`, `v2/fonts/`, `v2/llms.txt` to the repo root (keep `CNAME`, `robots.txt`, `manifest.json`, `humans.txt`). Fix asset paths if any become absolute.
3. **Remove the noindex meta** from the new root `index.html` (there's a marker comment above it).
4. **Delete v1 files** from root: old `index.html`, `css/` (v1), `js/` (v1 jQuery stack), unused `images/` originals stay (they are the source masters for `img/` derivatives — keep them).
5. **sitemap.xml**: single URL `https://estrela.photo/` with current lastmod.
6. **robots.txt**: keep allow-all + sitemap line; optionally add `LLM`-friendly comment pointing at `/llms.txt`.
7. **Update `humans.txt`** last-update date.
8. **Tests**: update paths in `tests/` if v2/ moves (they read `v2/index.html` — change the `v2` constant to the root). `npm test` green.
9. **Lighthouse on production** (PageSpeed Insights against https://estrela.photo/) — expect 100/100/100/100; investigate any regression.
10. **Google Search Console**: request re-indexing of the root URL; submit sitemap.
11. **Verify OG cards** (WhatsApp/Twitter/FB debuggers) — og.jpg absolute URL must resolve.
12. **Remove `/v2/` directory** after the swap (or keep briefly with a redirect meta) and update `V2-LAUNCH.md`/CLAUDE.md status notes.
