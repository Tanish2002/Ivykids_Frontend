import "@/styles/globals.css";
import { Metadata } from "next";
import NavbarComp from "@/components/navbar";
import { Nunito } from "next/font/google";
import { UIProvider } from "@/lib/nextUI-provider";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { NextAuthProvider } from "@/lib/nextAuth-provider";

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

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <NextAuthProvider>
        <ApolloWrapper>{children}</ApolloWrapper>
      </NextAuthProvider>
    </UIProvider>
  );
}
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Adds messages only in a dev environment

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
