import { NextRequest, NextResponse } from "next/server";
import { contactStripFormSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate form data
    const validationResult = contactStripFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { firstName, lastName, companyName, location, phone, email, website } = validationResult.data;

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
    console.log("Contact strip form submission:", {
      firstName,
      lastName,
      companyName,
      location,
      phone,
      email,
    });

    // Simulate email sending
    // In production, use Resend API:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "contact@waitla.com",
    //   to: "contact@waitla.com",
    //   subject: `New contact form submission from ${firstName} ${lastName} - ${companyName}`,
    //   html: `
    //     <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    //     <p><strong>Company:</strong> ${companyName}</p>
    //     <p><strong>Location:</strong> ${location}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //   `,
    // });

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact strip form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

