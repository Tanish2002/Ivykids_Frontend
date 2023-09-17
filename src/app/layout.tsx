import "@/styles/globals.css";
import { Metadata } from "next";
import NavbarComp from "@/components/navbar";
import { Nunito } from "next/font/google";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import React from "react";
import { Providers } from "@/lib/providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const nunito = Nunito({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Twitter Clone made by Tanish2002",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // Need to do this weird redirection coz usePathname isn't available for rsc (https://github.com/vercel/next.js/issues/43704)
  const headersList = headers();
  const pathname = headersList.get("x-pathname") ?? "/";
  if (!session && pathname !== "/login" && pathname !== "/register") {
    redirect("/login");
  }

  loadDevMessages();
  loadErrorMessages();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`min-h-screen font-sans antialiased ${nunito.className}`}
      >
        <Providers session={session!}>
          <NavbarComp />
          <div className="container mx-auto pt-16 px-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
