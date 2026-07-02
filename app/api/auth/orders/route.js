import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../lib/auth-session";

const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const shopDomain = process.env.SHOPIFY_STORE_DOMAIN;
const apiVersion = process.env.SHOPIFY_ADMIN_API_VERSION || process.env.SHOPIFY_STOREFRONT_API_VERSION || "2026-04";

const ORDERS_QUERY = `
  query customerOrders($query: String!) {
    customers(first: 1, query: $query) {
      nodes {
        orders(first: 10, sortKey: CREATED_AT, reverse: true) {
          nodes {
            id
            name
            createdAt
            displayFulfillmentStatus
            totalPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            fulfillments(first: 5) {
              trackingInfo {
                url
              }
            }
            lineItems(first: 20) {
              nodes {
                name
                quantity
                variantTitle
                originalUnitPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

const formatMoney = (money) => {
  if (!money?.amount) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode || "USD",
  }).format(Number(money.amount));
};

async function fetchShopifyOrders(email) {
  if (!adminToken || !shopDomain) {
    return null;
  }

  const response = await fetch(`https://${shopDomain}/admin/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminToken,
    },
    body: JSON.stringify({
      query: ORDERS_QUERY,
      variables: { query: `email:${email}` },
    }),
    cache: "no-store",
  });

  const payload = await response.json();

  if (!response.ok || payload.errors) {
    throw new Error("Unable to load Shopify orders.");
  }

  return payload.data.customers.nodes[0]?.orders.nodes || [];
}

export async function GET() {
  const { user } = await getAuthSession();

  if (!user) {
    return NextResponse.json({ error: "Log in to view your DRIFT orders." }, { status: 401 });
  }

  try {
    const shopifyOrders = await fetchShopifyOrders(user.email);

    if (shopifyOrders) {
      return NextResponse.json({
        orders: shopifyOrders.map((order) => ({
          id: order.id,
          number: order.name,
          date: new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(order.createdAt)),
          status: order.displayFulfillmentStatus || "Processing",
          total: formatMoney(order.totalPriceSet?.shopMoney),
          trackingUrl: order.fulfillments?.[0]?.trackingInfo?.[0]?.url || "",
          items: order.lineItems.nodes.map((item) => ({
            name: item.name,
            variant: item.variantTitle || "Standard",
            quantity: item.quantity,
            price: formatMoney(item.originalUnitPriceSet?.shopMoney),
            image: item.image?.url || "",
            imageAlt: item.image?.altText || item.name,
          })),
        })),
        source: "shopify-admin",
        message: "",
      });
    }
  } catch (error) {
    return NextResponse.json({
      orders: [],
      source: "shopify-admin-error",
      message: "We could not load Shopify orders right now. Please try again later.",
    });
  }

  return NextResponse.json({
    orders: [],
    source: "shopify-unconnected",
    message:
      "No orders are connected yet. Shopify checkout is working, but customer order history needs Shopify Admin API access.",
  });
}
