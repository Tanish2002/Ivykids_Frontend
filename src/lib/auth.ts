import { LOGINMUTATION } from "@/utils/queries";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { gqlClient } from "./query-client";

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
        let user;
        try {
          user = await gqlClient.request(LOGINMUTATION, {
            username: credentials!.username,
            password: credentials!.password,
          });
        } catch (err) {
          console.log(err);
          return null;
        }
        const id = user.loginUser?.user?.id;
        const username = user.loginUser?.user?.username;
        const name = user.loginUser?.user?.name;
        const bio = user.loginUser?.user?.bio;
        const token = user.loginUser?.token;
        const followers = user.loginUser?.user?.followers?.length;
        const following = user.loginUser?.user?.following?.length;

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
    },
  },
};
