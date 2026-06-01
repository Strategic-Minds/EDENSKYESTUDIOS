import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eden Skye Studios",
  description:
    "A premium AI creator studio and governed launch system for Eden Skye, AI Can't Do This, and Epoxy Will Change Your Life."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
