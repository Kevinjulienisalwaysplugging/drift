import { LegalShell } from "../../legal-page";
import OrdersClient from "./orders-client";
import { getAuthSession } from "../../../lib/auth-session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Previous Purchases | DRIFT Account",
  description: "View your DRIFT previous purchases and order history.",
  alternates: {
    canonical: "/account/orders",
  },
};

export default async function OrdersPage() {
  const { user } = await getAuthSession();

  if (!user) {
    redirect("/");
  }

  return (
    <LegalShell
      eyebrow="Previous purchases"
      title="Your DRIFT orders."
      intro="Orders from Shopify checkout will live here once customer order history is connected."
    >
      <OrdersClient />
    </LegalShell>
  );
}

