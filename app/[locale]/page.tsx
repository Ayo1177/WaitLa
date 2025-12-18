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

