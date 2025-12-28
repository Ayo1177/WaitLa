import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Please enter a valid phone number"
    ),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  services: z
    .array(z.string())
    .optional()
    .default([]),
  message: z
    .string()
    .max(1000, "Message must be less than 1000 characters")
    .refine(
      (val) => val === "" || val.length >= 10,
      "Message must be at least 10 characters if provided"
    )
    .optional()
    .or(z.literal("")),
  // Honeypot field for spam protection
  website: z.string().max(0, "Spam detected").optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Schema for ContactStrip form (simplified contact form)
export const contactStripFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters"),
  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Please enter a valid phone number"
    ),
  email: z.string().email("Please enter a valid email address"),
  // Honeypot field for spam protection
  website: z.string().max(0, "Spam detected").optional(),
});

export type ContactStripFormData = z.infer<typeof contactStripFormSchema>;


