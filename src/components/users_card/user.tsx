"use client";
import { GETUSER, UPDATEUSER } from "@/utils/queries";
import { useMutation } from "@apollo/client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import React, { useEffect } from "react";
import { User } from "react-feather";

interface UserCardProps {
  current_user_id: string;
  name: string;
  username: string;
  user_id: string;
  reset_is_followed: boolean;
}

const UserCard = ({
  name,
  username,
  user_id,
  current_user_id,
  reset_is_followed,
}: UserCardProps) => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [editUser] = useMutation(UPDATEUSER, {
    refetchQueries: [GETUSER],
  });

  useEffect(() => {
    setIsFollowed(false);
  }, [reset_is_followed]);

  return (
    <>
      <Card className="max-w-sm mb-2 shadow-none border-none">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar radius="full" size="md" icon={<User />} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {name}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @{username}
              </h5>
            </div>
          </div>
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => {
              setIsFollowed(!isFollowed);
              if (!isFollowed) {
                editUser({
                  variables: {
                    user_id: current_user_id,
                    followingToAdd: [user_id],
                  },
                });
              } else {
                editUser({
                  variables: {
                    user_id: current_user_id,
                    followingToRemove: [user_id],
                  },
                });
              }
            }}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </CardHeader>
      </Card>
    </>
  );
};

export default UserCard;
