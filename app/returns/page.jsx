import { LegalShell, contactEmail } from "../legal-page";

export const metadata = {
  title: "Returns | DRIFT",
  description: "Return support information for DRIFT satin sleep essentials.",
  alternates: {
    canonical: "/returns"
  }
};

export default function ReturnsPage() {
  return (
    <LegalShell
      eyebrow="Returns"
      title="Return support without friction."
      intro="DRIFT should make return expectations easy to understand before checkout."
    >
      <article>
        <h2>Eligible Returns</h2>
        <p>
          Because sleep products touch hair and skin, keep the final policy clear. A common approach is
          accepting eligible unopened and unused items within a defined return window.
        </p>
      </article>

      <article>
        <h2>How To Start</h2>
        <p>
          Customers can contact <a href={`mailto:${contactEmail}`}>{contactEmail}</a> with their order
          number and the item they need help with.
        </p>
      </article>

      <article>
        <h2>Damaged Or Incorrect Items</h2>
        <p>
          If an order arrives damaged or incorrect, customers should reach out with photos and the order
          number so support can review the issue.
        </p>
      </article>
    </LegalShell>
  );
}
