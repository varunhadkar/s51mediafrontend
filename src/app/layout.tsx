import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../../context/AuthContext";
import { JsonLd, organizationSchema } from "@/components/JsonLd";
import { SITE } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Per-page titles/descriptions come from buildMetadata() in src/lib/seo.ts.
// The default only applies to pages without their own (e.g. login, dashboard).
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Studio 51 VFX", template: "%s | Studio 51 VFX" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={organizationSchema} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
