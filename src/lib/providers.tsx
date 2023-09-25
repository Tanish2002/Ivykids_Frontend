import React from "react";
import { NextAuthProvider } from "./nextAuth-provider";
import { UIProvider } from "./nextUI-provider";
import { Session } from "next-auth";
import QueryWrapper from "./query-provider";
export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <NextAuthProvider session={session}>
      <QueryWrapper>
        <UIProvider>{children}</UIProvider>
      </QueryWrapper>
    </NextAuthProvider>
  );
}
