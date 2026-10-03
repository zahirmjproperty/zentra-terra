# terra.project.zentrapropertygroup.com — Mr Tanah × TERRA Residences

Landing microsite for **TERRA Residences, Precinct 8 Putrajaya** (developer: Putrajaya Holdings / PJH),
marketed and sold by **Mr Tanah — a ZENTRA brand**.

Bilingual **Bahasa Melayu Malaysia (default) + English**, toggled in-page (BM/EN button, `?lang=en` URL).

## Files
- `index.html` — hero, 4 VR/360 tour cards (A2 Main, A2 Dual-Key, B1, C), gallery, enquiry CTA
- `project.html` — project facts, 3 floor plans (A2, B1, C), FAQ
- `data/project.js` — **all** copy and figures (single source; never hard-code numbers in HTML)
- `assets/app.js` — renderer + language switch (no facts stored here)
- `assets/style.css` — Mr Tanah palette (forest green `#0A1510` / gold `#C8A96A` / cream)
- `assets/img/` — tour panoramas, rectilinear previews, real exterior photos, floor plans

## Sources
- Project facts: PJH official page + official brochure/permit (verified in the 12 Sep 2026 TERRA study)
- VR/360 tours: `https://vr3d.zentrapropertygroup.com/tour.html?id=terra-a2-main|terra-a2-dual|terra-b1`
- Exterior photos: supplied by Zahir (PJH TERRA Drive folder), 3 Oct 2026

## Hard rules (do not break)
1. **No pricing, rebate, net price or discount** on any public page — developer advertising guidelines
   (penalty RM5,000–15,000). CTA asks the visitor to enquire with Mr Tanah instead.
2. `noindex,nofollow` + `robots.txt Disallow: /` **until Zahir approves**; then flip to index and submit sitemap.
3. Public contact = Mr Tanah brand number `016-311 9076`, never Zahir's personal number.
4. Copyright: use the developer's own materials or Mr Tanah/ZENTRA-created assets. No third-party images.

## Preview (auth)
`https://api.zahirmjproperty.com/terra-preview/` — basic auth `zahir` (sama seperti preview lain), `noindex`.

## Publish (after Zahir approves)
1. `git init` → commit → push `zahirmjproperty/zentra-terra` (token segar dari `~/.hermes/.env`).
2. `POST /repos/OWNER/REPO/pages` with `{"source":{"branch":"main","path":"/"},"cname":"terra.project.zentrapropertygroup.com"}`.
3. DNS Porkbun: CNAME `terra.project.zentrapropertygroup.com` → `zahirmjproperty.github.io`, ttl 600.
4. Flip `noindex` → index, submit `sitemap.xml`, register in `pantau_https_zentra.py` + `bina_dash_index.py`.
5. Delete path = remove repo + DNS record (nothing else references it).

## Status
Preview live and verified (bilingual, VR modal loads the live ZENTRA tour). Not yet published to production.
