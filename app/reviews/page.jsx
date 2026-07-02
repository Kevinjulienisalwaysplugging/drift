import Link from "next/link";
import { LegalShell } from "../legal-page";

export const metadata = {
  title: "Reviews | DRIFT",
  description: "Customer reviews for DRIFT satin sleep essentials.",
  alternates: {
    canonical: "/reviews",
  },
};

export default function ReviewsPage() {
  return (
    <LegalShell
      eyebrow="Reviews"
      title="Reviews now live with each product."
      intro="DRIFT reviews are organized by product, with rating summaries, customer photos, helpful votes, and verified buyer badges where Shopify purchase data is available."
    >
      <article>
        <h2>How to read DRIFT reviews</h2>
        <p>
          Open any product in the storefront and choose Reviews to see product-specific feedback, rating breakdowns,
          customer photos, and review sorting.
        </p>
        <p>
          <Link href="/#collection">Shop the collection</Link>
        </p>
      </article>
    </LegalShell>
  );
}

