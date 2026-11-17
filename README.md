# Harbour & Hearth (fictional demo site)

Independent cafe and bakery on Saltmarsh Quay. Part of the Polar Chat Agent demo. Not a real business.

```sh
npm install
npm run dev     # http://localhost:4321
npm run build
```

## Where things live
- **Copy:** `src/content/` (JSON, validated by `src/content.config.ts`).
  - `site/site.json`: name, nav, address, phone, email, opening hours.
  - `pages/*.json`: page copy for Home, Menu, About, Contact.
  - `menu/*.json`: one file per menu section. Prices are numbers in GBP (`3.2` shows as `£3.20`).
- **Colours, fonts, spacing:** `src/styles/tokens.css` only (protected).
- **Images:** `public/images/`. Leave `src` out of an image and a placeholder is shown; `alt` is always required.

Noindexed three ways: robots meta, `public/robots.txt`, and an `X-Robots-Tag` header in `vercel.json`.
