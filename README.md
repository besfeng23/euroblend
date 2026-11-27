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

## Euroblend Concierge

The homepage and trade page include a bilingual question-and-answer concierge. The current approved product list is defined in `concierge-knowledge.js`; only grounded answer templates and approved contact links are returned. In guide mode, questions are matched to FAQ topics locally or by the Vercel API. In AI-assisted mode, Gemini receives the current question, approved product knowledge and bounded conversational context. It can compose short discovery/clarification dialogue, while product specifications, prices, commercial terms and other factual answers use approved answer templates. Generated prose passes a limited risk filter; this is not a guarantee against hallucination. The assistant must not claim consciousness or human identity. Missing configuration, budget exhaustion, provider failure and invalid output fall back to the verified guide. The UI explicitly labels the current mode.

### Activation and operating limits

- Production AI is off unless `CONCIERGE_AI_ENABLED=true` is explicitly set.
- Inject `GEMINI_API_KEY` through the approved Vault-backed server-side secret workflow; never expose it to browser code or commit it.
- Set `GEMINI_MODEL` to the approved and tested Gemini model identifier.
- Provision an authorized Upstash Redis quota store, or adapt the limiter to an existing approved durable quota service. Set `CONCIERGE_REDIS_URL`, `CONCIERGE_REDIS_TOKEN` and `CONCIERGE_DAILY_LIMIT` (integer 1–500). AI requests fail closed without a valid atomic daily budget. Set the provider's own quota/billing limit as well.
- The public API accepts only bounded JSON questions, limits output tokens and times out upstream requests. The daily cap is global, not a per-user abuse-control guarantee. Configure additional edge rate limiting before unrestricted AI activation.
- No chat history or customer leads are persisted by the application. The browser keeps only the current chat's validated product, topic, purchase goal, preference, quantity, pending question and last four topic IDs; clearing the chat resets this context. No names, addresses or payment data are included in structured context. Questions may be sent to Gemini only when AI is enabled; do not enter private information or payment details. The app does not collect payment or submit orders. Confirm provider privacy terms and an appropriate public privacy notice before activation.
- Maintain verified product facts in the knowledge file via reviewed pull requests. A separately authorized Supabase project, staff authentication, role-based administration, knowledge publishing workflow, analytics and retention rules are needed before adding an admin workspace or conversation persistence.
- Prices, allergen and nutritional facts, preparation, availability, shipping, payment, FDA registration, commercial terms and product specifications remain unconfirmed. Keep them unpublished until the owner provides authoritative details.
- Run `node --test scripts/concierge.test.cjs` and the existing brand guard; verify the deployed API in guide mode and actual Gemini calls only after approved credential and quota configuration. Confirm keyboard navigation, mobile rendering and both pages in a browser before claiming full QA.
