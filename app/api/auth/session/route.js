import { NextResponse } from "next/server";
import { createSupabaseAuthClient, isAuthConfigured, serializeUser, setAuthCookies } from "../../../../lib/auth-session";

export async function POST(request) {
  if (!isAuthConfigured) {
    return NextResponse.json({ error: "DRIFT accounts are not configured yet." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const accessToken = String(body.accessToken || "");
  const refreshToken = String(body.refreshToken || "");

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Missing session tokens." }, { status: 400 });
  }

  const supabase = createSupabaseAuthClient();
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    return NextResponse.json({ error: "Unable to verify your DRIFT session." }, { status: 401 });
  }

  await setAuthCookies({
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: 60 * 60,
  });

  return NextResponse.json({ user: serializeUser(data.user) });
}
