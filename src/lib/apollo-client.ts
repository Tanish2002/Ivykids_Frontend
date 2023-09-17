import { ApolloLink, createHttpLink } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { setContext } from "@apollo/client/link/context";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
// import { useSession } from "next-auth/react";

export const { getClient } = registerApolloClient(() => {
  const httpLink = createHttpLink({
    uri: "http://localhost:9090/graphql",
  });

  const authLink = setContext(async (_, { headers }) => {
    const session = await getServerSession(authOptions);
    const token = session?.user.token;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink.concat(httpLink),
          ])
        : authLink.concat(httpLink),
    connectToDevTools: true,
  });
});
