import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createReviewsClient, isReviewsConfigured, reviewPhotoBucket, sanitizeText } from "../../../../lib/reviews";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxBytes = 4 * 1024 * 1024;

export async function POST(request) {
  if (!isReviewsConfigured) {
    return NextResponse.json({ error: "Review photo storage is not configured yet." }, { status: 503 });
  }

  const formData = await request.formData();
  const productName = sanitizeText(formData.get("productName"), 120);
  const files = formData.getAll("photos").filter((file) => file && typeof file.arrayBuffer === "function").slice(0, 6);

  if (!productName) {
    return NextResponse.json({ error: "Product is required." }, { status: 400 });
  }

  if (!files.length) {
    return NextResponse.json({ photos: [] });
  }

  const supabase = createReviewsClient();
  const photos = [];

  for (const file of files) {
    if (!allowedTypes.has(file.type)) {
      return NextResponse.json({ error: "Photos must be JPG, PNG, or WebP." }, { status: 400 });
    }

    if (file.size > maxBytes) {
      return NextResponse.json({ error: "Each photo must be under 4MB." }, { status: 400 });
    }

    const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const safeProduct = productName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const path = `${safeProduct}/${crypto.randomUUID()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage.from(reviewPhotoBucket).upload(path, buffer, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false,
    });

    if (error) {
      return NextResponse.json({ error: "Unable to upload review photo." }, { status: 500 });
    }

    const { data } = supabase.storage.from(reviewPhotoBucket).getPublicUrl(path);
    photos.push({
      url: data.publicUrl,
      alt: `${productName} customer photo`,
      width: null,
      height: null,
    });
  }

  return NextResponse.json({ photos });
}
