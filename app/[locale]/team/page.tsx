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
    title: `${t("team")} - WaitLa`,
    description:
      "Meet the WaitLa team - a group of creative professionals dedicated to helping brands reach their full potential.",
  };
}

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <InProgress pageName="Dream Team" />
      </main>
      <Footer />
    </div>
  );
}

