import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React from "react";

export default function ProfileCard() {
  return (
    <Card className="max-w-[340px]">
      <CardHeader className="flex-col justify-between">
        <div className="flex flex-col justify-center items-center gap-5">
          <Avatar
            className="w-20 h-20 text-large"
            radius="full"
            src="/user.jpg"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              Zoey Lang
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @zoeylang
            </h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-center">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding
          adventure!
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="grid grid-cols-3 grid-rows-2 gap-3 w-full mx-7">
          <div className="text-default-500">Tweets</div>
          <div className="text-default-500">Followers</div>
          <div className="text-default-500">Following</div>
          <div>19</div>
          <div>499</div>
          <div>46</div>
        </div>
      </CardFooter>
    </Card>
  );
}
