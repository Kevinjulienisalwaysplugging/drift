import { NextResponse } from "next/server";
import { createSupabaseAuthClient, getAuthSession, isAuthConfigured, validateEmail } from "../../../../lib/auth-session";

export async function POST(request) {
  if (!isAuthConfigured) {
    return NextResponse.json({ error: "Password reset is not configured yet." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const supabase = createSupabaseAuthClient();
  const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/account/reset-password`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    return NextResponse.json({ error: "Unable to send a reset link right now." }, { status: 400 });
  }

  return NextResponse.json({
    message: "If a DRIFT account exists for that email, a password reset link has been sent.",
  });
}

export async function PATCH(request) {
  const { user, session } = await getAuthSession();

  if (!user || !session?.access_token || !session?.refresh_token) {
    return NextResponse.json({ error: "Log in before changing your password." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const password = String(body.password || "");

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const supabase = createSupabaseAuthClient();
  await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return NextResponse.json({ error: "Unable to change your password right now." }, { status: 400 });
  }

  return NextResponse.json({ message: "Password updated." });
}
