# Filtra

A responsive water filtration storefront concept built with React, Vite, and Lucide icons. An editorial ocean-and-sage design with original SVG product illustrations, serif accents, subtle motion, and mobile layouts.

## Run locally

Requires Node.js 22.12+.

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

## Pages & functionality

- Home: collection, product finder, brand story, product benefits, FAQs, demo newsletter signup.
- Product pages: `/#/product/flow`, `/#/product/pour`, `/#/product/fresh`; image views, color selection, quantity controls, and related products.
- Shopping bag: variant-aware cart, quantity updates, removal, shipping threshold, and localStorage persistence.
- Checkout: `/#/checkout`; empty state, validated contact and address fields, delivery options, editable review, and demo order confirmation.
- Keyboard focus management, Escape-to-close dialogs, semantic landmarks, reduced-motion support, and responsive layouts.

## Validation

```sh
npx playwright install chromium
npm test
```

Playwright covers the purchase journey, required fields, cart persistence, variants, quantities, express delivery totals, editing checkout details, confirmation, product finder, removal, and desktop/mobile overflow. Screenshots are written to the ignored `test-results` folder.

## Before production

This is a frontend concept, not a functioning commerce backend. Products, specifications, delivery estimates, and prices are illustrative. No payment data is requested, no real orders are sent, and newsletter submissions are not stored. Checkout address details stay in React memory; only the cart is stored locally.

Connect a commerce backend (including PrestaShop if desired), payment provider, actual inventory, product data, verified filtration claims, tax calculations, delivery and returns policies, and a real newsletter service before accepting orders. Hash routing works on static hosting without server rewrites. Google Fonts requires network access; system fallback fonts remain available. Product artwork is original SVG and has no external image dependency.

Design references: [Monet](https://www.monet.design/), [21st](https://21st.dev/), [Recent](https://recent.design/), and [Dribbble](https://dribbble.com/). Implementation and artwork are original; no third-party component source was copied.
