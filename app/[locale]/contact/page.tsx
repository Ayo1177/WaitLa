import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
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

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("form.title")}
              </h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("info.title")}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{t("info.email")}</h3>
                    <a
                      href="mailto:contact@waitla.com"
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      contact@waitla.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{t("info.phone")}</h3>
                    <a
                      href="tel:+1234567890"
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {t("info.address")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("info.addressLine1")}
                      <br />
                      {t("info.addressLine2")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {t("info.businessHours")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("info.hoursWeekday")}
                      <br />
                      {t("info.hoursWeekend")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps placeholder */}
              <div className="mt-8 h-64 rounded-lg bg-gray-200 flex items-center justify-center">
                <p className="text-sm text-gray-500">{t("info.mapsPlaceholder")}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

