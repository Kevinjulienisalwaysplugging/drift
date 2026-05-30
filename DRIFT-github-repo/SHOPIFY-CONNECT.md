# Connect DRIFT to Shopify

The recommended setup keeps the custom DRIFT website on Vercel and uses Shopify behind it for products, inventory, cart, payments, and checkout.

## 1. Create the Shopify store

1. Create the Shopify account and store.
2. In Shopify Admin, add the DRIFT products under `Products`.
3. Add each color as a product option named `Color`.
4. Add bedding sizes either as separate products, matching the current DRIFT site, or as one bedding product with a `Size` option.
5. Set prices, inventory, shipping weight, and product photos.

## 2. Create Storefront API access

Use Shopify's Headless channel or a custom app to create Storefront API access for the DRIFT website.

The website needs:

```text
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_PRIVATE_TOKEN=your-private-storefront-access-token
SHOPIFY_STOREFRONT_API_VERSION=2026-04
```

Do not paste the token into the public HTML file. Add these values as environment variables in Vercel.

## 3. Add the values in Vercel

1. Open the DRIFT project in Vercel.
2. Go to `Settings` > `Environment Variables`.
3. Add the three Shopify values above.
4. Apply them to `Production`, `Preview`, and `Development`.
5. Redeploy the site.

## 4. Connect checkout

The DRIFT detail screen and persistent bag are already designed. The server-side Shopify request helper is prepared in `lib/shopify.js`, and the checkout endpoint is prepared at `app/api/shopify/checkout/route.js`.

The remaining implementation step is to:

1. Add the real Shopify products and variants.
2. Match each DRIFT color button to its Shopify variant ID in `lib/shopify-products.js`.
3. Connect the deployed bag button to `/api/shopify/checkout`.
4. Redirect the shopper to the returned Shopify `checkoutUrl`.

## What Codex Needs From You

When the store is ready, provide:

1. Your Shopify store domain, such as `drift-sleep.myshopify.com`.
2. Confirmation that the private Storefront API token has been added to Vercel.
3. The final product photos saved as local image files.

Do not paste private Shopify admin credentials or payment information into chat.

