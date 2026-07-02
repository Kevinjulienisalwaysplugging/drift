"use client";

import { useEffect, useState } from "react";

const formatDate = (value) => {
  if (!value) return "Not available yet";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const initialForms = {
  profile: "",
  email: "",
  password: "",
  reset: "",
};

export default function AccountClient() {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState(initialForms);

  const setFormMessage = (key, value) => {
    setMessages((current) => ({ ...current, [key]: value }));
  };

  const loadProfile = async () => {
    const response = await fetch("/api/auth/profile", { cache: "no-store" });
    const payload = await response.json();

    if (!response.ok) {
      window.location.href = "/storefront.html";
      return;
    }

    setStatus("signed-in");
    setUser(payload.user);
    setName(payload.user?.name || "");
    setEmail(payload.user?.email || "");
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const saveProfile = async (event) => {
    event.preventDefault();
    setFormMessage("profile", "Saving your profile...");

    const response = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const payload = await response.json();

    if (!response.ok) {
      setFormMessage("profile", payload.error || "Unable to save your profile.");
      return;
    }

    setUser(payload.user);
    setName(payload.user?.name || "");
    setFormMessage("profile", "Profile saved.");
  };

  const changeEmail = async (event) => {
    event.preventDefault();
    setFormMessage("email", "Preparing email change...");

    const response = await fetch("/api/auth/email", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const payload = await response.json();

    if (!response.ok) {
      setFormMessage("email", payload.error || "Unable to change your email.");
      return;
    }

    setFormMessage("email", payload.message || "Check your new email to confirm this change.");
  };

  const changePassword = async (event) => {
    event.preventDefault();
    setFormMessage("password", "Updating password...");

    const response = await fetch("/api/auth/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const payload = await response.json();

    if (!response.ok) {
      setFormMessage("password", payload.error || "Unable to change your password.");
      return;
    }

    setPassword("");
    setFormMessage("password", payload.message || "Password updated.");
  };

  const sendResetLink = async () => {
    setFormMessage("reset", "Sending reset link...");

    const response = await fetch("/api/auth/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    });
    const payload = await response.json();

    setFormMessage("reset", payload.message || payload.error || "If an account exists, a reset link has been sent.");
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/storefront.html";
  };

  if (status === "loading") {
    return <p className="account-note">Loading your DRIFT profile...</p>;
  }

  return (
    <div className="account-dashboard">
      <section className="account-card account-card-feature">
        <div className="account-profile-hero">
          <span className="account-avatar" aria-hidden="true">
            {user.initials || "D"}
          </span>
          <div>
            <p className="eyebrow">Profile</p>
            <h2>{user.name || "DRIFT customer"}</h2>
            <p>{user.email}</p>
            <a className="account-inline-link" href="#edit-profile">
              Edit Profile
            </a>
          </div>
        </div>
      </section>

      <section className="account-card">
        <h2>Account Details</h2>
        <dl className="account-details">
          <div>
            <dt>Full name</dt>
            <dd>{user.name || "Not saved yet"}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Last login</dt>
            <dd>{formatDate(user.lastSignInAt)}</dd>
          </div>
          <div>
            <dt>Account created</dt>
            <dd>{formatDate(user.createdAt)}</dd>
          </div>
        </dl>
      </section>

      <section className="account-card account-edit-grid" id="edit-profile">
        <form className="account-form" onSubmit={saveProfile}>
          <h2>Edit Profile</h2>
          <label htmlFor="account-name">Full name</label>
          <input
            id="account-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            placeholder="Your name"
            required
          />
          <button className="legal-button" type="submit">
            Save profile
          </button>
          <p>{messages.profile}</p>
        </form>

        <form className="account-form" onSubmit={changeEmail}>
          <h2>Change Email</h2>
          <label htmlFor="account-email">Email</label>
          <input
            id="account-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
          <button className="legal-button" type="submit">
            Change email
          </button>
          <p>{messages.email}</p>
        </form>

        <form className="account-form" onSubmit={changePassword}>
          <h2>Change Password</h2>
          <label htmlFor="account-password">New password</label>
          <input
            id="account-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            minLength={8}
            required
          />
          <button className="legal-button" type="submit">
            Change password
          </button>
          <p>{messages.password}</p>
        </form>

        <div className="account-form account-reset-card">
          <h2>Password Reset</h2>
          <p>Send yourself a secure reset link if you want to change your password by email later.</p>
          <button className="account-logout" type="button" onClick={sendResetLink}>
            Send reset link
          </button>
          <p>{messages.reset}</p>
        </div>
      </section>

      <section className="account-actions">
        <a className="legal-button" href="/account/orders">
          My Orders
        </a>
        <button className="account-logout" type="button" onClick={logout}>
          Logout
        </button>
      </section>
    </div>
  );
}
