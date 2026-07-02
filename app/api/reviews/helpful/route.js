import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../lib/auth-session";
import { createReviewsWriteClient, emailHash, isReviewsWriteConfigured, sanitizeText } from "../../../../lib/reviews";

export async function POST(request) {
  const { user } = await getAuthSession();
  const body = await request.json();
  const reviewId = sanitizeText(body.reviewId, 80);
  const anonymousKey = sanitizeText(body.voterKey, 160);

  if (!reviewId) {
    return NextResponse.json({ error: "Review is required." }, { status: 400 });
  }

  if (!isReviewsWriteConfigured) {
    return NextResponse.json({ error: "Reviews database is not configured yet." }, { status: 503 });
  }

  const voterHash = user?.email ? emailHash(user.email) : emailHash(anonymousKey);

  if (!voterHash || voterHash === emailHash("")) {
    return NextResponse.json({ error: "Unable to record vote." }, { status: 400 });
  }

  const supabase = createReviewsWriteClient();
  const { error } = await supabase.from("drift_review_helpful_votes").insert({
    review_id: reviewId,
    user_id: user?.id || null,
    voter_hash: voterHash,
  });

  if (error) {
    return NextResponse.json({ error: "You already marked this review as helpful." }, { status: 409 });
  }

  const { data: review } = await supabase.from("drift_reviews").select("helpful_count").eq("id", reviewId).single();
  const helpfulCount = Number(review?.helpful_count || 0) + 1;
  await supabase.from("drift_reviews").update({ helpful_count: helpfulCount }).eq("id", reviewId);

  return NextResponse.json({ helpfulCount });
}
