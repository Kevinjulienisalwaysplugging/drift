import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../lib/auth-session";

export async function GET() {
  const { user } = await getAuthSession();

  if (!user) {
    return NextResponse.json({ error: "Log in to view your DRIFT orders." }, { status: 401 });
  }

  return NextResponse.json({
    orders: [],
    source: "shopify-unconnected",
    message:
      "No orders are connected yet. Shopify checkout is working, but customer order history needs Shopify Customer Account API or Admin API access.",
  });
}
