"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/**
 * Client component that updates the HTML lang attribute based on the current locale.
 * This ensures accessibility and SEO correctness for locale-based routing.
 */
export function LocaleHtmlLang() {
  const locale = useLocale();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}

