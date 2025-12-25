import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import OrganizationSchema from "@/components/seo/OrganizationSchema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://waitla.com";

export const metadata: Metadata = {
  title: {
    default: "WaitLa - Digital Marketing Agency",
    template: "%s | WaitLa",
  },
  description:
    "Creative digital marketing agency specializing in web development, mobile apps, digital strategy, and media buying. Transform your brand with innovative solutions.",
  keywords: [
    "digital marketing",
    "web development",
    "branding",
    "social media",
    "marketing agency",
    "digital strategy",
    "media buying",
  ],
  authors: [{ name: "WaitLa" }],
  creator: "WaitLa",
  publisher: "WaitLa",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      fr: "/fr",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "WaitLa",
    title: "WaitLa - Digital Marketing Agency",
    description:
      "Creative digital marketing agency specializing in web development, mobile apps, digital strategy, and media buying. Transform your brand with innovative solutions.",
    images: [
      {
        url: "/Logo_hand.png",
        width: 1200,
        height: 630,
        alt: "WaitLa - Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WaitLa - Digital Marketing Agency",
    description:
      "Creative digital marketing agency specializing in web development, mobile apps, digital strategy, and media buying.",
    images: ["/Logo_hand.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/red_logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/red_logo.svg",
    apple: [
      { url: "/red_logo.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${inter.variable} font-sans antialiased`}>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}




