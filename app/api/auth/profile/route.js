import { NextResponse } from "next/server";
import { createSupabaseAuthClient, getAuthSession, serializeUser } from "../../../../lib/auth-session";

const cleanName = (value) => String(value || "").trim().replace(/\s+/g, " ");

export async function GET() {
  const { user } = await getAuthSession();

  if (!user) {
    return NextResponse.json({ error: "Log in to view your DRIFT profile." }, { status: 401 });
  }

  return NextResponse.json({ user: serializeUser(user) });
}

export async function PATCH(request) {
  const { user, session } = await getAuthSession();

  if (!user || !session?.access_token || !session?.refresh_token) {
    return NextResponse.json({ error: "Log in to update your DRIFT profile." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const name = cleanName(body.name);

  if (!name) {
    return NextResponse.json({ error: "Add a name before saving your profile." }, { status: 400 });
  }

  const supabase = createSupabaseAuthClient();
  await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });

  const { data, error } = await supabase.auth.updateUser({
    data: {
      full_name: name,
      name,
      first_name: name.split(" ")[0],
    },
  });

  if (error) {
    return NextResponse.json({ error: "Unable to save your profile right now." }, { status: 400 });
  }

  return NextResponse.json({ user: serializeUser(data.user) });
}
