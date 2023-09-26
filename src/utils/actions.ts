"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { ADDTWEET, REGISTERMUTATION } from "./queries";
import { gqlClient } from "@/lib/query-client";
import { redirect } from "next/navigation";

export async function createTweet(formData: FormData) {
  const session = await getServerSession(authOptions);
  const content = formData.get("content") as string;
  if (content === "") {
    return;
  }
  const image = formData.get("image") as File;
  await gqlClient.request(
    ADDTWEET,
    image.size !== 0
      ? {
        authorID: session!.user.id,
        content: content,
        file: image,
      }
      : {
        authorID: session!.user.id,
        content: content,
      },
  );
}
export const registerUser = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const avatar = formData.get("avatar") as File;

  try {
    await gqlClient.request(
      REGISTERMUTATION,
      avatar.size !== 0
        ? {
          username: username,
          password: password,
          name: name,
          bio: bio,
          avatar: avatar,
        }
        : {
          username: username,
          password: password,
          name: name,
          bio: bio,
        },
    );
  } catch (err) {
    console.log(err);
    return;
  }

  redirect("/login");
};
