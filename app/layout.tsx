import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mario Teaches Typing",
  description: "Classic MS-DOS typing tutor running in your browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
