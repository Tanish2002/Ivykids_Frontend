"use client";
import TweetInput from "@/components/input_tweet";
import ProfileCard from "@/components/profile_card";
import TweetCard from "@/components/tweet_card";
import UsersCard from "@/components/users_card";
import { GETFOLLOWINGTWEETS } from "@/utils/queries";
import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Spinner } from "@nextui-org/spinner";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // Redirect user if no session found
  const user = useSession();

  if (!user.data?.user) {
    redirect("/login");
  }

  const {
    data: posts,
    networkStatus,
    refetch,
    loading,
    error,
  } = useQuery(
    GETFOLLOWINGTWEETS,
    user.data
      ? {
        variables: { user_id: user.data.user.id },
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
      }
      : { skip: true },
  );

  useEffect(() => {
    if (networkStatus === NetworkStatus.refetch) {
      refetch();
    }
  }, [networkStatus, refetch]);
  return (
    <>
      {!user.data ? (
        <Spinner color="primary" label="Loading..." />
      ) : (
        <div className="grid grid-cols-3">
          <aside>
            <div className="flex flex-col gap-y-9 fixed w-full h-screen">
              <ProfileCard
                username={user.data.user.username}
                name={user.data.user.name}
                following={user.data.user.following}
                followers={user.data.user.following}
                bio={user.data.user.bio}
              />
              <UsersCard user_id={user.data.user.id} />
            </div>
          </aside>
          <main className="flex flex-col gap-y-9 col-span-2">
            <TweetInput />
            {!posts || loading ? (
              <Spinner label="Loading..." color="default" />
            ) : error ? (
              <div>Error {`${error}`}</div>
            ) : (
              posts.tweetsByFollowing?.map((post, idx) => (
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
      )}
    </>
  );
}
