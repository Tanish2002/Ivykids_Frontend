import React from "react";
import UserCard from "./user";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

const UsersCard = () => {
  return (
    <Card className="max-w-sm">
      <CardHeader className="text-center">
        <h1 className="text-xl font-semibold mt-3">Who to Follow</h1>
      </CardHeader>
      <CardBody>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </CardBody>
    </Card>
  );
};

export default UsersCard;
