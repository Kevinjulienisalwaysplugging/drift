# Deploy DRIFT to Vercel

## Current Best Move

Deploy the Next.js version first as a brand and waitlist site. Shopify Checkout can be connected after the DRIFT shopping flow is finalized.

## Steps

1. Create a GitHub repository for this folder.
2. Push the project to GitHub.
3. Go to Vercel and click `Add New Project`.
4. Import the GitHub repository.
5. Vercel should detect `Next.js`.
6. Add these environment variables:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://rjzlvredvueprubxtple.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-supabase-anon-key
NEXT_PUBLIC_SUPABASE_TABLE=waitlist_signups
```

7. Deploy.

## Later, When Shopify Is Connected

Add these Vercel environment variables:

```text
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_PRIVATE_TOKEN=your-private-storefront-access-token
SHOPIFY_STOREFRONT_API_VERSION=2026-04
```

The bag is already built. The server-side endpoint at `/api/shopify/checkout` creates a Shopify cart and returns Shopify's secure checkout URL after product variants are mapped.

## Lightweight Static Source

The repository also includes `index.html`, `styles.css`, `script.js`, and `assets/` for a lightweight static preview.
