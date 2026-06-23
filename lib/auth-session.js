import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const accessCookieName = "drift_auth_access";
const refreshCookieName = "drift_auth_refresh";

export const authCookieNames = {
  access: accessCookieName,
  refresh: refreshCookieName,
};

export const isAuthConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export function createSupabaseAuthClient() {
  if (!isAuthConfigured) {
    throw new Error("Supabase Auth is not configured.");
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export async function setAuthCookies(session) {
  const cookieStore = await cookies();

  cookieStore.set(accessCookieName, session.access_token, {
    ...cookieOptions,
    maxAge: session.expires_in || 60 * 60,
  });

  if (session.refresh_token) {
    cookieStore.set(refreshCookieName, session.refresh_token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 30,
    });
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(accessCookieName);
  cookieStore.delete(refreshCookieName);
}

export function getProfileName(user) {
  const metadata = user?.user_metadata || {};
  return metadata.full_name || metadata.name || metadata.first_name || "";
}

export function serializeUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: getProfileName(user),
    createdAt: user.created_at || null,
    lastSignInAt: user.last_sign_in_at || null,
  };
}

export async function getAuthSession() {
  if (!isAuthConfigured) {
    return { user: null, session: null, error: "Supabase Auth is not configured." };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(accessCookieName)?.value;
  const refreshToken = cookieStore.get(refreshCookieName)?.value;

  if (!accessToken && !refreshToken) {
    return { user: null, session: null, error: null };
  }

  const supabase = createSupabaseAuthClient();

  if (accessToken) {
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (!error && data.user) {
      return {
        user: data.user,
        session: { access_token: accessToken, refresh_token: refreshToken },
        error: null,
      };
    }
  }

  if (!refreshToken) {
    await clearAuthCookies();
    return { user: null, session: null, error: null };
  }

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (error || !data.session || !data.user) {
    await clearAuthCookies();
    return { user: null, session: null, error: null };
  }

  await setAuthCookies(data.session);
  return { user: data.user, session: data.session, error: null };
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
