"use client";
import { gqlClient } from "@/lib/query-client";
import { GETUSER } from "@/utils/queries";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function ProfileCard({ user_id }: { user_id: string }) {
  const user = useSuspenseQuery({
    queryKey: ["GETUSER"],
    queryFn: async () => {
      return gqlClient.request(GETUSER, { user_id: user_id });
    },
  });

  const followers = user.data?.user?.followers?.length;
  const following = user.data?.user?.following?.length;
  const avatar_url = user.data.user?.avatar?.url;
  return (
    <Card className="max-w-sm w-full h-1/3 py-2">
      <CardHeader>
        <Avatar
          className="w-20 h-20 mx-auto"
          radius="full"
          src={avatar_url ? avatar_url : ""}
          showFallback
        />
      </CardHeader>

      <CardBody className="text-center overflow-hidden">
        <h4>{user.data?.user?.name}</h4>
        <p className="mb-2 text-small text-default-400">
          @{user.data?.user?.username}
        </p>
        <p>{user.data?.user?.bio}</p>
      </CardBody>

      <CardFooter className="flex flex-row justify-center gap-x-10">
        <div className="text-center">
          <h4 className="text-default-500">Followers</h4>
          <span>{followers}</span>
        </div>
        <Link className="text-center" href="/profile/following">
          <h4 className="text-default-500">Following</h4>
          <span>{following}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
