# DRIFT Luxury Storefront

This folder contains the GitHub-ready DRIFT site:

- Lightweight static source: `index.html`, `styles.css`, `script.js`, and `assets/`.
- Next.js/Vercel app: `app/`, `lib/`, `public/`, `package.json`, and `vercel.json`.

The oversized one-file preview is intentionally excluded from the repository package.

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import the repo in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

## Current Backend

The waitlist form saves emails to Supabase.

## Future Shopify Checkout

The custom DRIFT bag works in the preview. Shopify Checkout is the recommended payment layer for launch.

Use server-side environment variables for:

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_PRIVATE_TOKEN`
- `SHOPIFY_STOREFRONT_API_VERSION`

See `SHOPIFY-CONNECT.md`.

