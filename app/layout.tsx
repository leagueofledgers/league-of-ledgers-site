import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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
      <body>
        {children}
        <a
          className="messenger-chat"
          href="https://m.me/1676529669250949?ref=x1w8bXD4RX7ZX"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on Messenger (opens in a new tab)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.15 2 11.27c0 2.92 1.46 5.53 3.75 7.23V22l3.42-1.88c.9.25 1.85.39 2.83.39 5.52 0 10-4.15 10-9.24S17.52 2 12 2Z" />
            <path fill="#0b3b5c" d="m6.5 14 4-4.25 2.75 2 4.25-2.5-4 4.25-2.75-2Z" />
          </svg>
          <span>Chat on Messenger</span>
        </a>
        <Analytics />
        <Script id="hubspot-chat-settings" strategy="beforeInteractive">
          {`window.hsConversationsSettings = { loadImmediately: false };`}
        </Script>
        <Script
          id="hs-script-loader"
          src="https://js-na2.hs-scripts.com/247697012.js?v=chat-20261018"
          strategy="afterInteractive"
          async
          defer
        />
      </body>
    </html>
  );
}
