"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { ADDTWEET } from "./queries";
import { gqlClient } from "@/lib/query-client";

export async function createTweet(formData: FormData) {
  const session = await getServerSession(authOptions);
  const content = formData.get("content") as string;
  if (content === "") {
    return;
  }

  await gqlClient.request(ADDTWEET, {
    authorID: session!.user.id,
    content: content,
  });
}
