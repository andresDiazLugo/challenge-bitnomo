import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const inter = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Challenge bitnovo",
  description: "challenge for bitnovo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
        <main className="min-h-screen">
          {
          children
          }
        </main>
        </body>
    </html>
  );
}
