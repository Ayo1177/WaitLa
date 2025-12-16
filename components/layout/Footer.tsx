"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "#",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "#",
    icon: Twitter,
  },
];

export default function Footer() {
  const t = useTranslations("Footer");
  
  const navigation = {
    services: [
      { nameKey: "services.digitalStrategy", href: "/services#digital-strategy" },
      { nameKey: "services.brandContent", href: "/services#brand-content" },
      { nameKey: "services.webDevelopment", href: "/services#web-development" },
      { nameKey: "services.mediaBuying", href: "/services#media-buying" },
    ],
    company: [
      { nameKey: "company.about", href: "/about" },
      { nameKey: "company.team", href: "/team" },
      { nameKey: "company.portfolio", href: "/portfolio" },
      { nameKey: "company.contact", href: "/contact" },
    ],
    legal: [
      { nameKey: "legal.privacy", href: "/privacy" },
      { nameKey: "legal.terms", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white opacity-100 relative -z-10" style={{ backgroundColor: '#111827' }} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto px-6 pb-8 pt-16 sm:pt-24 lg:px-12 xl:px-16 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div>
              <Image
                src="/logo.jpg"
                alt="WaitLa logo"
                width={160}
                height={48}
                className="h-12 w-auto"
              />
              <p className="mt-4 text-sm leading-6 text-gray-300">
                {t("description")}
              </p>
            </div>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
                  aria-label={item.name}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">{t("services.title")}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-white opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out"
                      >
                        {t(item.nameKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">{t("company.title")}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-white opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out"
                      >
                        {t(item.nameKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">{t("contact.title")}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a
                      href="mailto:contact@waitla.com"
                      className="group flex items-center gap-2 text-sm leading-6 text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
                    >
                      <Mail className="h-4 w-4" />
                      contact@waitla.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+1234567890"
                      className="group flex items-center gap-2 text-sm leading-6 text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
                    >
                      <Phone className="h-4 w-4" />
                      +1 (234) 567-890
                    </a>
                  </li>
                  <li>
                    <div className="flex items-start gap-2 text-sm leading-6 text-gray-300">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>123 Business St, City, Country</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">{t("legal.title")}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
                      >
                        {t(item.nameKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} WaitLa. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}

