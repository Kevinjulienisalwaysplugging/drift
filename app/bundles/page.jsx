import { LegalShell } from "../legal-page";

export const metadata = {
  title: "Bundles | DRIFT",
  description: "DRIFT satin bundle ideas and Shopify bundle setup guidance.",
  alternates: {
    canonical: "/bundles"
  }
};

const bundles = [
  {
    name: "Pillowcase + Eyemask",
    items: "Satin Pillowcase and Satin Eyemask",
    purpose: "A simple sleep upgrade for smoother hair contact and softer light blocking."
  },
  {
    name: "Pillowcase + Bonnet",
    items: "Satin Pillowcase and Satin Bonnet",
    purpose: "A low-friction hair care pairing for overnight protection."
  },
  {
    name: "Complete Sleep Set",
    items: "Pillowcase, Eyemask, Bonnet, and Scrunchie",
    purpose: "A fuller DRIFT routine for gifting or a complete bedroom refresh."
  }
];

export default function BundlesPage() {
  return (
    <LegalShell
      eyebrow="Bundles"
      title="Build a satin routine in fewer clicks."
      intro="Bundles help ad shoppers understand the best combinations before they commit to checkout."
    >
      {bundles.map((bundle) => (
        <article key={bundle.name}>
          <h2>{bundle.name}</h2>
          <p>{bundle.items}</p>
          <p>{bundle.purpose}</p>
          <p>
            <a className="legal-button" href="/storefront.html#collection">Shop the collection</a>
          </p>
        </article>
      ))}
    </LegalShell>
  );
}
