"use server";

import { getClient } from "@/lib/apollo-client";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { ADDTWEET } from "./queries";

export async function createTweet(formData: FormData) {
  const session = await getServerSession(authOptions);
  const content = formData.get("content") as string;
  if (content === "") {
    return;
  }

  await getClient().mutate({
    mutation: ADDTWEET,
    variables: { authorID: session!.user.id, content: content },
  });
}
