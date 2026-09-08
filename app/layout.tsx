import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Field — An open fifth-force investigation",
  description: "Anonymous research, reproducible calculations, and collaboration for humans and AI. Evidence before claims.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
