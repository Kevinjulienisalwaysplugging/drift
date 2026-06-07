import { LegalShell, contactEmail } from "../legal-page";

export const metadata = {
  title: "Data Deletion | DRIFT",
  description: "Request deletion of personal information submitted to DRIFT.",
  alternates: {
    canonical: "/data-deletion"
  }
};

export default function DataDeletionPage() {
  const subject = encodeURIComponent("DRIFT data deletion request");
  const body = encodeURIComponent(
    "Please delete the personal information associated with this email address.\n\nEmail used on DRIFT:\nOrder number, if any:\nAdditional details:"
  );

  return (
    <LegalShell
      eyebrow="Data deletion"
      title="Request deletion of your DRIFT data."
      intro="Use this page to request deletion of personal information you submitted through the DRIFT website, waitlist, or checkout flow."
    >
      <article>
        <h2>How To Request Deletion</h2>
        <p>
          Email DRIFT at <a href={`mailto:${contactEmail}`}>{contactEmail}</a> with the subject line{" "}
          <strong>DRIFT data deletion request</strong>. Include the email address you used on the site and,
          if you placed an order, include your order number so we can locate the correct records.
        </p>
        <p>
          <a className="legal-button" href={`mailto:${contactEmail}?subject=${subject}&body=${body}`}>
            Start deletion request
          </a>
        </p>
      </article>

      <article>
        <h2>What We Can Delete</h2>
        <p>
          We can delete or anonymize personal information submitted through the DRIFT private release list,
          customer support messages, and other site forms where deletion is legally and technically possible.
        </p>
      </article>

      <article>
        <h2>Shopify Orders</h2>
        <p>
          If you purchased through Shopify checkout, some information may be stored in Shopify for order,
          payment, shipping, fraud prevention, tax, accounting, and legal record purposes. We will process your
          request and explain what can be deleted, anonymized, or must be retained.
        </p>
      </article>

      <article>
        <h2>Identity Verification</h2>
        <p>
          To protect customer information, we may ask you to verify that you control the email address or order
          connected to the deletion request before changing or deleting records.
        </p>
      </article>

      <article>
        <h2>Response Timing</h2>
        <p>
          DRIFT will review deletion requests as soon as reasonably possible. If more time is needed to verify
          identity or locate records, we will let you know.
        </p>
      </article>
    </LegalShell>
  );
}

