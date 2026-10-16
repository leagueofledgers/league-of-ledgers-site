import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.leagueofledgers.com"),
  title: "Bookkeeping for HVAC Contractors | League of Ledgers",
  description:
    "Monthly bookkeeping, reconciliations, and financial reporting for HVAC, plumbing, electrical, and home-service contractors. Clear books for better decisions.",
  alternates: {
    canonical: "/",
  },
  applicationName: "League of Ledgers",
  icons: {
    icon: "/league-of-ledgers-logo.svg",
    apple: "/league-of-ledgers-logo.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "League of Ledgers",
    title: "Bookkeeping for HVAC Contractors | League of Ledgers",
    description:
      "Monthly bookkeeping, reconciliations, and financial reporting for HVAC, plumbing, electrical, and home-service contractors.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "League of Ledgers bookkeeping for HVAC, plumbing, electrical, and home-service contractors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookkeeping for HVAC Contractors | League of Ledgers",
    description:
      "Monthly bookkeeping, reconciliations, and financial reporting for HVAC, plumbing, electrical, and home-service contractors.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
