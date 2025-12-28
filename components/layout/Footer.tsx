"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/waitla/",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/waitla.service?igsh=MXgzbnpldHh0Mm45aQ==",
    icon: Instagram,
  },
];

export default function Footer() {
  const t = useTranslations("Footer");
  
  const navigation = {
    company: [
      { nameKey: "company.about", href: "/about" },
      { nameKey: "company.team", href: "/team" },
      { nameKey: "company.services", href: "/#services" },
      { nameKey: "company.portfolio", href: "/portfolio" },
      { nameKey: "company.contact", href: "/contact" },
    ],
    legal: [
      { nameKey: "legal.privacy", href: "/privacy" },
      { nameKey: "legal.terms", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white opacity-100 relative z-20" style={{ backgroundColor: '#111827' }} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-12 xl:px-16 lg:pt-32">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-12 items-start">
          {/* Company Info Column - Takes 4 columns on large screens */}
          <div className="space-y-8 sm:col-span-2 lg:col-span-4">
            <div>
              <Image
                src="/white_logo.svg"
                alt="WaitLa logo"
                width={160}
                height={48}
                className="h-12 w-auto"
              />
              <p className="mt-4 text-sm leading-6 text-gray-300 max-w-xs">
                {t("description")}
              </p>
            </div>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
                  aria-label={item.name}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Company Column - Takes 3 columns on large screens */}
          <div className="sm:col-span-1 lg:col-span-3">
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
          
          {/* Contact Column - Takes 3 columns on large screens */}
          <div className="sm:col-span-1 lg:col-span-3">
            <h3 className="text-sm font-semibold leading-6">{t("contact.title")}</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a
                  href="mailto:contact.waitla@gmail.com"
                  className="group flex items-center gap-2 text-sm leading-6 text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="break-words">contact.waitla@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <a
                      href="tel:+212603046155"
                      className="block text-sm leading-6 text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
                    >
                      +212 603046155
                    </a>
                    <a
                      href="tel:+212782842180"
                      className="block text-sm leading-6 text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
                    >
                      +212 782842180
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm leading-6 text-gray-300">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="break-words">Mohammedia</span>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Legal Column - Takes 2 columns on large screens */}
          <div className="sm:col-span-1 lg:col-span-2">
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
        <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} WaitLa. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}

