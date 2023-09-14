"use client";
import TweetInput from "@/components/input_tweet";
import ProfileCard from "@/components/profile_card";
import TweetCard from "@/components/tweet_card";
import UsersCard from "@/components/users_card";
import { getClient } from "@/lib/apollo-client";
import { GETFOLLOWINGTWEETS } from "@/utils/queries";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Spinner } from "@nextui-org/spinner";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect user if no session found
  const user = useSession();
  if (!user.data?.user) {
    redirect("/login");
  }

  const posts = useQuery(GETFOLLOWINGTWEETS, {
    variables: { user_id: user!.data.user.id },
  });
  console.log(posts.data)
  console.log(posts.error)


  return (
    <>
      <div className="grid grid-cols-3">
        <aside>
          <div className="flex flex-col gap-y-9 fixed">
            <ProfileCard />
            <UsersCard />
          </div>
        </aside>
        <main className="flex flex-col gap-y-9 col-span-2">
          {posts.loading ? (
            <Spinner label="Loading..." color="default" />
          ) : (
            posts.data!.tweetsByFollowing?.map((post, idx) => (
              <TweetCard
                key={idx}
                name={post!.author!.name!}
                username={post!.author!.username!}
                content={post!.content!}
                timestamp={post!.createdAt!}
              />
            ))
          )}
        </main>
      </div>
    </>
  );
}
