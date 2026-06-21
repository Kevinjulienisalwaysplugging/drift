const contactEmail = "privacy@drift-sleepwear.com";

export function LegalShell({ eyebrow, title, intro, heroImage, heroImageAlt, children }) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a className="legal-brand" href="/storefront.html" aria-label="Back to DRIFT storefront">
          DRIFT
        </a>
        <nav className="legal-nav" aria-label="Legal navigation">
          <a href="/about">About</a>
          <a href="/shipping">Shipping</a>
          <a href="/returns">Returns</a>
          <a href="/reviews">Reviews</a>
          <a href="/bundles">Bundles</a>
          <a href="/products">Products</a>
          <a href="/privacy">Privacy</a>
          <a href="/storefront.html">Shop</a>
        </nav>
      </header>

      <section className={`legal-hero${heroImage ? " legal-hero-with-media" : ""}`}>
        <div className="legal-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
          <span>Last updated June 6, 2026</span>
        </div>
        {heroImage ? (
          <figure className="legal-hero-media">
            <img src={heroImage} alt={heroImageAlt} />
          </figure>
        ) : null}
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
