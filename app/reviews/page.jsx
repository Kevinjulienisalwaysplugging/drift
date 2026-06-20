import { LegalShell } from "../legal-page";

export const metadata = {
  title: "Reviews | DRIFT",
  description: "Customer reviews for DRIFT satin sleep essentials.",
  alternates: {
    canonical: "/reviews"
  }
};

const reviews = [
  ["Satin Pillowcase", "5.0", "Super soft and smooth. My hair feels way less tangled in the morning compared to my old cotton pillowcase."],
  ["Satin Pillowcase", "4.8", "The champagne color looks really nice on my bed, and the fabric feels cool and gentle. Definitely makes my night routine feel more luxurious."],
  ["Satin Bonnet", "5.0", "This bonnet is comfortable and stays on better than others I have tried. My hair feels more protected overnight."],
  ["Satin Eyemask", "5.0", "Very soft and comfortable. It blocks enough light for me and feels much nicer than cheaper eye masks."],
  ["Satin Scrunchie", "5.0", "Way gentler than regular hair ties. It does not pull my hair as much, and it looks cute on my wrist too."]
];

export default function ReviewsPage() {
  return (
    <LegalShell
      eyebrow="Reviews"
      title="Real notes from DRIFT shoppers."
      intro="A dedicated place for customer feedback, so shoppers do not have to hunt through the homepage for trust signals."
    >
      {reviews.map(([product, rating, text]) => (
        <article key={`${product}-${text}`}>
          <h2>{product}</h2>
          <p aria-label={`${rating} out of 5 stars`}>★★★★★ {rating}</p>
          <p>&ldquo;{text}&rdquo;</p>
          <p>Verified Customer</p>
        </article>
      ))}
    </LegalShell>
  );
}
