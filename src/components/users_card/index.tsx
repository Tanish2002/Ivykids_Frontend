"use client";
import UserCard from "./user";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { GETUSERNOTFOLLOWING } from "@/utils/queries";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const UsersCard = ({ user_id }: { user_id: string }) => {
  const data = useSuspenseQuery(GETUSERNOTFOLLOWING, {
    variables: { user_id: user_id },
  });

  const [resetIsFollowed, setResetIsFollowed] = useState(false); // Add this state
  return (
    <Card className="max-w-sm max-h-screen">
      <CardHeader className="text-center">
        <h1 className="text-xl font-semibold mt-3">Who to Follow</h1>
      </CardHeader>

      <CardBody>
        {data.error ? (
          <div>Error: {`${data.error}`}</div>
        ) : (
          data.data.usersNotFollowing
            ?.slice(0, 4)
            .map((nonFollower, idx) => (
              <UserCard
                key={idx}
                username={nonFollower?.username!}
                name={nonFollower?.name!}
                user_id={nonFollower?.id!}
                current_user_id={user_id}
                reset_is_followed={resetIsFollowed}
              />
            ))
        )}
        <Button
          variant="flat"
          onClick={() => {
            data.refetch({ user_id: user_id });
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
