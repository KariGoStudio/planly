import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Planly — decide together",
  description: "The easiest way to agree on what to do tonight.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg min-h-screen">{children}</body>
    </html>
  );
}
