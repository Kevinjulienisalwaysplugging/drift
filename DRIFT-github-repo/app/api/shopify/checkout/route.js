import { NextResponse } from "next/server";
import { shopifyProducts } from "../../../../lib/shopify-products";
import { isShopifyConfigured, shopifyFetch } from "../../../../lib/shopify";

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const productsByName = new Map(shopifyProducts.map((product) => [product.name, product]));

function getCartLines(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Your bag is empty.");
  }

  return items.map((item) => {
    const product = productsByName.get(item.product);
    const merchandiseId = product?.shopifyVariants?.[item.color];
    const quantity = Number(item.quantity);

    if (!product || !merchandiseId) {
      throw new Error(`Shopify variant mapping is missing for ${item.product} in ${item.color}.`);
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new Error(`Invalid quantity for ${item.product}.`);
    }

    return { merchandiseId, quantity };
  });
}

export async function POST(request) {
  if (!isShopifyConfigured) {
    return NextResponse.json({ error: "Shopify is not configured yet." }, { status: 503 });
  }

  try {
    const { items } = await request.json();
    const lines = getCartLines(items);
    const data = await shopifyFetch({
      query: CART_CREATE_MUTATION,
      variables: { input: { lines } }
    });
    const result = data.cartCreate;

    if (result.userErrors.length > 0) {
      return NextResponse.json({ error: result.userErrors[0].message }, { status: 400 });
    }

    return NextResponse.json({
      cartId: result.cart.id,
      checkoutUrl: result.cart.checkoutUrl
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

