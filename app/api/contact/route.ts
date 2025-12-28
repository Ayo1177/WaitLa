import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { neon } from "@neondatabase/serverless";

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

    const { firstName, lastName, email, phone, companyName, services, message, website } = validationResult.data;

    // Honeypot check - if website field has value, it's spam
    if (website && website.length > 0) {
      return NextResponse.json(
        { error: "Spam detected" },
        { status: 400 }
      );
    }

    // Store in Neon database
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }

    const sql = neon(process.env.DATABASE_URL);
    await sql`
      INSERT INTO contact_submissions (
        first_name,
        last_name,
        email,
        phone,
        company_name,
        services,
        message
      ) VALUES (
        ${firstName},
        ${lastName},
        ${email},
        ${phone},
        ${companyName || null},
        ${services && services.length > 0 ? services : null},
        ${message || null}
      )
    `;

    // TODO: Phase 1 - Send email via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // const servicesList = services && services.length > 0 
    //   ? services.join(", ") 
    //   : "None selected";
    // await resend.emails.send({
    //   from: "contact@waitla.com",
    //   to: "contact@waitla.com",
    //   subject: `New contact form submission from ${firstName} ${lastName}`,
    //   html: `<p>First Name: ${firstName}</p><p>Last Name: ${lastName}</p><p>Email: ${email}</p><p>Phone: ${phone || "N/A"}</p><p>Company: ${companyName || "N/A"}</p><p>Services: ${servicesList}</p><p>Message: ${message}</p>`,
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









