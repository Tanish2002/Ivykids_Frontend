"use client";
import { GETFOLLOWINGTWEETS, GETUSERTWEETS } from "@/utils/queries";
import { TweetsQuery, FollowingTweetsQuery } from "@/types/gql/graphql";
import TweetCard from "./tweet_card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { gqlClient } from "@/lib/query-client";

function isTweetsQuery(
  query: FollowingTweetsQuery | TweetsQuery,
): query is TweetsQuery {
  return (query as TweetsQuery).tweets !== undefined; // Replace with an actual property check
}
const TweetList = ({
  user_id,
  current_user,
}: {
  user_id: string;
  current_user?: boolean;
}) => {
  const posts = useSuspenseQuery({
    queryKey: ["GETUSERTWEETS"],
    queryFn: async () => {
      if (current_user) return gqlClient.request(GETUSERTWEETS, { user_id });
      return gqlClient.request(GETFOLLOWINGTWEETS, { user_id });
    },
  });

  return (
    <>
      {isTweetsQuery(posts.data) ? (
        posts.error ? (
          <div>Error {`${posts.error}`}</div>
        ) : (
          posts.data?.tweets?.map((post, idx) => (
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
      ) : posts.error ? (
        <div>Error {`${posts.error}`}</div>
      ) : (
        posts.data?.tweetsByFollowing?.map((post, idx) => (
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
