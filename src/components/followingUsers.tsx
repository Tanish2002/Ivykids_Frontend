"use client";
import UserCard from "./users_card/user";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { GETUSER, GETUSERNOTFOLLOWING } from "@/utils/queries";
import { Button } from "@nextui-org/button";
import { ChangeEvent, useState } from "react";
import { gqlClient } from "@/lib/query-client";
import { useSuspenseQuery } from "@tanstack/react-query";

const FollowingUsersCard = ({ user_id }: { user_id: string }) => {
  const data = useSuspenseQuery({
    queryKey: ["GETUSER"],
    queryFn: async () => {
      return gqlClient.request(GETUSER, { user_id: user_id });
    },
  });
  const [resetIsFollowed, setResetIsFollowed] = useState(false);
  return (
    <Card className="max-w-sm max-h-screen">
      <CardHeader className="text-center">
        <h1 className="text-xl font-semibold mt-3">Following</h1>
        <Button
          variant="flat"
          onClick={() => {
            data.refetch();
            setResetIsFollowed(!resetIsFollowed);
          }}
        >
          Refresh
        </Button>
      </CardHeader>

      <CardBody>
        {data.error ? (
          <div>Error: {`${data.error}`}</div>
        ) : (
          data.data?.user?.following!.map((nonFollower, idx) => (
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
      </CardBody>
    </Card>
  );
};

export default FollowingUsersCard;
