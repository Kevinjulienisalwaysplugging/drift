export function getCartLines(items, variantIds) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Your bag is empty.");
  }

  return items.map((item) => {
    const merchandiseId = variantIds[item.product]?.[item.color];
    const quantity = Number(item.quantity);

    if (!merchandiseId) {
      throw new Error(`Shopify checkout is missing ${item.product} in ${item.color}.`);
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new Error(`Invalid quantity for ${item.product}.`);
    }

    return { merchandiseId, quantity };
  });
}

