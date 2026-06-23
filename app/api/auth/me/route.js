import { NextResponse } from "next/server";
import { getAuthSession, isAuthConfigured, serializeUser } from "../../../../lib/auth-session";

export async function GET() {
  if (!isAuthConfigured) {
    return NextResponse.json({ user: null, configured: false });
  }

  const { user } = await getAuthSession();
  return NextResponse.json({ user: serializeUser(user), configured: true });
}
