"use client";
import { GETFOLLOWINGTWEETS, GETUSERTWEETS } from "@/utils/queries";
import TweetCard from "./tweet_card";
import { useSuspenseQuery } from "@apollo/client";

const TweetList = ({
  user_id,
  current_user,
}: {
  user_id: string;
  current_user?: boolean;
}) => {
  const userPosts = useSuspenseQuery(
    GETUSERTWEETS,
    current_user
      ? {
        variables: { user_id: user_id },
      }
      : { skip: true },
  );
  const followingPosts = useSuspenseQuery(
    GETFOLLOWINGTWEETS,
    !current_user
      ? {
        variables: { user_id: user_id },
      }
      : { skip: true },
  );
  return (
    <>
      {current_user ? (
        userPosts.error ? (
          <div>Error {`${userPosts.error}`}</div>
        ) : (
          userPosts.data.tweets?.map((post, idx) => (
            <TweetCard
              key={idx}
              name={post?.author?.name!}
              username={post?.author?.username!}
              content={post?.content!}
              timestamp={post?.createdAt!}
              tweet_id={post?.id!}
            />
          ))
        )
      ) : followingPosts.error ? (
        <div>Error {`${followingPosts.error}`}</div>
      ) : (
        followingPosts.data.tweetsByFollowing?.map((post, idx) => (
          <TweetCard
            key={idx}
            name={post?.author?.name!}
            username={post?.author?.username!}
            content={post?.content!}
            timestamp={post?.createdAt!}
          />
        ))
      )}
    </>
  );
};

export default TweetList;
