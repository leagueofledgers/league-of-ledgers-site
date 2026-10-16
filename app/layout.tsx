import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "League of Ledgers | Books that move your business forward",
  description: "Bookkeeping and financial operations for HVAC, MEP, and home-service contractors.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
