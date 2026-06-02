import { NextResponse } from "next/server";
import { isShopifyConfigured } from "../../../../lib/shopify.js";
import { getVariantAudit } from "../../../../lib/shopify-catalog.js"; 

export async function GET() {
  if (!isShopifyConfigured) {
    return NextResponse.json({ error: "Shopify is not configured yet." }, { status: 503 });
  }

  try {
    const audit = await getVariantAudit();
    return NextResponse.json({
      ok:
        audit.missingProducts.length === 0 &&
        audit.missingSiteColors.length === 0 &&
        audit.extraShopifyColors.length === 0,
      ...audit
    });
  } catch (error) {
    console.error("[DRIFT Shopify] Catalog audit failed", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
