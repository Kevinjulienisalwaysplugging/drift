const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_PRIVATE_TOKEN = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const SHOPIFY_STOREFRONT_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2026-04";

export const isShopifyConfigured = Boolean(SHOPIFY_DOMAIN && SHOPIFY_STOREFRONT_PRIVATE_TOKEN);

const normalizeShopifyDomain = (domain) =>
  String(domain || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "");

export const getShopifyStorefrontUrl = () =>
  `https://${normalizeShopifyDomain(SHOPIFY_DOMAIN)}/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;

const describeFetchError = (error) => {
  const cause = error?.cause;
  return [error?.message, cause?.code, cause?.message].filter(Boolean).join(" | ");
};

export async function shopifyFetch({ query, variables = {}, cache = "no-store" }) {
  if (!isShopifyConfigured) {
    throw new Error("Shopify is not configured yet.");
  }

  const url = getShopifyStorefrontUrl();
  console.info("[DRIFT Shopify] Calling Storefront API", { url });
  let response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": SHOPIFY_STOREFRONT_PRIVATE_TOKEN
      },
      body: JSON.stringify({ query, variables }),
      cache
    });
  } catch (error) {
    const details = describeFetchError(error);
    console.error("[DRIFT Shopify] Network fetch failed", { url, details, cause: error?.cause });
    throw new Error(`Unable to reach Shopify Storefront API at ${url}. ${details}`);
  }

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
