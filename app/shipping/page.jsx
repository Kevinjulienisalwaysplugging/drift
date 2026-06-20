import { LegalShell, contactEmail } from "../legal-page";

export const metadata = {
  title: "Shipping | DRIFT",
  description: "Shipping details for DRIFT satin sleep essentials.",
  alternates: {
    canonical: "/shipping"
  }
};

export default function ShippingPage() {
  return (
    <LegalShell
      eyebrow="Shipping"
      title="Clear shipping for calmer checkout."
      intro="Use this page to explain how DRIFT orders ship, how tracking works, and where customers can get help."
    >
      <article>
        <h2>Order Processing</h2>
        <p>
          Orders should be packed carefully and sent with clear tracking communication once fulfillment is
          connected. Add your final processing window here when your shipping workflow is confirmed.
        </p>
      </article>

      <article>
        <h2>Tracking</h2>
        <p>
          Customers should receive tracking details after an order ships. For shipping questions, contact{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </article>

      <article>
        <h2>Address Accuracy</h2>
        <p>
          Customers should review their shipping address during Shopify checkout before placing an order.
        </p>
      </article>
    </LegalShell>
  );
}
