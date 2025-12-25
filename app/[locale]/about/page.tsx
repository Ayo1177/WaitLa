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
    title: `${t("about")} - WaitLa`,
    description:
      "Learn more about WaitLa, a creative digital marketing agency specializing in website development, mobile applications, and digital strategy.",
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <InProgress pageName="About Us" />
      </main>
      <Footer />
    </div>
  );
}

