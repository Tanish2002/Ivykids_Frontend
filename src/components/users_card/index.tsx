import React, { useEffect, useState } from "react";
import UserCard from "./user";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { GETUSERNOTFOLLOWING } from "@/utils/queries";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const UsersCard = ({ user_id }: { user_id: string }) => {
  const data = useQuery(GETUSERNOTFOLLOWING, {
    variables: { user_id: user_id },
  });

  return (
    <Card className="max-w-sm max-h-screen">
      <CardHeader className="text-center">
        <h1 className="text-xl font-semibold mt-3">Who to Follow</h1>
      </CardHeader>

      <CardBody>
        {data.loading ? (
          <div>Loading</div>
        ) : data.error ? (
          <div>Error: {`${data.error}`}</div>
        ) : (
          data?.data?.usersNotFollowing
            ?.slice(0, 4)
            .map((nonFollower, idx) => (
              <UserCard
                key={idx}
                username={nonFollower!.username!}
                name={nonFollower!.name!}
                user_id={nonFollower!.id!}
                session_user_id={user_id}
                refetch={data.refetch}
              />
            ))
        )}
      </CardBody>
    </Card>
  );
};

export default UsersCard;
