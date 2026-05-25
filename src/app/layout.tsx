import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FirebaseProvider from "@/components/FirebaseProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://0xtech.dev"),
  title: {
    default: "0xTech — We Turn Ideas into Products",
    template: "%s | 0xTech",
  },
  description:
    "0xTech builds software products for founders and businesses. Custom development, cloud infrastructure, and end-to-end product engineering.",
  keywords: [
    "software development",
    "custom app development",
    "web development",
    "mobile app development",
    "cloud infrastructure",
    "MVP development",
    "startup tech partner",
    "0xTech",
  ],
  authors: [{ name: "0xTech", url: "https://0xtech.dev" }],
  creator: "0xTech",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://0xtech.dev",
    siteName: "0xTech",
    title: "0xTech — We Turn Ideas into Products",
    description:
      "Got an app idea but no tech team? 0xTech designs, builds, and launches software products — from first prototype to production.",
  },
  twitter: {
    card: "summary_large_image",
    title: "0xTech — We Turn Ideas into Products",
    description:
      "Got an app idea but no tech team? 0xTech designs, builds, and launches software products — from first prototype to production.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "0xTech",
              url: "https://0xtech.dev",
              email: "contactus@0xtech.dev",
              description:
                "0xTech builds software products for founders and businesses. Custom development, cloud infrastructure, and end-to-end product engineering.",
              sameAs: [],
              knowsAbout: [
                "Software Development",
                "Web Applications",
                "Mobile Applications",
                "Cloud Infrastructure",
                "MVP Development",
              ],
              serviceType: [
                "Custom Software Development",
                "Cloud Infrastructure",
                "MVP Development",
                "Technical Consulting",
              ],
            }),
          }}
        />
        <FirebaseProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </FirebaseProvider>
      </body>
    </html>
  );
}
