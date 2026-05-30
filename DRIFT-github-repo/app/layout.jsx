import "./globals.css";

export const metadata = {
  title: "DRIFT | Luxury Satin Sleepwear",
  description:
    "DRIFT creates luxury satin pillowcases, bonnets, scrunchies, and sleep accessories with a refined satin finish.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://drift-sleep.vercel.app"),
  openGraph: {
    title: "DRIFT | Luxury Satin Sleepwear",
    description:
      "Luxury satin sleep essentials designed for a softer night and a more polished morning.",
    images: ["/assets/drift-og.webp"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "DRIFT | Luxury Satin Sleepwear",
    description:
      "Luxury satin sleep essentials designed for a softer night and a more polished morning.",
    images: ["/assets/drift-og.webp"]
  },
  icons: {
    icon: "/assets/favicon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

