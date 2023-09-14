"use client";

import { HttpLink, from } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from "@apollo/client/link/context";
import { useSession } from "next-auth/react";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAFBASE_API_URL,
});

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  const client = () => {
    const authMiddleware = setContext(async (_, { headers }) => {
      const { data: session } = useSession();
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
