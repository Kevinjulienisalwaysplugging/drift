import { shopifyProducts } from "./shopify-products.js";
import { shopifyFetch } from "./shopify.js";

const PRODUCTS_QUERY = `
  query driftProducts {
    products(first: 100) {
      nodes {
        title
        variants(first: 100) {
          nodes {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

const normalize = (value) => String(value || "").trim().toLowerCase();

const getVariantColor = (variant) => {
  const colorOption = variant.selectedOptions.find((option) => normalize(option.name) === "color");
  return colorOption?.value || (variant.selectedOptions.length === 1 ? variant.selectedOptions[0].value : "");
};

export async function getShopifyCatalog() {
  const data = await shopifyFetch({ query: PRODUCTS_QUERY, cache: "no-store" });
  return data.products.nodes;
}

export function buildVariantAudit(shopifyCatalog) {
  const shopifyByProduct = new Map(shopifyCatalog.map((product) => [normalize(product.title), product]));
  const variantIds = {};
  const missingProducts = [];
  const missingSiteColors = [];
  const extraShopifyColors = [];

  shopifyProducts.forEach((siteProduct) => {
    const shopifyProduct = shopifyByProduct.get(normalize(siteProduct.name));
    variantIds[siteProduct.name] = {};

    if (!shopifyProduct) {
      missingProducts.push(siteProduct.name);
      return;
    }

    const shopifyColors = new Map();

    shopifyProduct.variants.nodes.forEach((variant) => {
      const color = getVariantColor(variant);
      if (color) {
        shopifyColors.set(normalize(color), { color, id: variant.id, availableForSale: variant.availableForSale });
      }
    });

    siteProduct.colorways.forEach((siteColor) => {
      const shopifyVariant = shopifyColors.get(normalize(siteColor));
      if (!shopifyVariant) {
        missingSiteColors.push({ product: siteProduct.name, color: siteColor });
        return;
      }

      variantIds[siteProduct.name][siteColor] = shopifyVariant.id;
    });

    const siteColors = new Set(siteProduct.colorways.map(normalize));
    shopifyColors.forEach(({ color }) => {
      if (!siteColors.has(normalize(color))) {
        extraShopifyColors.push({ product: siteProduct.name, color });
      }
    });
  });

  return { variantIds, missingProducts, missingSiteColors, extraShopifyColors };
}

export async function getVariantAudit() {
  return buildVariantAudit(await getShopifyCatalog());
}
