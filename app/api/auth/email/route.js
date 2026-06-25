import { NextResponse } from "next/server";
import { createSupabaseAuthClient, getAuthSession, serializeUser, validateEmail } from "../../../../lib/auth-session";

export async function PATCH(request) {
  const { user, session } = await getAuthSession();

  if (!user || !session?.access_token || !session?.refresh_token) {
    return NextResponse.json({ error: "Log in before changing your email." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (email === user.email) {
    return NextResponse.json({ error: "This is already your DRIFT account email." }, { status: 400 });
  }

  const supabase = createSupabaseAuthClient();
  await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });

  const { data, error } = await supabase.auth.updateUser({ email });

  if (error) {
    return NextResponse.json({ error: "Unable to change your email right now." }, { status: 400 });
  }

  return NextResponse.json({
    user: serializeUser(data.user),
    message: "Check your new email address to confirm this change.",
  });
}
