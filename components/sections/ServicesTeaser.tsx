"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Lightbulb,
  Palette,
  Code,
  Megaphone,
  Users,
  Smartphone,
  Calendar,
  Zap,
} from "lucide-react";

const services = [
  {
    name: "Digital Strategy",
    description: "Strategic planning to achieve your digital goals",
    icon: Lightbulb,
    href: "/services#digital-strategy",
  },
  {
    name: "Brand Content",
    description: "Content creation, video production, and photography",
    icon: Palette,
    href: "/services#brand-content",
  },
  {
    name: "Web Development",
    description: "Custom websites and e-commerce solutions",
    icon: Code,
    href: "/services#web-development",
  },
  {
    name: "Media Buying",
    description: "Paid advertising management and optimization",
    icon: Megaphone,
    href: "/services#media-buying",
  },
  {
    name: "Influence Marketing",
    description: "Influencer partnerships and campaign management",
    icon: Users,
    href: "/services#influence-marketing",
  },
  {
    name: "Phygital",
    description: "Physical + digital experience integration",
    icon: Smartphone,
    href: "/services#phygital",
  },
  {
    name: "Event Management",
    description: "Corporate events and brand activations",
    icon: Calendar,
    href: "/services#event-management",
  },
  {
    name: "Marketing Automation",
    description: "CRM integration and lead nurturing",
    icon: Zap,
    href: "/services#marketing-automation",
  },
];

export default function ServicesTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32">
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
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
            >
              <Link
                href={service.href}
                className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-lg hover:ring-primary/20"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold leading-6 text-gray-900 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          {isInView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                href="/services"
                className="text-base font-semibold leading-7 text-primary hover:text-primary-dark transition-colors"
              >
                View All Services <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}


