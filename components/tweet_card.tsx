import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import Image from "next/image";
import React from "react";

const TweetCard = () => {
  return (
    <Card className="py-2 px-4 flex flex-col gap-1">
      <CardHeader className="pb-0 pt-2 px-4">
        <div className="flex flex-row gap-2">
          <Avatar src="/user.jpg" />
          <p className="font-bold">Zoey Lang</p>
          <p className="text-tiny text-default-500">@zoeylang</p>
          <p className="text-tiny text-default-400"> 16h Ago</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible py-2 flex items-center px-8">
        <p>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat. cillum sint consectetur cupidatat.
        </p>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/large.jpg"
          width={250}
          height={800}
        />
      </CardBody>
    </Card>
  );
};

export default TweetCard;
