import React from "react";
import { NextAuthProvider } from "./nextAuth-provider";
import { UIProvider } from "./nextUI-provider";
import { ApolloWrapper } from "./apollo-provider";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ApolloWrapper>
        <UIProvider>{children}</UIProvider>
      </ApolloWrapper>
    </NextAuthProvider>
  );
}
