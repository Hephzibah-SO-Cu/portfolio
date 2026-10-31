import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/*
  Where this site lives, for the absolute URLs that Open Graph requires —
  a share card cannot be fetched from a relative path.

  Taken from Vercel's own environment rather than typed in here, so it is
  right on the production domain and on every preview deployment without a
  constant to keep in step. Set NEXT_PUBLIC_SITE_URL if a custom domain is
  added; it wins over both.
*/
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3111");

const title = "Oluwabusayo Sina-Olulana — Frontend Developer";

const description =
  "Frontend and product engineer in Lagos, building web, mobile and " +
  "full-stack products. Currently the sole frontend engineer on Zowasel's " +
  "B2B agricultural marketplace.";

/*
  Everything below the first two lines is new.

  The whole of this page's metadata used to be that title and the words
  "Frontend & Product Engineer", so pasting the link into LinkedIn, WhatsApp
  or Slack produced a bare blue line of text and nothing else. For a site
  whose entire job is being sent to people, the unfurl IS the first
  impression, and it is not one you get to make twice.
*/
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  authors: [{ name: "Oluwabusayo Sina-Olulana" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: title,
    title,
    description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Oluwabusayo Sina-Olulana, frontend developer, Lagos, Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
