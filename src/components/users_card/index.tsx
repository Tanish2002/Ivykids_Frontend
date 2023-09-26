"use client";
import UserCard from "./user";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { GETUSERNOTFOLLOWING } from "@/utils/queries";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { gqlClient } from "@/lib/query-client";
import { useSuspenseQuery } from "@tanstack/react-query";

const UsersCard = ({ user_id }: { user_id: string }) => {
  const data = useSuspenseQuery({
    queryKey: ["usersNotFollowing"],
    queryFn: async () => {
      return gqlClient.request(GETUSERNOTFOLLOWING, { user_id: user_id });
    },
  });
  const [resetIsFollowed, setResetIsFollowed] = useState(false);
  return (
    <Card className="max-w-sm">
      <CardHeader className="justify-center">
        <h2 className="text-xl font-bold">Who to Follow</h2>
      </CardHeader>

      <CardBody>
        {data.error ? (
          <div>Error: {`${data.error}`}</div>
        ) : (
          data.data?.usersNotFollowing
            ?.slice(0, 4)
            .map((nonFollower, idx) => (
              <UserCard
                key={idx}
                username={nonFollower?.username!}
                name={nonFollower?.name!}
                user_id={nonFollower?.id!}
                current_user_id={user_id}
                avatar_url={nonFollower?.avatar?.url}
                reset_is_followed={resetIsFollowed}
              />
            ))
        )}
        <Button
          variant="flat"
          onClick={() => {
            data.refetch();
            setResetIsFollowed(!resetIsFollowed);
          }}
        >
          Load More
        </Button>
      </CardBody>
    </Card>
  );
};

export default UsersCard;
