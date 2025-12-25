"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Construction, ArrowLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface InProgressProps {
  pageName?: string;
  showBackButton?: boolean;
  className?: string;
}

export default function InProgress({
  pageName,
  showBackButton = true,
  className,
}: InProgressProps) {
  const t = useTranslations("InProgress");

  return (
    <div
      className={cn(
        "flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center",
        className
      )}
    >
      <div className="mx-auto max-w-2xl space-y-8 animate-fade-in">
        {/* Animated Construction Icon */}
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent animate-pulse" />
          <div className="relative flex items-center justify-center w-full h-full">
            <Construction className="w-20 h-20 text-primary animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          {pageName && (
            <p className="text-xl text-primary font-semibold">
              {pageName}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="mx-auto max-w-xl text-lg leading-8 text-gray-600">
          {t("description")}
        </p>

        {/* Action Buttons */}
        {showBackButton && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Home className="h-4 w-4" />
              {t("backToHome")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t("contactUs")}
            </Link>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="pt-8">
          <div className="mx-auto max-w-md">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>{t("progressLabel")}</span>
              <span className="font-semibold text-primary">75%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a] rounded-full transition-all duration-1000 ease-out"
                style={{ width: "75%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

