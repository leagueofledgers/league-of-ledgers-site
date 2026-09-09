import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "League of Ledgers | Books that move your business forward",
  description: "Modern bookkeeping and financial operations for HVAC and MEP contractors.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
