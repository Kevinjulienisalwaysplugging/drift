"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function ResetPasswordClient() {
  const [client, setClient] = useState(null);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Checking your reset link...");

  useEffect(() => {
    const prepareReset = async () => {
      if (!supabaseUrl || !supabaseAnonKey) {
        setMessage("Password reset is not configured yet.");
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: false,
          detectSessionInUrl: true,
        },
      });

      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");

      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }

      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setMessage("This reset link is missing or expired. Request a new password reset from the login popup.");
        return;
      }

      setClient(supabase);
      setReady(true);
      setMessage("Enter a new password for your DRIFT account.");
    };

    prepareReset();
  }, []);

  const savePassword = async (event) => {
    event.preventDefault();

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    setMessage("Updating password...");
    const { data, error } = await client.auth.updateUser({ password });

    if (error) {
      setMessage("Unable to update your password. Request a new reset link and try again.");
      return;
    }

    const { data: sessionData } = await client.auth.getSession();

    if (sessionData.session) {
      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: sessionData.session.access_token,
          refreshToken: sessionData.session.refresh_token,
        }),
      });
    }

    setMessage("Password updated. Redirecting to your profile...");
    window.setTimeout(() => {
      window.location.href = "/account";
    }, 900);
  };

  return (
    <section className="account-card">
      <h2>Set a new password</h2>
      <form className="account-form" onSubmit={savePassword}>
        <label htmlFor="reset-password">New password</label>
        <input
          id="reset-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          minLength={8}
          disabled={!ready}
          required
        />
        <button className="legal-button" type="submit" disabled={!ready}>
          Save password
        </button>
        <p>{message}</p>
      </form>
    </section>
  );
}
