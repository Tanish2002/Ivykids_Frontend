import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Textarea } from "@nextui-org/input";
import React from "react";
import { Image } from "react-feather";

const TweetInput = () => {
  return (
    <Card>
      <CardBody className="grid grid-cols-[5fr_95fr]">
        <Avatar
          className="mr-5 mt-3"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
        <div>
          <Textarea placeholder="What's happening?!" />
          <div className="flex justify-between mt-2">
            <Image className="stroke-violet-400" size={20} />
            <Button color="primary"></Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TweetInput;
