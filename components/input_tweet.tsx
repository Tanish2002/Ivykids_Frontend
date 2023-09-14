import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Textarea } from "@nextui-org/input";
import React from "react";
import { Image, Video } from "react-feather";

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
            <div className="flex gap-2">
              <Button isIconOnly aria-label="Image">
                <label htmlFor="image-input">
                  <Image className="stroke-violet-400" size={20} />
                </label>
                <input className="hidden" id="image-input" type="file" />
              </Button>
              <Button isIconOnly aria-label="Image">
                <label htmlFor="video-input">
                  <Video className="stroke-violet-400" size={20} />
                </label>
                <input className="hidden" id="video-input" type="file" />
              </Button>
            </div>
            <Button color="primary">Tweet</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TweetInput;
