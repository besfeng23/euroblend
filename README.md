# Euro Blend — Ube Collection

Production: https://euroblend.vercel.app/  
Source: https://github.com/besfeng23/euroblend

## Current release direction (November 24, 2026)

Euro Blend is a premium Philippine-market beverage presentation. It is a static Vercel website with the home collection and a hospitality/trade information page. Buyers can copy an enquiry and open the official Euro Blend Facebook page. This site does not accept payment, transmit orders, or store customer enquiries.

### Canonical eight product names

1. Ube Macchiato
2. Ube Criollo
3. Ube Criollo Salted Caramel
4. Ube Salted Caramel
5. Ube Vanilla
6. Ube Classic
7. Ube Latte
8. Ube Milk

Groups: Café & Criollo (1–3), Flavored Ube (4–5), Signature Collection (6–7), and Ube Milk (8).

**Criollo is the correct spelling** of the cacao variety term. Never introduce its transposed misspelling. Naming does not establish that any ingredient actually comes from a verified Criollo cultivar; supplier evidence is required before making provenance claims.

### Locked branding

- Only **EURO BLEND** is permitted in public-facing identity and product imagery.
- The retired four-digit numeric prefix is blacklisted. Do not put it in UI, email addresses, filenames, advertising, alt text, social cards, or future packaging. The repository includes an automated brand-guard check to catch text regressions.
- The old Gmail inbox contained that prefix and is not a permitted published contact. **Do not invent a replacement email.** The official owner-supplied Facebook page is the temporary contact path, including hospitality enquiries.
- Owner clarification (November 27, 2026): Light Lavender identifies Ube Milk, not a separate product. The final count is eight. This supersedes the November 24 lineup. Use approved artwork and colors unchanged.

### Product photography

Existing optimized carton/sachet imagery is reused for Ube Latte (the existing Deep Ube editorial image set), Ube Macchiato, Ube Criollo, and Ube Criollo Salted Caramel. The other four products use typography only pending matching approved imagery. Source images, design derivatives, and physical retail packaging must not be conflated. Prefer natural linen, warm ivory, subdued plum/cacao, legible complete packages, and calm compositions. Do not crop or obstruct package labels.

### Release and claims policy

- No invented ingredient composition, cacao genetics, caffeine levels, food-safety credentials, prices, stock, shipping terms, pack quantity, or weights.
- Verify whether the actual printed item is 3-in-1 and whether its weight refers to one sachet or the full package before publication/printing.
- All changes through a reviewed GitHub PR with a preview; do not merge without Mark’s approval. Check responsive layouts, keyboard use, the flavor selector, both visual modes, the contact path, and Vercel deployment status. Avoid unapproved spending, databases, or checkout.
- Run `node --check script.js` and `node scripts/brand-check.mjs` before merging. On GitHub, the brand guard runs on PRs and main.

### Known limitations

The site lacks a CRM-backed enquiry form, direct messaging deep link, and independently verified real-product inventory. Social-sharing and final retail packaging must be approved separately. See [DESIGN_AUDIT.md](./DESIGN_AUDIT.md) for the latest release observations.

## Avoid misleading product colors (owner/product-team directive, November 23)

The product team raised a customer-expectation issue: a generated Ube Salted Caramel drink photo shows a hue that buyers could expect from the actual item. Do not show that image or imply a prepared-beverage color that has not been verified. Ube Milk (Light Lavender), Ube Classic, Ube Vanilla and Ube Salted Caramel use restrained brand typography, not invented carton colors, drink hues or cup photography. The four other flavors retain existing owner-supplied packaging references. Restore a product photo only after the product team approves an accurate real-world photograph.
