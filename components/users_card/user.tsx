import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import React from "react";

const UserCard = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  return (
    <>
      <Card className="max-w-sm mb-2 shadow-none border-none">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar radius="full" size="md" src="/user.jpg" />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @zoeylang
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
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </CardHeader>
      </Card>
    </>
  );
};

export default UserCard;
