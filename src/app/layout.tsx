import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { fontVariables } from "@/lib/fonts";

import "./globals.css";

const TITLE = "Orchid, your personal assistant";
const DESCRIPTION =
  "Orchid is a personal assistant that lives in your messages. It connects your tools, automates your workflows, and handles the busywork so you can focus on what matters.";

export const metadata: Metadata = {
  metadataBase: new URL("https://orchid.ai"),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Orchid",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://orchid.ai" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://orchid.ai",
    images: ["/branded/cta-twilight.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/branded/cta-twilight.jpeg"],
  },
  icons: {
    icon: [
      { url: "/seo/favicon.ico", sizes: "any" },
      { url: "/branded/orchid-icon-3d.png", type: "image/png" },
    ],
    shortcut: "/seo/favicon.ico",
    apple: "/branded/orchid-icon-3d.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
