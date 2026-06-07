const contactEmail = "privacy@drift-sleepwear.com";

export function LegalShell({ eyebrow, title, intro, children }) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a className="legal-brand" href="/storefront.html" aria-label="Back to DRIFT storefront">
          DRIFT
        </a>
        <nav className="legal-nav" aria-label="Legal navigation">
          <a href="/privacy">Privacy</a>
          <a href="/data-deletion">Data deletion</a>
          <a href="/storefront.html">Shop</a>
        </nav>
      </header>

      <section className="legal-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        <span>Last updated June 6, 2026</span>
      </section>

      <section className="legal-content">{children}</section>

      <footer className="legal-footer">
        <span>DRIFT</span>
        <p>
          Questions about privacy or deletion requests can be sent to{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </footer>
    </main>
  );
}

export { contactEmail };

