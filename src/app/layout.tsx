import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WEDTEC EVENTS | Weddings, thoughtfully created",
  description:
    "Heartfelt wedding planning, thoughtful décor and destination celebrations, made with meaning by WEDTEC EVENTS.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
