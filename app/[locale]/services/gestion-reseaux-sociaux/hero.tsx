"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ServiceHeroProps {
  variant?: "full" | "card";
}

function SocialMediaBackground() {
  const platforms = [
    { name: "Instagram", src: "/Logos/instagram.png", x: 10, y: 20 },
    { name: "Facebook", src: "/Logos/meta.png", x: 30, y: 15 },
    { name: "TikTok", src: "/Logos/tik tok.png", x: 50, y: 25 },
    { name: "LinkedIn", src: "/Logos/LinkedIn.png", x: 70, y: 18 },
    { name: "Google", src: "/Logos/google.png", x: 85, y: 22 },
    { name: "YouTube", src: "/Logos/youtube.png", x: 20, y: 30 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {platforms.map((platform, i) => (
        <motion.div
          key={`${platform.name}-${i}`}
          className="absolute"
          style={{
            left: `${platform.x}%`,
            top: `${platform.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <div className="relative w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20">
            <Image
              src={platform.src}
              alt={platform.name}
              width={32}
              height={32}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function ServiceHero({ variant = "full" }: ServiceHeroProps) {
  const t = useTranslations("SocialMediaManagement");

  if (variant === "card") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#8a1c1a]" />
        <SocialMediaBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary-dark/85 to-primary/90" />
      </div>
    );
  }

  return (
    <section className="relative text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#8a1c1a]" />
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/8 blur-3xl" />
        <SocialMediaBackground />
      </div>
      
      <div className="relative z-30 max-w-5xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold uppercase tracking-wide bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

