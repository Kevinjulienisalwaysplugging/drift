import { LegalShell } from "../legal-page";

export const metadata = {
  title: "Bundles | DRIFT",
  description: "DRIFT satin bundles for softer sleep routines and everyday luxury.",
  alternates: {
    canonical: "/bundles"
  }
};

const bundles = [
  {
    name: "The Nightstand Essentials Trio",
    items: "Satin Pillowcase, Satin Eyemask, and Satin Scrunchie",
    purpose: "A bedside set for smoother hair, softer skin contact, and a quieter night routine."
  },
  {
    name: "The Ultimate Hair Care Duo",
    items: "Satin Bonnet and Satin Scrunchie",
    purpose: "A focused hair-care pairing for texture protection and reduced overnight friction."
  },
  {
    name: "The Beauty Sleep Bundle",
    items: "Satin Pillowcase, Satin Eyemask, and Satin Scrunchie",
    purpose: "A polished sleep-care set for a softer bedtime ritual."
  },
  {
    name: "The College / Dorm Starter",
    items: "Satin Twin Bedding Set, Satin Bonnet, and Satin Pillowcase",
    purpose: "A student-ready satin starter set for comfort, polish, and hair and skin protection."
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
