import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { graphql } from "@/types/gql";
import { LOGINMUTATION } from "@/utils/queries";
import { getClient } from "./apollo-client";

const login = graphql(LOGINMUTATION);

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Custom",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "jsmith@test.pl",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const u = await getClient().mutate({
          mutation: login,
          variables: {
            username: credentials!.username,
            password: credentials!.password,
          },
        });
        if (u.errors) {
          console.log(u.errors);
          return null;
        }
        const id = u.data?.loginUser?.user?.id;
        const username = u.data?.loginUser?.user?.username;
        const name = u.data?.loginUser?.user?.name;
        const bio = u.data?.loginUser?.user?.bio;
        const token = u.data?.loginUser?.token;

        if (id && username && name && token) {
          return {
            id: id,
            username: username,
            name: name,
            bio: bio ?? null,
            token: token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user_id: user.id,
          token: user.token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.token = token.token;
        session.user.id = token.user_id;
      }
      return { ...session };
    },
  },
};
