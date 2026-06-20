import { shopifyProducts } from "./shopify-products.js";
import { shopifyFetch } from "./shopify.js";

const PRODUCTS_QUERY = `
  query driftProducts {
    products(first: 100) {
      nodes {
        title
        handle
        featuredImage {
          url
          altText
        }
        options {
          name
          values
        }
        variants(first: 100) {
          nodes {
            id
            title
            availableForSale
            image {
              url
              altText
            }
            price {
              amount
              currencyCode
            }
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

const optionValue = (variant, optionName) =>
  variant.selectedOptions.find((option) => normalize(option.name) === optionName)?.value || "";

const variantColor = (variant) => {
  const color = optionValue(variant, "color");
  if (color) return color;
  return variant.selectedOptions.length === 1 ? variant.selectedOptions[0].value : "Default Title";
};

const variantSize = (variant) => optionValue(variant, "size");

export const variantKey = ({ color, size }) => [color || "Default Title", size].filter(Boolean).join(" / ");

const expectedVariantKeys = (siteProduct) => {
  const colors = siteProduct.colorways?.length ? siteProduct.colorways : ["Default Title"];
  const sizes = siteProduct.sizes || [];

  if (sizes.length === 0) {
    return colors.map((color) => ({ color, size: "", key: variantKey({ color }) }));
  }

  return colors.flatMap((color) =>
    sizes.map((size) => ({
      color,
      size,
      key: variantKey({ color, size })
    }))
  );
};

const shopifyProductNames = (siteProduct) => [siteProduct.name, ...(siteProduct.shopifyTitleAliases || [])];

const productLookupKeys = (siteProduct) => shopifyProductNames(siteProduct).map(normalize);

const moneyLabel = (price) => {
  if (!price?.amount) return "";
  const value = Number(price.amount);
  if (!Number.isFinite(value)) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode || "USD"
  }).format(value);
};

export async function getShopifyCatalog() {
  const data = await shopifyFetch({ query: PRODUCTS_QUERY, cache: "no-store" });
  return data.products.nodes;
}

export function buildVariantAudit(shopifyCatalog) {
  const shopifyByProduct = new Map(shopifyCatalog.map((product) => [normalize(product.title), product]));
  const variantIds = {};
  const products = {};
  const missingProducts = [];
  const missingSiteVariants = [];
  const missingSiteColors = [];
  const missingSiteSizes = [];
  const extraShopifyVariants = [];
  const extraShopifyColors = [];
  const titleMappings = [];

  shopifyProducts.forEach((siteProduct) => {
    const shopifyProduct = productLookupKeys(siteProduct)
      .map((key) => shopifyByProduct.get(key))
      .find(Boolean);
    variantIds[siteProduct.name] = {};

    if (!shopifyProduct) {
      missingProducts.push({
        product: siteProduct.name,
        expectedTitles: shopifyProductNames(siteProduct)
      });
      return;
    }

    if (shopifyProduct.title !== siteProduct.name) {
      titleMappings.push({
        siteProduct: siteProduct.name,
        shopifyProduct: shopifyProduct.title
      });
    }

    const shopifyVariants = new Map();
    const shopifyColors = new Set();
    const shopifySizes = new Set();

    shopifyProduct.variants.nodes.forEach((variant) => {
      const color = variantColor(variant);
      const size = variantSize(variant);
      const key = variantKey({ color, size });
      shopifyColors.add(color);
      if (size) shopifySizes.add(size);
      shopifyVariants.set(normalize(key), {
        key,
        color,
        size,
        id: variant.id,
        title: variant.title,
        availableForSale: variant.availableForSale,
        price: moneyLabel(variant.price),
        image: variant.image?.url || shopifyProduct.featuredImage?.url || "",
        imageAlt: variant.image?.altText || shopifyProduct.featuredImage?.altText || ""
      });
    });

    products[siteProduct.name] = {
      shopifyTitle: shopifyProduct.title,
      handle: shopifyProduct.handle,
      image: shopifyProduct.featuredImage?.url || "",
      imageAlt: shopifyProduct.featuredImage?.altText || "",
      colors: Array.from(shopifyColors),
      sizes: Array.from(shopifySizes),
      variants: Array.from(shopifyVariants.values())
    };

    expectedVariantKeys(siteProduct).forEach((expected) => {
      const shopifyVariant = shopifyVariants.get(normalize(expected.key));

      if (!shopifyVariant) {
        missingSiteVariants.push({
          product: siteProduct.name,
          color: expected.color,
          size: expected.size,
          variant: expected.key
        });
        if (!Array.from(shopifyColors).map(normalize).includes(normalize(expected.color))) {
          missingSiteColors.push({ product: siteProduct.name, color: expected.color });
        }
        if (expected.size && !Array.from(shopifySizes).map(normalize).includes(normalize(expected.size))) {
          missingSiteSizes.push({ product: siteProduct.name, size: expected.size });
        }
        return;
      }

      variantIds[siteProduct.name][expected.key] = shopifyVariant.id;
      if (!expected.size) {
        variantIds[siteProduct.name][expected.color] = shopifyVariant.id;
      }
    });

    const expectedKeys = new Set(expectedVariantKeys(siteProduct).map(({ key }) => normalize(key)));
    shopifyVariants.forEach((variant) => {
      if (!expectedKeys.has(normalize(variant.key))) {
        extraShopifyVariants.push({
          product: siteProduct.name,
          color: variant.color,
          size: variant.size,
          variant: variant.key
        });
        if (!siteProduct.colorways.map(normalize).includes(normalize(variant.color))) {
          extraShopifyColors.push({ product: siteProduct.name, color: variant.color });
        }
      }
    });
  });

  return {
    variantIds,
    products,
    missingProducts,
    missingSiteColors,
    missingSiteSizes,
    missingSiteVariants,
    extraShopifyColors,
    extraShopifyVariants,
    titleMappings
  };
}

export async function getVariantAudit() {
  return buildVariantAudit(await getShopifyCatalog());
}
