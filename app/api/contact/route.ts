import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate form data
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { name, email, phone, message, website } = validationResult.data;

    // Honeypot check - if website field has value, it's spam
    if (website && website.length > 0) {
      return NextResponse.json(
        { error: "Spam detected" },
        { status: 400 }
      );
    }

    // TODO: Phase 1 - Send email via Resend
    // TODO: Phase 2 - Store in Supabase database
    // For now, just log the submission
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      message,
    });

    // Simulate email sending
    // In production, use Resend API:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "contact@waitla.com",
    //   to: "contact@waitla.com",
    //   subject: `New contact form submission from ${name}`,
    //   html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone || "N/A"}</p><p>Message: ${message}</p>`,
    // });

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


