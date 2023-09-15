import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useSession } from "next-auth/react";
import { type } from "os";
import React from "react";
import { User } from "react-feather";

interface ProfileCardProps {
  username: string;
  name: string;
  bio: string | null;
  following: number;
  followers: number;
}

export default function ProfileCard({
  username,
  name,
  bio,
  following,
  followers,
}: ProfileCardProps) {
  return (
    <Card className="max-w-sm w-full h-1/3">
      <CardHeader className="flex-col justify-between">
        <div className="flex flex-col justify-center items-center gap-5">
          <Avatar
            className="w-20 h-20 text-large"
            radius="full"
            icon={<User />}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{username}
            </h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-center">
        <p>{bio}</p>
      </CardBody>
      <CardFooter className="gap-3 pb-10">
        <div className="grid grid-cols-2 grid-rows-2 gap-3 w-full mx-7">
          <div className="text-center text-default-500">Followers</div>
          <div className="text-center text-default-500">Following</div>
          <div className="text-center">{followers}</div>
          <div className="text-center">{following}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
