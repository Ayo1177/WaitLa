"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ServiceSelectionProps {
  selectedServices: string[];
  onServiceToggle: (serviceKey: string) => void;
  error?: string;
}

const serviceKeys = [
  "rpAndEvent",
  "agentIaAndCrm",
  "branding",
  "ugcAndStorytelling",
  "webDevelopment",
  "digitalAds",
  "socialMediaManagement",
  "consultingAndTraining",
  "animation3d",
  "design",
  "printingAndBranding",
] as const;

export default function ServiceSelection({
  selectedServices,
  onServiceToggle,
  error,
}: ServiceSelectionProps) {
  const t = useTranslations("Nav.servicesDropdown");

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {serviceKeys.map((serviceKey) => {
          const isSelected = selectedServices.includes(serviceKey);
          return (
            <button
              key={serviceKey}
              type="button"
              onClick={() => onServiceToggle(serviceKey)}
              className={cn(
                "px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 text-left",
                "border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                "w-full sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)]",
                isSelected
                  ? "bg-primary text-white border-primary shadow-md hover:bg-primary-dark"
                  : "bg-white text-gray-900 border-gray-300 hover:border-primary hover:bg-gray-50",
                error && "border-red-500"
              )}
              aria-pressed={isSelected}
            >
              {t(serviceKey)}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

