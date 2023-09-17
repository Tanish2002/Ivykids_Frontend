import React from "react";
import { NextAuthProvider } from "./nextAuth-provider";
import { UIProvider } from "./nextUI-provider";
import { ApolloWrapper } from "./apollo-provider";
import { Session } from "next-auth";
export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <NextAuthProvider session={session}>
      <ApolloWrapper>
        <UIProvider>{children}</UIProvider>
      </ApolloWrapper>
    </NextAuthProvider>
  );
}
