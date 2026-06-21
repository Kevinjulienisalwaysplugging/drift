// Edit displayed DRIFT product prices here for server/static product data.
// Shopify checkout prices still come from Shopify and are not overridden by this file.
export const productPricing = {
  "Satin Pillowcase": { marketPrice: "$19.99", salePrice: "$12.99" },
  "Satin Eyemask": { marketPrice: "$14.99", salePrice: "$9.99" },
  "Satin Scrunchie": { marketPrice: "$7.99", salePrice: "$4.99" },
  "Satin Bonnet": { marketPrice: "$17.99", salePrice: "$13.99" },
  "Satin Twin Bedding Set": "$30.99",
  "Satin Full Bedding Set": "$49.99",
  "Satin Queen Bedding Set": "$69.99",
  "Satin King Bedding Set": "$75.99",
  "Satin Blanket": "$89.99",
  "Luxury Slippers": { marketPrice: "$34.99", salePrice: "$29.99" },
  "Satin Nightgown": { marketPrice: "$44.99", salePrice: "$32.99" },
  "The Nightstand Essentials Trio": "$39.99",
  "The Ultimate Hair Care Duo": "$19.99",
  "The Beauty Sleep Bundle": "$44.99",
  "The College / Dorm Starter": "$64.99"
};

export const getSalePrice = (value) => (typeof value === "string" ? value : value.salePrice);

export const productPrices = Object.fromEntries(
  Object.entries(productPricing).map(([product, value]) => [product, getSalePrice(value)])
);
