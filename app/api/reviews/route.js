import { NextResponse } from "next/server";
import { getAuthSession } from "../../../lib/auth-session";
import {
  calculateSummary,
  createReviewsClient,
  displayNameFromName,
  emailHash,
  isReviewsConfigured,
  sanitizeText,
  serializeReview,
  validateReviewInput,
  verifyShopifyBuyer,
} from "../../../lib/reviews";

const sortMap = {
  recent: { column: "created_at", ascending: false },
  highest: { column: "rating", ascending: false },
  lowest: { column: "rating", ascending: true },
  helpful: { column: "helpful_count", ascending: false },
  verified: { column: "verified_buyer", ascending: false },
  photos: { column: "created_at", ascending: false },
};

async function loadReviews(productName, sort = "recent", page = 1, pageSize = 8) {
  const supabase = createReviewsClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const sortConfig = sortMap[sort] || sortMap.recent;

  let baseQuery = supabase.from("drift_reviews").select("*", { count: "exact" }).eq("product_name", productName);
  let listQuery = supabase.from("drift_reviews").select("*", { count: "exact" }).eq("product_name", productName);

  if (sort === "verified") {
    listQuery = listQuery.eq("verified_buyer", true);
  }

  if (sort === "photos") {
    listQuery = listQuery.gt("photo_count", 0);
  }

  const [{ data: allReviews, error: summaryError }, { data: reviews, error, count }] = await Promise.all([
    baseQuery,
    listQuery.order(sortConfig.column, { ascending: sortConfig.ascending }).range(from, to),
  ]);

  if (summaryError || error) {
    throw new Error("Unable to load reviews.");
  }

  const reviewIds = (reviews || []).map((review) => review.id);
  const { data: photos } = reviewIds.length
    ? await supabase.from("drift_review_photos").select("*").in("review_id", reviewIds).order("created_at", { ascending: true })
    : { data: [] };

  const photosByReview = new Map();
  (photos || []).forEach((photo) => {
    const next = photosByReview.get(photo.review_id) || [];
    next.push({
      id: photo.id,
      url: photo.public_url,
      alt: photo.alt_text || "DRIFT customer photo",
      width: photo.width || null,
      height: photo.height || null,
    });
    photosByReview.set(photo.review_id, next);
  });

  return {
    reviews: (reviews || []).map((review) => serializeReview({ ...review, photos: photosByReview.get(review.id) || [] })),
    summary: calculateSummary(allReviews || []),
    pagination: {
      page,
      pageSize,
      total: count || 0,
      hasMore: count ? to + 1 < count : false,
    },
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productName = sanitizeText(searchParams.get("product"), 120);
  const sort = sanitizeText(searchParams.get("sort"), 40) || "recent";
  const page = Math.max(1, Number(searchParams.get("page") || 1));

  if (!productName) {
    return NextResponse.json({ error: "Product is required." }, { status: 400 });
  }

  if (!isReviewsConfigured) {
    return NextResponse.json({
      reviews: [],
      summary: calculateSummary([]),
      pagination: { page, pageSize: 8, total: 0, hasMore: false },
      message: "Reviews database is not configured yet.",
    });
  }

  try {
    return NextResponse.json(await loadReviews(productName, sort, page));
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to load reviews." }, { status: 500 });
  }
}

export async function POST(request) {
  const { user } = await getAuthSession();
  const body = await request.json();
  const errors = validateReviewInput(body);

  if (errors.length) {
    return NextResponse.json({ error: errors[0], errors }, { status: 400 });
  }

  if (!isReviewsConfigured) {
    return NextResponse.json({ error: "Reviews database is not configured yet." }, { status: 503 });
  }

  const productName = sanitizeText(body.productName, 120);
  const name = sanitizeText(body.name, 90);
  const email = String(body.email || user?.email || "").trim().toLowerCase();
  const verifiedBuyer = await verifyShopifyBuyer(email, productName);
  const supabase = createReviewsClient();

  const { data: review, error } = await supabase
    .from("drift_reviews")
    .insert({
      product_name: productName,
      user_id: user?.id || null,
      display_name: displayNameFromName(name),
      email_hash: emailHash(email),
      rating: Number(body.rating),
      title: sanitizeText(body.title, 120),
      body: sanitizeText(body.body, 1500),
      country: sanitizeText(body.country, 60),
      verified_buyer: verifiedBuyer,
      photo_count: Array.isArray(body.photos) ? body.photos.length : 0,
      helpful_count: 0,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: "Unable to save review." }, { status: 500 });
  }

  const photos = Array.isArray(body.photos) ? body.photos.slice(0, 6) : [];

  if (photos.length) {
    await supabase.from("drift_review_photos").insert(
      photos.map((photo) => ({
        review_id: review.id,
        product_name: productName,
        public_url: sanitizeText(photo.url, 500),
        alt_text: sanitizeText(photo.alt, 140) || `${productName} customer photo`,
        width: Number(photo.width) || null,
        height: Number(photo.height) || null,
      }))
    );
  }

  return NextResponse.json({ review: serializeReview({ ...review, photos }) }, { status: 201 });
}

