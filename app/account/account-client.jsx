"use client";

import { useEffect, useState } from "react";

const formatDate = (value) => {
  if (!value) return "Not available yet";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

export default function AccountClient() {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const loadProfile = async () => {
    const response = await fetch("/api/auth/profile", { cache: "no-store" });
    const payload = await response.json();

    if (!response.ok) {
      setStatus("signed-out");
      setUser(null);
      setName("");
      return;
    }

    setStatus("signed-in");
    setUser(payload.user);
    setName(payload.user?.name || "");
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const saveProfile = async (event) => {
    event.preventDefault();
    setMessage("Saving your profile...");

    const response = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.error || "Unable to save your profile.");
      return;
    }

    setUser(payload.user);
    setName(payload.user?.name || "");
    setMessage("Profile saved.");
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/storefront.html";
  };

  if (status === "loading") {
    return <p className="account-note">Loading your DRIFT profile...</p>;
  }

  if (status === "signed-out") {
    return (
      <div className="account-empty">
        <h2>Sign in to view your profile.</h2>
        <p>Your DRIFT account keeps your profile details and future purchase history in one calm place.</p>
        <a className="legal-button" href="/storefront.html#drift-list">
          Sign in or create account
        </a>
      </div>
    );
  }

  return (
    <div className="account-dashboard">
      <section className="account-card account-card-feature">
        <p className="eyebrow">Profile</p>
        <h2>{user.name || "DRIFT customer"}</h2>
        <p>{user.email}</p>
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

      <section className="account-card">
        <h2>Update Name</h2>
        <form className="account-form" onSubmit={saveProfile}>
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
          <p>{message}</p>
        </form>
      </section>

      <section className="account-actions">
        <a className="legal-button" href="/account/orders">
          Previous purchases
        </a>
        <button className="account-logout" type="button" onClick={logout}>
          Logout
        </button>
      </section>
    </div>
  );
}
