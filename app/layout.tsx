import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocaleHtmlLang } from "@/components/ui/LocaleHtmlLang";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "WaitLa - Digital Marketing Agency",
  description:
    "Creative digital marketing agency specializing in web development, mobile apps, digital strategy, and media buying.",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LocaleHtmlLang />
        {children}
      </body>
    </html>
  );
}




