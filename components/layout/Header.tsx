"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

const navigation = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "team", href: "/team" },
  // Main Services link points to the Services section on the homepage
  { key: "services", href: "/#services", hasDropdown: true },
  { key: "portfolio", href: "/portfolio" },
];

const servicesList = [
  { key: "rpAndEvent", href: "/services/rp-et-evenement" },
  { key: "agentIaAndCrm", href: "/services/agent-ia-et-crm" },
  { key: "branding", href: "/services/branding" },
  { key: "ugcAndStorytelling", href: "/services/ugc-et-storytelling" },
  { key: "webDevelopment", href: "/services/creation-de-site-web" },
  { key: "digitalAds", href: "/services/publicite-digitale-ads" },
  { key: "socialMediaManagement", href: "/services/gestion-reseaux-sociaux" },
  { key: "consultingAndTraining", href: "/services/consulting-formations" },
  { key: "animation3d", href: "/services/animation-3d" },
  { key: "design", href: "/services/design" },
  { key: "printingAndBranding", href: "/services/impression-habillage" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const tNav = useTranslations("Nav");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Handle keyboard events for dropdown
  const handleTriggerKeyDown = (e: React.KeyboardEvent, hasDropdown: boolean) => {
    if (!hasDropdown) return;
    
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setServicesDropdownOpen(true);
    } else if (e.key === "Escape") {
      setServicesDropdownOpen(false);
      triggerRef.current?.focus();
    }
  };

  // Handle focus events to open/close dropdown
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as Node;
      if (
        dropdownRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        // Focus is within dropdown or trigger, keep it open
        setServicesDropdownOpen(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      // Use setTimeout to check if focus moved outside after a brief delay
      // This prevents flicker when moving between trigger and menu items
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(activeElement) &&
          triggerRef.current &&
          !triggerRef.current.contains(activeElement)
        ) {
          setServicesDropdownOpen(false);
        }
      }, 100);
    };

    if (servicesDropdownOpen) {
      document.addEventListener("focusin", handleFocusIn);
      document.addEventListener("focusout", handleFocusOut);
    }

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [servicesDropdownOpen]);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a] text-white shadow-lg">
      <nav className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="WaitLa logo"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-white hover:bg-white/10 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <div className="flex items-center gap-4">
            {/* Navigation Items */}
            <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              {navigation.map((item) => (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setServicesDropdownOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setServicesDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    tabIndex={0}
                    aria-haspopup={item.hasDropdown ? "menu" : undefined}
                    aria-expanded={item.hasDropdown ? servicesDropdownOpen : undefined}
                    onKeyDown={(e) => handleTriggerKeyDown(e, !!item.hasDropdown)}
                    onFocus={() => item.hasDropdown && setServicesDropdownOpen(true)}
                    ref={(node) => {
                      if (item.hasDropdown && node) {
                        (triggerRef as React.MutableRefObject<HTMLAnchorElement | null>).current = node;
                      }
                    }}
                    className={cn(
                      "relative flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary",
                      isActive(item.href)
                        ? "bg-white text-primary-dark shadow-[0_10px_30px_rgba(255,255,255,0.25)]"
                        : "text-white/90 hover:bg-white/15"
                    )}
                  >
                    {tNav(item.key as any)}
                    {item.hasDropdown && (
                      <ChevronDown className={cn(
                        "h-4 w-4 opacity-70 transition-transform",
                        servicesDropdownOpen && "rotate-180"
                      )} />
                    )}
                  </Link>
                  
                  {/* Services Dropdown Menu */}
                  {item.hasDropdown && servicesDropdownOpen && (
                    <div 
                      ref={dropdownRef}
                      role="menu"
                      className="absolute left-1/2 top-full pt-2 -translate-x-1/2 w-[1100px] bg-transparent z-50"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="p-8">
                          <div className="grid grid-cols-3 gap-8">
                            {servicesList.map((service) => {
                              const serviceIsActive = isActive(service.href);
                              return (
                                <Link
                                  key={service.key}
                                  href={service.href}
                                  role="menuitem"
                                  tabIndex={0}
                                  className={cn(
                                    "block px-5 py-4 rounded-lg transition-colors group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                    serviceIsActive
                                      ? "bg-primary text-white font-bold"
                                      : "text-gray-900 hover:bg-red-50"
                                  )}
                                  onClick={() => setServicesDropdownOpen(false)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      setServicesDropdownOpen(false);
                                    } else if (e.key === "Escape") {
                                      setServicesDropdownOpen(false);
                                      triggerRef.current?.focus();
                                    }
                                  }}
                                >
                                  <span className={cn(
                                    "text-base transition-colors",
                                    serviceIsActive
                                      ? "font-bold text-white"
                                      : "font-semibold group-hover:text-primary"
                                  )}>
                                    {tNav(`servicesDropdown.${service.key}` as any)}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Language Toggle - Separated */}
            <div className="flex items-center gap-1 rounded-full border border-white/50 bg-white/10 px-1 py-1 text-xs font-semibold uppercase tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl ml-4">
              <button
                type="button"
                onClick={() => router.replace(pathname, { locale: "fr" })}
                className={cn(
                  "rounded-full px-3 py-1 transition",
                  locale === "fr"
                    ? "bg-white text-primary-dark"
                    : "text-white/80 hover:bg-white/10"
                )}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => router.replace(pathname, { locale: "en" })}
                className={cn(
                  "rounded-full px-3 py-1 transition",
                  locale === "en"
                    ? "bg-white text-primary-dark"
                    : "text-white/80 hover:bg-white/10"
                )}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(229,57,53,0.35)] transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          >
            {tNav("contactCta")}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <Image
                  src="/logo.jpg"
                  alt="WaitLa logo"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-full p-2.5 text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <div key={item.key}>
                      <Link
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {tNav(item.key as any)}
                      </Link>
                      {item.hasDropdown && (
                        <div className="mt-2 ml-4 space-y-1">
                          {servicesList.map((service) => {
                            const serviceIsActive = isActive(service.href);
                            return (
                              <Link
                                key={service.key}
                                href={service.href}
                                className={cn(
                                  "block rounded-lg px-3 py-2 text-sm transition-colors",
                                  serviceIsActive
                                    ? "bg-primary text-white font-bold"
                                    : "text-gray-700 hover:bg-gray-100"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {tNav(`servicesDropdown.${service.key}` as any)}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/contact"
                    className="block rounded-full bg-gradient-to-r from-[#b12aff] via-[#9827f4] to-[#6d12d2] px-4 py-3 text-center text-sm font-semibold text-white shadow-md hover:scale-[1.01] transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {tNav("contactCta")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

