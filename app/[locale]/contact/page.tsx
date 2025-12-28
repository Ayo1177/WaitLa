import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Linkedin, Instagram, Share2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: `${t("title")} - WaitLa`,
    description: t("description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t("description")}
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="mx-auto mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t("form.title")}
            </h2>
            <ContactForm />
          </div>

          {/* Contact Information Section */}
          <div className="mx-auto mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t("info.title")}
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{t("info.email")}</h3>
                  <a
                    href="mailto:contact.waitla@gmail.com"
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    contact.waitla@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{t("info.phone")}</h3>
                  <div className="space-y-1">
                    <a
                      href="tel:+212603046155"
                      className="block text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      +212 603046155
                    </a>
                    <a
                      href="tel:+212782842180"
                      className="block text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      +212 782842180
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {t("info.address")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Mohammedia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Share2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Réseaux sociaux</h3>
                  <div className="space-y-2">
                    <a
                      href="https://www.linkedin.com/company/waitla/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <Linkedin className="h-5 w-5" />
                      LinkedIn
                    </a>
                    <a
                      href="https://www.instagram.com/waitla.service?igsh=MXgzbnpldHh0Mm45aQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <Instagram className="h-5 w-5" />
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

