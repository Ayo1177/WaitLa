"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const clients = [
  { name: "Client 1", industry: "Technology", testimonial: "Outstanding results!", logo: "/clients/client-1.png" },
  { name: "Client 2", industry: "Retail", testimonial: "Exceeded expectations.", logo: "/clients/client-2.png" },
  { name: "Client 3", industry: "Healthcare", testimonial: "Professional and effective.", logo: "/clients/client-3.png" },
  { name: "Client 4", industry: "Finance", testimonial: "Great partnership!", logo: "/clients/client-4.png" },
  { name: "Client 5", industry: "Education", testimonial: "Highly recommended.", logo: "/clients/client-5.png" },
  { name: "Client 6", industry: "Technology", testimonial: "Innovative solutions.", logo: "/clients/client-6.png" },
  { name: "Client 7", industry: "Retail", testimonial: "Excellent service.", logo: "/clients/client-7.png" },
  { name: "Client 8", industry: "Finance", testimonial: "Top quality work.", logo: "/clients/client-8.png" },
];

export default function ClientReferences() {
  const t = useTranslations("ClientReferences");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(true);

  // Infinite scroll effect - duplicate clients for seamless looping
  const duplicatedClients = [...clients, ...clients, ...clients];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isScrolling) return;

    // Calculate the width of a single client (including gap)
    const firstClient = container.querySelector('[data-client-card]') as HTMLElement;
    if (!firstClient) return;
    
    const clientWidth = firstClient.offsetWidth;
    const singleSetWidth = clientWidth * clients.length; // Width of one complete set

    let scrollPosition = 0;
    const scrollSpeed = 0.3; // pixels per frame

    const autoScroll = () => {
      if (!isScrolling) {
        requestAnimationFrame(autoScroll);
        return;
      }

      scrollPosition += scrollSpeed;
      container.scrollLeft = scrollPosition;

      // Seamlessly loop: when we've scrolled through one complete set, jump back to start
      if (scrollPosition >= singleSetWidth) {
        scrollPosition = scrollPosition - singleSetWidth;
        container.scrollLeft = scrollPosition;
      }

      requestAnimationFrame(autoScroll);
    };

    const animationId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationId);
  }, [isScrolling]);

  // Pause scroll on hover
  const handleMouseEnter = () => setIsScrolling(false);
  const handleMouseLeave = () => setIsScrolling(true);

  return (
    <section ref={ref} className="relative z-20 py-24 sm:py-32 -mt-1 bg-gradient-to-r from-primary-dark via-primary to-accent-dark">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-4xl lg:text-center">
          {isInView && (
            <motion.button
              className="mb-6 w-fit rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-dark mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t("badge")}
            </motion.button>
          )}
          {isInView && (
            <motion.h2
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("title")}
            </motion.h2>
          )}
          {isInView && (
            <motion.p
              className="mt-6 text-lg leading-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("description")}
            </motion.p>
          )}
        </div>
      </div>

      {/* Infinite horizontal scrolling carousel */}
      <div className="mt-16 w-full overflow-visible">
        <div
          ref={scrollContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex gap-8 overflow-x-hidden scrollbar-hide px-8 py-8"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {duplicatedClients.map((client, index) => (
            <motion.div
              key={`${client.name}-${index}`}
              data-client-card
              className="flex-shrink-0 group relative overflow-visible"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3 + (index % clients.length) * 0.05 }}
            >
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white p-4 shadow-lg ring-2 ring-white/20 transition-all hover:scale-110 hover:shadow-xl sm:h-40 sm:w-40 lg:h-48 lg:w-48">
                {/* Placeholder for client logo */}
                <div className="text-2xl font-bold text-gray-400 group-hover:text-primary transition-colors">
                  {client.name.charAt(0)}
                </div>
                {/* Uncomment when you have actual logos:
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={120}
                  height={120}
                  className="h-full w-full object-contain"
                />
                */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}


