"use client";

import { useEffect, useState } from "react";

export default function OrdersClient() {
  const [status, setStatus] = useState("loading");
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      const response = await fetch("/api/auth/orders", { cache: "no-store" });
      const payload = await response.json();

      if (!response.ok) {
        setStatus("signed-out");
        setMessage(payload.error || "Log in to view previous purchases.");
        return;
      }

      setOrders(payload.orders || []);
      setMessage(payload.message || "");
      setStatus("ready");
    };

    loadOrders();
  }, []);

  if (status === "loading") {
    return <p className="account-note">Loading previous purchases...</p>;
  }

  if (status === "signed-out") {
    return (
      <div className="account-empty">
        <h2>Sign in to view previous purchases.</h2>
        <p>{message}</p>
        <a className="legal-button" href="/storefront.html#drift-list">
          Sign in or create account
        </a>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="account-empty">
        <p className="eyebrow">Previous purchases</p>
        <h2>No orders yet.</h2>
        <p>Your DRIFT purchases will appear here once Shopify customer order history is connected.</p>
        <p className="account-note">{message}</p>
        <a className="legal-button" href="/storefront.html#collection">
          Shop DRIFT
        </a>
      </div>
    );
  }

  return (
    <div className="orders-list">
      {orders.map((order) => (
        <article className="account-card" key={order.id}>
          <h2>{order.name}</h2>
          <p>{order.date}</p>
          <strong>{order.total}</strong>
        </article>
      ))}
    </div>
  );
}
