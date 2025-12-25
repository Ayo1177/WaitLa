"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import {
  Megaphone,
  Users,
  Palette,
  Code,
  Presentation,
  PenTool,
  Video,
  MonitorSmartphone,
  Printer,
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import hero components
const HeroRP = dynamic(() => import("@/app/[locale]/services/rp-et-evenement/hero"));
const HeroAgentIA = dynamic(() => import("@/app/[locale]/services/agent-ia-et-crm/hero"));
const HeroBranding = dynamic(() => import("@/app/[locale]/services/branding/hero"));
const HeroUGC = dynamic(() => import("@/app/[locale]/services/ugc-et-storytelling/hero"));
const HeroWeb = dynamic(() => import("@/app/[locale]/services/creation-de-site-web/hero"));
const HeroAds = dynamic(() => import("@/app/[locale]/services/publicite-digitale-ads/hero"));
const HeroSocial = dynamic(() => import("@/app/[locale]/services/gestion-reseaux-sociaux/hero"));
const HeroConsulting = dynamic(() => import("@/app/[locale]/services/consulting-formations/hero"));
const Hero3D = dynamic(() => import("@/app/[locale]/services/animation-3d/hero"));
const HeroDesign = dynamic(() => import("@/app/[locale]/services/design/hero"));
const HeroPrinting = dynamic(() => import("@/app/[locale]/services/impression-habillage/hero"));

const HeroComponents: Record<string, React.ComponentType<{ variant?: "full" | "card" }>> = {
  "/services/rp-et-evenement": HeroRP,
  "/services/agent-ia-et-crm": HeroAgentIA,
  "/services/branding": HeroBranding,
  "/services/ugc-et-storytelling": HeroUGC,
  "/services/creation-de-site-web": HeroWeb,
  "/services/publicite-digitale-ads": HeroAds,
  "/services/gestion-reseaux-sociaux": HeroSocial,
  "/services/consulting-formations": HeroConsulting,
  "/services/animation-3d": Hero3D,
  "/services/design": HeroDesign,
  "/services/impression-habillage": HeroPrinting,
};

const services = [
  {
    name: "Relations presse & événements",
    description:
      "Conférences de presse, relations médias et organisation d’événements sur mesure.",
    icon: Presentation,
    href: "/services/rp-et-evenement",
  },
  {
    name: "Agent IA & CRM",
    description:
      "Automatisation marketing, chatbots IA et intégration CRM pour suivre vos leads.",
    icon: MonitorSmartphone,
    href: "/services/agent-ia-et-crm",
  },
  {
    name: "Branding & identité",
    description:
      "Logos, chartes graphiques et univers visuel cohérent pour votre marque.",
    icon: Palette,
    href: "/services/branding",
  },
  {
    name: "UGC & storytelling",
    description:
      "Contenus authentiques créés par des créateurs UGC pour incarner votre histoire.",
    icon: Video,
    href: "/services/ugc-et-storytelling",
  },
  {
    name: "Création de site web",
    description:
      "Sites vitrines et e-commerce performants, pensés pour la conversion.",
    icon: Code,
    href: "/services/creation-de-site-web",
  },
  {
    name: "Publicité digitale & Ads",
    description:
      "Campagnes Meta, Google, TikTok et YouTube optimisées pour vos objectifs.",
    icon: Megaphone,
    href: "/services/publicite-digitale-ads",
  },
  {
    name: "Gestion réseaux sociaux",
    description:
      "Stratégie, calendrier éditorial et création de contenus pour vos réseaux.",
    icon: Users,
    href: "/services/gestion-reseaux-sociaux",
  },
  {
    name: "Consulting & formations",
    description:
      "Accompagnement stratégique et formations pour vos équipes marketing.",
    icon: PenTool,
    href: "/services/consulting-formations",
  },
  {
    name: "Animation 3D & motion",
    description:
      "Animations 3D et motion design pour donner vie à vos produits et campagnes.",
    icon: Video,
    href: "/services/animation-3d",
  },
  {
    name: "Design & création graphique",
    description:
      "Design visuel, supports digitaux et print pour une image de marque impactante.",
    icon: Palette,
    href: "/services/design",
  },
  {
    name: "Impression & habillage",
    description:
      "Panneaux, habillage véhicules et décoration d’espaces physiques.",
    icon: Printer,
    href: "/services/impression-habillage",
  },
];

export default function ServicesTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="relative z-20 bg-white py-24 sm:py-32 -mt-1 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          {isInView && (
            <motion.h2
              className="text-base font-semibold leading-7 text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Services
            </motion.h2>
          )}
          {isInView && (
            <motion.p
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Comprehensive Digital Solutions
            </motion.p>
          )}
          {isInView && (
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              From strategy to execution, we provide end-to-end digital
              marketing services to help your brand thrive.
            </motion.p>
          )}
        </div>
        <div className="mx-auto mt-16 flex max-w-6xl flex-wrap justify-center gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
            >
              <Link
                href={service.href}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 shadow-sm ring-1 ring-gray-900/5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:ring-primary/20"
              >
                {/* Hero Background - fills entire card */}
                {(() => {
                  const HeroComponent = HeroComponents[service.href];
                  return HeroComponent ? (
                    <div className="absolute inset-0 z-0">
                      <HeroComponent variant="card" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a]" />
                  );
                })()}
                
                {/* Content Overlay with better contrast */}
                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <div className="relative flex flex-col gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold leading-6 text-white drop-shadow-lg group-hover:text-white transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-sm text-white/90 drop-shadow-md">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm font-semibold text-white drop-shadow-lg group-hover:text-white/90">
                    En savoir plus →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}




