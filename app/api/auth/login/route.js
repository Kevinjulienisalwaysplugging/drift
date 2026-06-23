import { NextResponse } from "next/server";
import { createSupabaseAuthClient, isAuthConfigured, setAuthCookies, serializeUser, validateEmail } from "../../../../lib/auth-session";

export async function POST(request) {
  if (!isAuthConfigured) {
    return NextResponse.json({ error: "Account login is not configured yet." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Enter the email you used for your DRIFT account." }, { status: 400 });
  }

  if (!password) {
    return NextResponse.json({ error: "Enter your password to log in." }, { status: 400 });
  }

  const supabase = createSupabaseAuthClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session || !data.user) {
    return NextResponse.json(
      { error: "We could not log you in. Check your email and password, then try again." },
      { status: 401 }
    );
  }

  await setAuthCookies(data.session);

  return NextResponse.json({
    user: serializeUser(data.user),
    message: "You are signed in to DRIFT.",
  });
}
