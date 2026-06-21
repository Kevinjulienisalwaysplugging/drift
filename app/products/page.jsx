import { LegalShell } from "../legal-page";
import { productPricing } from "../../lib/product-prices";
import { shopifyProducts } from "../../lib/shopify-products";

export const metadata = {
  title: "Shop All DRIFT Products | Satin Sleep Essentials",
  description: "Shop all DRIFT satin pillowcases, sleepwear, bedding, bundles, and satin essentials.",
  alternates: {
    canonical: "/products"
  }
};

const getPricing = (name) => {
  const value = productPricing[name];
  return typeof value === "string" ? { salePrice: value } : value;
};

export default function ProductsPage() {
  return (
    <LegalShell
      eyebrow="Shop all"
      title="Every DRIFT piece in one place."
      intro="Browse satin essentials, sleepwear, bedding, and curated sets before choosing your night routine."
    >
      <section className="shop-all-list" aria-label="All DRIFT products">
        {shopifyProducts.map((product) => {
          const pricing = getPricing(product.name);

          return (
            <article className="shop-all-product" key={product.id}>
              <img src={product.image} alt={`${product.name} product image`} />
              <div>
                {pricing?.marketPrice ? <span className="shop-sale-pill">Summer Sale</span> : null}
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="shop-all-price">
                  {pricing?.marketPrice ? <span>{pricing.marketPrice}</span> : null}
                  <strong>{pricing?.salePrice || product.priceLabel}</strong>
                </div>
                <a className="legal-button" href="/storefront.html#collection">
                  Shop this item
                </a>
              </div>
            </article>
          );
        })}
      </section>
    </LegalShell>
  );
}
