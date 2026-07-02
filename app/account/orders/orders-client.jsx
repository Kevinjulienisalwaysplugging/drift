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
        window.location.href = "/";
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

  if (orders.length === 0) {
    return (
      <div className="account-empty orders-empty">
        <p className="eyebrow">My Orders</p>
        <h2>No orders yet.</h2>
        <p>No orders yet. Your DRIFT purchases will appear here.</p>
        <p className="account-note">{message}</p>
        <a className="legal-button" href="/#collection">
          Shop DRIFT
        </a>
      </div>
    );
  }

  return (
    <div className="orders-list">
      {orders.map((order) => (
        <article className="order-card" key={order.id}>
          {(order.items || []).map((item) => (
            <div className="order-line" key={`${order.id}-${item.name}-${item.variant}`}>
              <img src={item.image || "/assets/product-pillowcase-new.png"} alt={item.imageAlt || `${item.name} product image`} />
              <div>
                <p className="eyebrow">{order.number}</p>
                <h2>{item.name}</h2>
                <dl className="account-details order-details">
                  <div>
                    <dt>Variant</dt>
                    <dd>{item.variant || "Standard"}</dd>
                  </div>
                  <div>
                    <dt>Quantity</dt>
                    <dd>{item.quantity}</dd>
                  </div>
                  <div>
                    <dt>Price</dt>
                    <dd>{item.price}</dd>
                  </div>
                  <div>
                    <dt>Order date</dt>
                    <dd>{order.date}</dd>
                  </div>
                  <div>
                    <dt>Delivery status</dt>
                    <dd>{order.status || "Processing"}</dd>
                  </div>
                </dl>
                {order.trackingUrl ? (
                  <a className="legal-button" href={order.trackingUrl}>
                    Track order
                  </a>
                ) : (
                  <button className="account-logout" type="button" disabled>
                    Tracking unavailable
                  </button>
                )}
              </div>
            </div>
          ))}
        </article>
      ))}
    </div>
  );
}

