# Euro Blend website design and release audit
Date: 2026-11-23 (Philippines)
Scope: `index.html`, `style.css`, `script.js`, `trade.html`, user-supplied packaging references, responsive imagery, and existing Facebook/email contact path.

## Source-of-truth and deliberate constraints
- Repository: `besfeng23/euroblend`; existing Vercel production domain `https://euroblend.vercel.app`.
- Eight established flavors retained: Ube Latte, Ube Milk, Ube Classic, Ube Macchiato, Ube Vanilla, Ube Salted Caramel, Ube Criollo Cacao, Ube Criollo Salted Caramel.
- The latest supplied image set depicts **four** of the eight flavors plus companion sachets. Three "Light Lavender / Classic Ube / Deep Ube" carton variants are visibly labelled **Ube Latte** and are not assumed to be three new flavors. This change selects the Deep Ube image as the Ube Latte reference.
- New photography used: Ube Latte (carton/sachet), Ube Macchiato (carton/sachet), Ube Criollo Cacao (carton/sachet), and Ube Criollo Salted Caramel (carton/sachet). The remaining four retain the previous illustrative art until actual package photos arrive.
- The new user-supplied artwork spelled Criollo as "CROILLO" and included "1064" on Ube Latte. The *website presentation derivatives* correct these display issues. Original user uploads remain intact.
- Printed "3-in-1", "10 sachets", and "30g" are **visual references**, not independently authenticated product specifications. Do not print, market as verified, or use as structured-data offers without product-owner confirmation.

## Design / accessibility / functional audit
| Finding | Priority | Resolution |
|---|---|---|
| Repetitive generic AI-styled imagery did not match approved packaging | High | Replace four matching flavor displays with the supplied carton images; retain old art only for unrepresented flavors. |
| Older collage/cropped photography made labels unreadable | High | New editorial photo strip uses containment rather than `object-fit: cover`; phone layout becomes horizontally scrollable with full-package cards. |
| Product screenshots embedded old 1064 branding and misspelt Criollo | High | Corrected only in optimized website-image derivatives; don't alter original supplied source files. |
| Visitors couldn't inspect individual sachets for the supplied product references | Medium | Added keyboard-accessible Carton/Sachet buttons for the four supported flavors, hidden for other flavors. |
| Hero looked like a generic cosmetic advertisement instead of a Philippine beverage line | Medium | Simplified to warm natural materials and user-supplied product photography, reducing excessive gradients/shape decoration. |
| Full 8-flavor lineup could be mistaken for the three Ube Latte color shades in uploaded images | High | Preserved exact eight canonical product names and no new SKUs/variants. |
| Trade page imported home-only JS that unconditionally queried missing elements | High | Early guard after shared menu/year setup; tested mobile navigation works and no runtime error on trade page. |
| Product-detail enquiry has no prefilled Facebook Messenger thread | Medium | Preserved existing Facebook link with a separate copyable flavor-specific message; did not claim a sale was submitted. |
| Claims about pricing, caffeine, ingredients, weights or availability cannot be verified | High | No new numerical or formulation claims added; original packaging proofs flagged for confirmation. |
| Changing the public website without preview and interaction testing risks regressions | High | Local Chromium tests on 360, 390, 768, and 1440 CSS pixel widths, both moods, flavor selection, carton/sachet switching, gallery navigation, no horizontal overflow, and trade mobile menu. |

## Further preprint / market-readiness checks
1. Approve corrected packaging names and logo usage. Confirm whether `3-in-1`, `10 sachets` and `30g` are accurate and whether 30g is per sachet or pack.
2. Confirm the ingredients, allergen statements, legal producer/importer identity, Filipino food labeling obligations, nutritional information, and regulatory approvals before putting pack art into print.
3. Acquire final pack and sachet photos for Ube Milk, Ube Classic, Ube Vanilla, Ube Salted Caramel. Until then their display remains a different illustration style.
4. Confirm official order process and whether demand should route to Facebook, email, or a real CRM/checkout. No hidden lead database was created.
5. Repeat live production navigation and image checks after the Vercel build; local headless tests alone do not establish live deployment health.

## Verification status
- Local JS syntax: `node --check` passed.
- Local Chromium script and layout: passed at four viewport widths with zero reported page JS exceptions and zero page horizontal overflow. Images lazy-loaded out of viewport are not counted as failed loads in the initial screenshot.
- External providers: Vercel and GitHub CI to be checked on preview before merging.
