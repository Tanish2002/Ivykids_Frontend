"use client";

import { HttpLink, createHttpLink, from } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from "@apollo/client/link/context";
import { getSession, useSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri: "https://ivy-backend.onrender.com/graphql",
});
export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
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
      link: from([authMiddleware, httpLink]),
      cache: new NextSSRInMemoryCache(),
    });
  };

  return (
    <ApolloNextAppProvider makeClient={client}>
      {children}
    </ApolloNextAppProvider>
  );
};
