import { UPDATEUSER } from "@/utils/queries";
import { useMutation } from "@apollo/client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import React from "react";
import { User } from "react-feather";

interface UserCardProps {
  session_user_id: string;
  name: string;
  username: string;
  user_id: string;
  refetch: any;
}

const UserCard = ({
  name,
  username,
  refetch,
  user_id,
  session_user_id,
}: UserCardProps) => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [editUser] = useMutation(UPDATEUSER);
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
                    user_id: session_user_id,
                    followingToAdd: [user_id],
                  },
                });
              } else {
                editUser({
                  variables: {
                    user_id: session_user_id,
                    followingToRemove: [user_id],
                  },
                });
              }
              // Refetch new users after 1000ms
              setTimeout(() => {
                refetch();
                setIsFollowed(!isFollowed);
              }, 1000);
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
