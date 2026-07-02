import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const shopDomain = process.env.SHOPIFY_STORE_DOMAIN;
const shopifyAdminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const shopifyApiVersion = process.env.SHOPIFY_ADMIN_API_VERSION || process.env.SHOPIFY_STOREFRONT_API_VERSION || "2026-04";

export const isReviewsConfigured = Boolean(supabaseUrl && (supabaseServiceKey || supabaseAnonKey));
export const reviewPhotoBucket = process.env.SUPABASE_REVIEW_PHOTOS_BUCKET || "review-photos";

export function createReviewsClient() {
  if (!isReviewsConfigured) {
    throw new Error("DRIFT reviews are not configured.");
  }

  return createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function sanitizeText(value, maxLength = 500) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function validateReviewInput(input) {
  const rating = Number(input.rating);
  const errors = [];

  if (!sanitizeText(input.productName, 120)) errors.push("Product is required.");
  if (!sanitizeText(input.name, 90)) errors.push("Name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(input.email || ""))) errors.push("A valid email is required.");
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.push("Choose a star rating.");
  if (!sanitizeText(input.title, 120)) errors.push("Review title is required.");
  if (sanitizeText(input.body, 1500).length < 12) errors.push("Review body must be at least 12 characters.");
  if (!sanitizeText(input.country, 60)) errors.push("Country is required.");
  if (input.website) errors.push("Review rejected.");

  return errors;
}

export function emailHash(email) {
  return crypto.createHash("sha256").update(String(email || "").trim().toLowerCase()).digest("hex");
}

export function displayNameFromName(name) {
  const parts = sanitizeText(name, 90).split(" ").filter(Boolean);

  if (parts.length === 0) return "DRIFT Customer";
  if (parts.length === 1) return parts[0];

  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

export function countryLabel(country) {
  const normalized = sanitizeText(country, 60).toLowerCase();
  const countries = {
    us: { flag: "🇺🇸", name: "United States" },
    usa: { flag: "🇺🇸", name: "United States" },
    "united states": { flag: "🇺🇸", name: "United States" },
    ca: { flag: "🇨🇦", name: "Canada" },
    canada: { flag: "🇨🇦", name: "Canada" },
    uk: { flag: "🇬🇧", name: "United Kingdom" },
    gb: { flag: "🇬🇧", name: "United Kingdom" },
    "united kingdom": { flag: "🇬🇧", name: "United Kingdom" },
  };

  return countries[normalized] || { flag: "", name: sanitizeText(country, 60) || "United States" };
}

export function serializeReview(review) {
  const country = countryLabel(review.country);

  return {
    id: review.id,
    productName: review.product_name,
    displayName: review.display_name,
    rating: review.rating,
    title: review.title,
    body: review.body,
    country: country.name,
    countryFlag: country.flag,
    verifiedBuyer: Boolean(review.verified_buyer),
    helpfulCount: review.helpful_count || 0,
    photos: review.photos || [],
    createdAt: review.created_at,
  };
}

export function calculateSummary(reviews = []) {
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  reviews.forEach((review) => {
    const rating = Number(review.rating);
    if (breakdown[rating] !== undefined) breakdown[rating] += 1;
  });

  const count = reviews.length;
  const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);

  return {
    average: count ? Number((total / count).toFixed(1)) : 0,
    count,
    breakdown,
  };
}

export async function verifyShopifyBuyer(email, productName) {
  if (!shopDomain || !shopifyAdminToken || !email || !productName) {
    return false;
  }

  const query = `
    query ReviewBuyerCheck($query: String!) {
      customers(first: 1, query: $query) {
        nodes {
          orders(first: 25, sortKey: CREATED_AT, reverse: true) {
            nodes {
              lineItems(first: 50) {
                nodes {
                  name
                  title
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${shopDomain}/admin/api/${shopifyApiVersion}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": shopifyAdminToken,
      },
      body: JSON.stringify({ query, variables: { query: `email:${email}` } }),
      cache: "no-store",
    });
    const payload = await response.json();
    const orders = payload?.data?.customers?.nodes?.[0]?.orders?.nodes || [];
    const needle = productName.toLowerCase();

    return orders.some((order) =>
      order.lineItems.nodes.some((item) => `${item.name || ""} ${item.title || ""}`.toLowerCase().includes(needle))
    );
  } catch {
    return false;
  }
}

