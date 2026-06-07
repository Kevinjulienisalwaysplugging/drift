import { LegalShell, contactEmail } from "../legal-page";

export const metadata = {
  title: "Privacy Policy | DRIFT",
  description: "How DRIFT collects, uses, shares, and protects customer information.",
  alternates: {
    canonical: "/privacy"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      eyebrow="Privacy policy"
      title="How DRIFT handles your information."
      intro="This policy explains what information DRIFT collects, how it is used, and how you can contact us about your data."
    >
      <article>
        <h2>Information We Collect</h2>
        <p>
          DRIFT may collect information you provide directly, including your email address when you join the
          private release list, your name, shipping address, billing details, and order information when you
          purchase products through Shopify checkout.
        </p>
        <p>
          We may also collect basic technical information, such as page URL, browser type, device information,
          and usage data needed to operate, secure, and improve the site.
        </p>
      </article>

      <article>
        <h2>How We Use Information</h2>
        <p>
          We use information to operate the DRIFT storefront, process orders, communicate about purchases,
          manage the private release list, respond to customer support requests, detect abuse, and improve the
          customer experience.
        </p>
      </article>

      <article>
        <h2>Payments And Checkout</h2>
        <p>
          DRIFT uses Shopify to provide checkout, payment processing, order management, and related commerce
          services. Payment details are handled by Shopify and payment providers, not stored directly in the
          DRIFT website code.
        </p>
      </article>

      <article>
        <h2>Service Providers</h2>
        <p>
          We may use service providers such as Shopify, Vercel, Supabase, analytics tools, email providers,
          shipping providers, and customer support tools. These providers help us operate the site, store data,
          process purchases, send messages, and fulfill orders.
        </p>
      </article>

      <article>
        <h2>Cookies And Similar Technologies</h2>
        <p>
          The site may use cookies, local storage, and similar technologies to keep your shopping bag available,
          remember preferences, support checkout, protect the site, and understand performance.
        </p>
      </article>

      <article>
        <h2>Data Retention</h2>
        <p>
          We keep information only as long as needed for the purposes described in this policy, including order
          fulfillment, customer support, legal, tax, accounting, fraud prevention, and business record needs.
        </p>
      </article>

      <article>
        <h2>Your Choices</h2>
        <p>
          You can request access, correction, or deletion of personal information by emailing{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. You can also use the dedicated{" "}
          <a href="/data-deletion">data deletion page</a>.
        </p>
      </article>

      <article>
        <h2>Contact</h2>
        <p>
          For privacy questions, contact DRIFT at{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </article>
    </LegalShell>
  );
}

