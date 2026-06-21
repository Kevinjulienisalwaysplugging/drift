import { LegalShell } from "../legal-page";

export const metadata = {
  title: "About DRIFT | Luxury Satin Sleep Essentials",
  description: "Learn about DRIFT's calm satin sleep essentials and everyday luxury approach.",
  alternates: {
    canonical: "/about"
  }
};

export default function AboutPage() {
  return (
    <LegalShell
      eyebrow="About DRIFT"
      title="Everyday luxury for your night routine."
      intro="DRIFT creates smooth satin essentials for softer rest, calmer routines, and a more polished bedroom ritual."
      heroImage="/assets/about-nightgown-ritual.png"
      heroImageAlt="A satin nightgown hanging in warm evening light beside a quiet bedside ritual."
    >
      <article>
        <h2>What DRIFT Makes</h2>
        <p>
          DRIFT focuses on the pieces you touch every night: pillowcases, eyemasks, bonnets,
          scrunchies, bedding, blankets, slippers, and curated sleep sets.
        </p>
      </article>

      <article>
        <h2>Why Satin</h2>
        <p>
          Satin creates a smoother surface than cotton, helping reduce friction against hair and skin
          while keeping the experience easy to care for and approachable.
        </p>
      </article>

      <article className="about-material-feature">
        <div>
          <h2>Material Language</h2>
          <p>
            DRIFT uses premium satin and silk blends to deliver the luxury feel you expect, while
            keeping our products accessible and affordable.
          </p>
        </div>
        <figure>
          <img src="/assets/about-material-satin.png" alt="Blush satin fabric catching warm window light on a bed." />
        </figure>
      </article>

      <article>
        <h2>Design Point Of View</h2>
        <p>
          The DRIFT experience is intentionally quiet: warm colors, clear product information,
          secure checkout, and enough detail to help shoppers decide without feeling rushed.
        </p>
      </article>
    </LegalShell>
  );
}
