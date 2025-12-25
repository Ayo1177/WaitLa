import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InProgress from "@/components/ui/InProgress";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Nav" });

  return {
    title: `${t("portfolio")} - WaitLa`,
    description:
      "Explore WaitLa's portfolio of successful digital marketing projects and case studies.",
  };
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <InProgress pageName="Portfolio" />
      </main>
      <Footer />
    </div>
  );
}

