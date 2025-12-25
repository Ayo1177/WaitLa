export default function OrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://waitla.com";
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WaitLa",
    url: siteUrl,
    logo: `${siteUrl}/Logo_hand.png`,
    description:
      "Creative digital marketing agency specializing in web development, mobile apps, digital strategy, and media buying.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      // Add your contact info when available
    },
    sameAs: [
      // Add your social media URLs when available
      // "https://www.facebook.com/waitla",
      // "https://www.linkedin.com/company/waitla",
      // "https://twitter.com/waitla",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

