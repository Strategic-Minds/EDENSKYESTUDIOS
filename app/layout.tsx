import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./brand-lock.css";
import "./generated-asset-styles.css";
import "./closet-pwa.css";
import { PwaRegister } from "./pwa-register";

export const metadata: Metadata = {
  title: "Eden Skye Studios",
  description:
    "A governed AI luxury creator studio for products, services, downloads, apps, licensing, and premium digital talent operations.",
  applicationName: "Eden Skye Studios",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Eden Skye"
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
