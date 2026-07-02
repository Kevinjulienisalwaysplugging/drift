import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../lib/auth-session";
import { createReviewsWriteClient, isReviewsWriteConfigured, sanitizeText } from "../../../../lib/reviews";

function isAdmin(user) {
  const admins = String(process.env.DRIFT_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return Boolean(user?.email && admins.includes(user.email.toLowerCase()));
}

export async function PATCH(request, { params }) {
  const { user } = await getAuthSession();

  if (!isAdmin(user)) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  if (!isReviewsWriteConfigured) {
    return NextResponse.json({ error: "Reviews database is not configured yet." }, { status: 503 });
  }

  const body = await request.json();
  const updates = {};

  if (body.title !== undefined) updates.title = sanitizeText(body.title, 120);
  if (body.body !== undefined) updates.body = sanitizeText(body.body, 1500);
  if (body.rating !== undefined) updates.rating = Math.min(5, Math.max(1, Number(body.rating)));
  if (body.verifiedBuyer !== undefined) updates.verified_buyer = Boolean(body.verifiedBuyer);

  const supabase = createReviewsWriteClient();
  const { data, error } = await supabase.from("drift_reviews").update(updates).eq("id", params.id).select("*").single();

  if (error) {
    return NextResponse.json({ error: "Unable to update review." }, { status: 500 });
  }

  return NextResponse.json({ review: data });
}

export async function DELETE(_request, { params }) {
  const { user } = await getAuthSession();

  if (!isAdmin(user)) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  if (!isReviewsWriteConfigured) {
    return NextResponse.json({ error: "Reviews database is not configured yet." }, { status: 503 });
  }

  const supabase = createReviewsWriteClient();
  await supabase.from("drift_review_photos").delete().eq("review_id", params.id);
  await supabase.from("drift_review_helpful_votes").delete().eq("review_id", params.id);
  const { error } = await supabase.from("drift_reviews").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: "Unable to delete review." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
