# Euro Blend — Ube Collection

Production: https://euroblend.vercel.app/  
Source: https://github.com/besfeng23/euroblend

## Current release direction (November 23, 2026)

Euro Blend is a premium Philippine-market beverage presentation. It is a static Vercel website with the home collection and a hospitality/trade information page. Buyers can copy an enquiry and open the official Euro Blend Facebook page. This site does not accept payment, transmit orders, or store customer enquiries.

### Canonical eight product names

1. Ube Latte
2. Ube Milk
3. Ube Classic
4. Ube Macchiato
5. Ube Vanilla
6. Ube Salted Caramel
7. Ube Criollo Cacao
8. Ube Criollo Salted Caramel

**Criollo is the correct spelling** of the cacao variety term. Never introduce its transposed misspelling. Naming does not establish that any ingredient actually comes from a verified Criollo cultivar; supplier evidence is required before making provenance claims.

### Locked branding

- Only **EURO BLEND** is permitted in public-facing identity and product imagery.
- The retired four-digit numeric prefix is blacklisted. Do not put it in UI, email addresses, filenames, advertising, alt text, social cards, or future packaging. The repository includes an automated brand-guard check to catch text regressions.
- The old Gmail inbox contained that prefix and is not a permitted published contact. **Do not invent a replacement email.** The official owner-supplied Facebook page is the temporary contact path, including hospitality enquiries.
- Do not create additional products from the three Ube Latte color-variant mockups.

### Product photography

The latest owner-supplied packaging is reflected in optimized carton/sachet imagery for Ube Latte, Ube Macchiato, Ube Criollo Cacao, and Ube Criollo Salted Caramel. The other four products retain earlier illustrative images pending matching approved photographs. Source images, design derivatives, and physical retail packaging must not be conflated. Prefer natural linen, warm ivory, subdued plum/cacao, legible complete packages, and calm compositions. Do not crop or obstruct package labels.

### Release and claims policy

- No invented ingredient composition, cacao genetics, caffeine levels, food-safety credentials, prices, stock, shipping terms, pack quantity, or weights.
- Verify whether the actual printed item is 3-in-1 and whether its weight refers to one sachet or the full package before publication/printing.
- All changes through a reviewed GitHub PR. Check responsive layouts, keyboard use, the flavor selector, both visual modes, the contact path, and Vercel deployment status. Avoid unapproved spending, databases, or checkout.
- Run `node --check script.js` and `node scripts/brand-check.mjs` before merging. On GitHub, the brand guard runs on PRs and main.

### Known limitations

The site lacks a CRM-backed enquiry form, direct messaging deep link, and independently verified real-product inventory. Social-sharing and final retail packaging must be approved separately. See [DESIGN_AUDIT.md](./DESIGN_AUDIT.md) for the latest release observations.
