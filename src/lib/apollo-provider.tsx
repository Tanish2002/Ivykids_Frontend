"use client";

import { createHttpLink, from } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
import { setVerbosity } from "ts-invariant";

const httpLink = createHttpLink({
  uri: "http://localhost:9090/graphql",
});
export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  setVerbosity("debug");
  const client = () => {
    const authMiddleware = setContext(async (_, { headers }) => {
      const session = await getSession();
      const token = session!.user.token;
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    });

    return new NextSSRApolloClient({
      link:
        typeof window === "undefined"
          ? from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authMiddleware,
            httpLink,
          ])
          : from([authMiddleware, httpLink]),
      cache: new NextSSRInMemoryCache(),
      connectToDevTools: true,
    });
  };

  return (
    <ApolloNextAppProvider makeClient={client}>
      {children}
    </ApolloNextAppProvider>
  );
};
