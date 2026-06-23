import { NextResponse } from "next/server";
import { createSupabaseAuthClient, isAuthConfigured, setAuthCookies, serializeUser, validateEmail } from "../../../../lib/auth-session";

const cleanName = (value) => String(value || "").trim().replace(/\s+/g, " ");

export async function POST(request) {
  if (!isAuthConfigured) {
    return NextResponse.json({ error: "Account signup is not configured yet." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const name = cleanName(body.name);
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!name) {
    return NextResponse.json({ error: "Add your name to create an account." }, { status: 400 });
  }

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const supabase = createSupabaseAuthClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        name,
        first_name: name.split(" ")[0],
      },
    },
  });

  if (error) {
    const message = error.message.toLowerCase().includes("already")
      ? "An account with this email already exists. Log in instead."
      : error.message;
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    return NextResponse.json(
      { error: "An account with this email already exists. Log in instead." },
      { status: 409 }
    );
  }

  if (data.session) {
    await setAuthCookies(data.session);
  }

  return NextResponse.json({
    user: serializeUser(data.user),
    requiresEmailConfirmation: !data.session,
    message: data.session
      ? "Your DRIFT account is ready."
      : "Check your email to confirm your DRIFT account before logging in.",
  });
}
