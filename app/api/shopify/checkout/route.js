import { NextResponse } from "next/server";
import { isShopifyConfigured, shopifyFetch } from "../../../../lib/shopify.js";
import { getVariantAudit } from "../../../../lib/shopify-catalog.js";
import { getCartLines } from "../../../../lib/shopify-cart.js";

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

export async function POST(request) {
  if (!isShopifyConfigured) {
    return NextResponse.json({ error: "Shopify is not configured yet." }, { status: 503 });
  }

  try {
    const { items } = await request.json();
    console.info("[DRIFT Shopify] Checkout requested", {
      items: Array.isArray(items) ? items.map(({ product, color, quantity }) => ({ product, color, quantity })) : items
    });
    const audit = await getVariantAudit();
    const lines = getCartLines(items, audit.variantIds);
    const data = await shopifyFetch({
      query: CART_CREATE_MUTATION,
      variables: { input: { lines } }
    });
    const result = data.cartCreate;

    if (result.userErrors.length > 0) {
      console.error("[DRIFT Shopify] cartCreate user error", result.userErrors);
      return NextResponse.json({ error: result.userErrors[0].message }, { status: 400 });
    }

    console.info("[DRIFT Shopify] Checkout created", { cartId: result.cart.id });
    return NextResponse.json({
      cartId: result.cart.id,
      checkoutUrl: result.cart.checkoutUrl
    });
  } catch (error) {
    console.error("[DRIFT Shopify] Checkout failed", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
