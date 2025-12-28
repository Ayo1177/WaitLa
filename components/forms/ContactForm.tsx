"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import ServiceSelection from "./ServiceSelection";

export default function ContactForm() {
  const t = useTranslations("Contact.form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      services: [],
    },
  });

  const selectedServices = watch("services") || [];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          companyName: "",
          services: [],
          message: "",
          website: "",
        });
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        {...register("website")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("firstName")} <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder={t("placeholder.firstName")}
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
              />
              {errors.firstName && (
                <p id="firstName-error" className="mt-2 text-sm text-red-600" role="alert">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("lastName")} <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder={t("placeholder.lastName")}
                aria-invalid={errors.lastName ? "true" : "false"}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
              />
              {errors.lastName && (
                <p id="lastName-error" className="mt-2 text-sm text-red-600" role="alert">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          {t("email")} <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            type="email"
            id="email"
            {...register("email")}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder={t("placeholder.email")}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          {t("phone")} <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder={t("placeholder.phone")}
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          {t("companyName")}
        </label>
        <div className="mt-2">
          <input
            type="text"
            id="companyName"
            {...register("companyName")}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder={t("placeholder.companyName")}
            aria-invalid={errors.companyName ? "true" : "false"}
            aria-describedby={errors.companyName ? "companyName-error" : undefined}
          />
          {errors.companyName && (
            <p id="companyName-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.companyName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold leading-6 text-gray-900">
          {t("services")}
        </label>
        <Controller
          name="services"
          control={control}
          render={({ field, fieldState }) => (
            <ServiceSelection
              selectedServices={selectedServices}
              onServiceToggle={(serviceKey) => {
                const currentServices = field.value || [];
                const newServices = currentServices.includes(serviceKey)
                  ? currentServices.filter((s) => s !== serviceKey)
                  : [...currentServices, serviceKey];
                field.onChange(newServices);
              }}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          {t("message")}
        </label>
        <div className="mt-2">
          <textarea
            id="message"
            rows={6}
            {...register("message")}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder={t("placeholder.message")}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p
              id="message-error"
              className="mt-2 text-sm text-red-600"
              role="alert"
            >
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      {submitStatus === "success" && (
        <div
          className="rounded-md bg-green-50 p-4"
          role="alert"
          aria-live="polite"
        >
          <p className="text-sm font-medium text-green-800">
            {t("success")}
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div
          className="rounded-md bg-red-50 p-4"
          role="alert"
          aria-live="polite"
        >
          <p className="text-sm font-medium text-red-800">
            {t("error")}
          </p>
        </div>
      )}

      <div>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? t("sending") : t("sendMessage")}
        </Button>
      </div>
    </form>
  );
}









