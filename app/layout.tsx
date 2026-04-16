import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe Hub",
  description: "Recipe Hub web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: "#f8f8f8" }}
      >
        <Navbar />
        <div style={{ flex: 1 }}>{children}</div>

        <footer
          style={{
            marginTop: "40px",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#222",
            color: "white",
          }}
        >
          <p style={{ margin: 0 }}>© 2026 Recipe Hub. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}