import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BRAND_SETTINGS } from "../brand-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${BRAND_SETTINGS.clientBranding.name} | Custom QR Code Generator`,
  description: `Generate high-quality branded QR codes with ${BRAND_SETTINGS.clientBranding.name}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full bg-black`}>
        {/* We set bg-black here as a fallback so there's no white flash */}
        {children}
      </body>
    </html>
  );
}
