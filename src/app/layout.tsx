import "@/styles/globals.css";
import { Metadata } from "next";
import NavbarComp from "@/components/navbar";
import { Nunito } from "next/font/google";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Twitter Clone made by Tanish2002",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import React from "react";
import { Providers } from "@/lib/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  loadDevMessages();
  loadErrorMessages();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`min-h-screen font-sans antialiased ${nunito.className}`}
      >
        <Providers>
          <NavbarComp />
          <div className="container mx-auto pt-16 px-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
