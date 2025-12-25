import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ServicesTeaser from "@/components/sections/ServicesTeaser";
import Accreditations from "@/components/sections/Accreditations";
import PortfolioTeaser from "@/components/sections/PortfolioTeaser";
import ClientReferences from "@/components/sections/ClientReferences";
import WhyWaitla from "@/components/sections/WhyWaitla";
import ContactStrip from "@/components/sections/ContactStrip";
import RedCarpetScroll from "@/components/ui/RedCarpetScroll";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://waitla.com";

export const metadata: Metadata = {
  title: "WaitLa - Digital Marketing Agency",
  description:
    "Creative digital marketing agency specializing in web development, mobile apps, digital strategy, and media buying. Transform your brand with innovative solutions.",
  openGraph: {
    title: "WaitLa - Digital Marketing Agency",
    description:
      "Creative digital marketing agency specializing in web development, mobile apps, digital strategy, and media buying. Transform your brand with innovative solutions.",
    url: siteUrl,
    siteName: "WaitLa",
    images: [
      {
        url: "/Logo_hand.png",
        width: 1200,
        height: 630,
        alt: "WaitLa - Digital Marketing Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WaitLa - Digital Marketing Agency",
    description:
      "Creative digital marketing agency specializing in web development, mobile apps, digital strategy, and media buying.",
    images: ["/Logo_hand.png"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <RedCarpetScroll />
      <main className="flex-1">
        <Hero />
        <AboutUs />
        <AboutTeaser />
        <ServicesTeaser />
        <Accreditations />
        <PortfolioTeaser />
        <ClientReferences />
        <WhyWaitla />
        <ContactStrip />
      </main>
      <Footer />
    </div>
  );
}

