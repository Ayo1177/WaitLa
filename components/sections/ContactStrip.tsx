"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactStripFormSchema, type ContactStripFormData } from "@/lib/validations";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactStrip() {
  const t = useTranslations("ContactStrip");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactStripFormData>({
    resolver: zodResolver(contactStripFormSchema),
  });

  const onSubmit = async (data: ContactStripFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact-strip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="relative z-20 py-24 sm:py-32 -mt-1 bg-gradient-to-r from-primary-dark via-primary to-accent-dark">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/90">
              {t("description")}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              {...register("website")}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold leading-6 text-white"
                >
                  {t("form.firstName")} <span className="text-red-300">{t("form.required")}</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-white/20 bg-white/95 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    placeholder={t("form.placeholder.firstName")}
                    aria-invalid={errors.firstName ? "true" : "false"}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="mt-2 text-sm text-red-200" role="alert">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold leading-6 text-white"
                >
                  {t("form.lastName")} <span className="text-red-300">{t("form.required")}</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-white/20 bg-white/95 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    placeholder={t("form.placeholder.lastName")}
                    aria-invalid={errors.lastName ? "true" : "false"}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="mt-2 text-sm text-red-200" role="alert">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-semibold leading-6 text-white"
                >
                  {t("form.companyName")} <span className="text-red-300">{t("form.required")}</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="companyName"
                    {...register("companyName")}
                    className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-white/20 bg-white/95 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    placeholder={t("form.placeholder.companyName")}
                    aria-invalid={errors.companyName ? "true" : "false"}
                    aria-describedby={errors.companyName ? "companyName-error" : undefined}
                  />
                  {errors.companyName && (
                    <p id="companyName-error" className="mt-2 text-sm text-red-200" role="alert">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold leading-6 text-white"
                >
                  {t("form.location")} <span className="text-red-300">{t("form.required")}</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="location"
                    {...register("location")}
                    className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-white/20 bg-white/95 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    placeholder={t("form.placeholder.location")}
                    aria-invalid={errors.location ? "true" : "false"}
                    aria-describedby={errors.location ? "location-error" : undefined}
                  />
                  {errors.location && (
                    <p id="location-error" className="mt-2 text-sm text-red-200" role="alert">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-white"
                >
                  {t("form.email")} <span className="text-red-300">{t("form.required")}</span>
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-white/20 bg-white/95 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    placeholder={t("form.placeholder.email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-200" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold leading-6 text-white"
                >
                  {t("form.phone")} <span className="text-red-300">{t("form.required")}</span>
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-white/20 bg-white/95 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    placeholder={t("form.placeholder.phone")}
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-2 text-sm text-red-200" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {submitStatus === "success" && (
              <div
                className="rounded-md bg-green-500/20 border border-green-400/50 p-4"
                role="alert"
                aria-live="polite"
              >
                <p className="text-sm font-medium text-green-100">
                  {t("form.success")}
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div
                className="rounded-md bg-red-500/20 border border-red-400/50 p-4"
                role="alert"
                aria-live="polite"
              >
                <p className="text-sm font-medium text-red-100">
                  {t("form.error")}
                </p>
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="group w-full sm:w-auto mx-auto block shadow-[0_15px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-shadow duration-300"
              >
                {isSubmitting ? t("form.submitting") : (
                  <>
                    {t("form.submit")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 inline-block" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}


