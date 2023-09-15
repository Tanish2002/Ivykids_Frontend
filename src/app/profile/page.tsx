"use client";
import ProfileCard from "@/components/profile_card";
import TweetCard from "@/components/tweet_card";
import UsersCard from "@/components/users_card";
import { GETUSERTWEETS } from "@/utils/queries";
import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Spinner } from "@nextui-org/spinner";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const user = useSession();

  const {
    data: posts,
    refetch,
    loading,
    error,
    networkStatus,
  } = useQuery(
    GETUSERTWEETS,
    user.data
      ? {
          variables: { user_id: user.data!.user.id },
          notifyOnNetworkStatusChange: true,
          fetchPolicy: "no-cache",
        }
      : { skip: true },
  );

  useEffect(() => {
    if (networkStatus === NetworkStatus.refetch) {
      refetch();
    }
  }, [networkStatus]);

  return (
    <>
      {!user.data || user.status !== "authenticated" ? (
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
            {!posts || loading ? (
              <Spinner label="Loading..." color="default" />
            ) : error ? (
              <div>Error {`${error}`}</div>
            ) : (
              posts.tweets?.map((post, idx) => (
                <TweetCard
                  key={idx}
                  name={user.data.user.name!}
                  username={user.data.user.username!}
                  content={post!.content!}
                  timestamp={post!.createdAt!}
                  userTweet={{
                    tweet_id: post!.id!,
                    refetch: refetch,
                  }}
                />
              ))
            )}
          </main>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
