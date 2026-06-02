const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_PRIVATE_TOKEN = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const SHOPIFY_STOREFRONT_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2026-04";

export const isShopifyConfigured = Boolean(SHOPIFY_DOMAIN && SHOPIFY_STOREFRONT_PRIVATE_TOKEN);

export async function shopifyFetch({ query, variables = {}, cache = "no-store" }) {
  if (!isShopifyConfigured) {
    throw new Error("Shopify is not configured yet.");
  }

  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": SHOPIFY_STOREFRONT_PRIVATE_TOKEN
    },
    body: JSON.stringify({ query, variables }),
    cache
  });

  const body = await response.json();

  if (!response.ok || body.errors) {
    console.error("[DRIFT Shopify] Storefront API request failed", {
      status: response.status,
      errors: body.errors || body
    });
    throw new Error("Shopify Storefront API request failed.");
  }

  return body.data;
}
