import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth";
import { AwesomeGraphQLClient } from "awesome-graphql-client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql/language/printer";

export const gqlClient = new AwesomeGraphQLClient({
  endpoint: "http://localhost:9090/graphql",
  fetch: async (url: string, { ...options }: RequestInit = {}) => {
    const session =
      typeof window === "undefined"
        ? await getServerSession(authOptions)
        : await getSession();
    const token = session?.user.token;
    return fetch(url, {
      ...options,
      keepalive: true,
      headers: { ...options.headers, authorization: `Bearer ${token}` },
    });
  },
  formatQuery: (query: TypedDocumentNode) => print(query),
});
