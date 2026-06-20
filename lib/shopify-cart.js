export function getCartLines(items, variantIds) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Your bag is empty.");
  }

  return items.map((item) => {
    const selectedOptions = [item.color, item.size].filter(Boolean).join(" / ");
    const merchandiseId = variantIds[item.product]?.[item.variantKey] || variantIds[item.product]?.[selectedOptions] || variantIds[item.product]?.[item.color];
    const quantity = Number(item.quantity);

    if (!merchandiseId) {
      throw new Error(`Shopify checkout is missing ${item.product} in ${selectedOptions || item.color}.`);
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new Error(`Invalid quantity for ${item.product}.`);
    }

    return { merchandiseId, quantity };
  });
}
