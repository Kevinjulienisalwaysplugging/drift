# DRIFT Shopify + Vercel Roadmap

## What Is Set Up Now

- The current DRIFT design is preserved as a Vercel-ready Next.js app.
- The standalone sendable HTML still exists.
- Supabase waitlist capture is still connected.
- Product data is isolated in `lib/shopify-products.js` so it is easy to replace with live Shopify products later.
- `lib/shopify.js` is ready for Shopify Storefront API calls once you create the Shopify store and token.

## Recommended Launch Path

1. Deploy the current Next.js project to Vercel as the brand/waitlist site.
2. Create the Shopify store in the background.
3. Add real products, prices, inventory, shipping, taxes, and payment settings in Shopify.
4. Create a Shopify Storefront API token.
5. Add `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` to Vercel environment variables.
6. Replace placeholder product cards with live Shopify product data.
7. Add cart and checkout links that send customers to Shopify checkout.

## Reminder After Site Finalization

After the DRIFT site is finalized with product photos, prices, copy, and policies, remember to handle the Vercel/Shopify setup:

- Push the finished site to GitHub.
- Import it into Vercel.
- Add Supabase environment variables.
- Create the Shopify store.
- Add Shopify Storefront API credentials to Vercel.
- Connect products, cart, and checkout.

## What I Still Need From You

- Shopify store domain, usually like `drift-sleep.myshopify.com`.
- Shopify Storefront API access token.
- Final confirmation on product names.
- Final confirmation on prices already provided.
- Product photos.
- Product variants, colors, and sizes.
- Shipping regions and rates.
- Return policy.
- Domain name.

## Why This Path Keeps Your Site

Vercel remains the front door and visual experience. Shopify sits behind it as the commerce system. That means the DRIFT site can keep its luxury custom design while Shopify handles checkout, orders, payments, shipping, and inventory.
