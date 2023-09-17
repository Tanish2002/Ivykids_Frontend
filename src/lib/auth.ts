import { LOGINMUTATION } from "@/utils/queries";
import { useMutation } from "@apollo/client";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getClient } from "./apollo-client";
import { signOut } from "next-auth/react";

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
          mutation: LOGINMUTATION,
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
        const followers = u.data?.loginUser?.user?.followers?.length;
        const following = u.data?.loginUser?.user?.following?.length;

        if (
          id &&
          username &&
          name &&
          token &&
          following != undefined &&
          followers != undefined
        ) {
          return {
            id: id,
            username: username,
            name: name,
            bio: bio ?? null,
            token: token,
            followers: followers,
            following: following,
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
          user: user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.token = token.user.token;
        session.user.id = token.user.id;
        session.user.username = token.user.username;
        session.user.name = token.user.name;
        session.user.bio = token.user.bio;
        session.user.followers = token.user.followers;
        session.user.following = token.user.following;
      }
      return { ...session };
    },
  },
  events: {
    async signOut() {
      console.log("Signing OUT");
      await getClient().resetStore();
    },
  },
};
