import FollowingUsersCard from "@/components/followingUsers";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const FollowingUsers = async () => {
  const session = await getServerSession(authOptions);
  const user_id = session!.user.id;

  return (
    <>
      <FollowingUsersCard user_id={user_id} />
    </>
  );
};

export default FollowingUsers;
