import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QueueLess AI Inbox",
  description: "AI destekli, insan onaylı başvuru yönetimi demo MVP arayüzü"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
