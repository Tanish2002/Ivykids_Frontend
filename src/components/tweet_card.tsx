import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { TweetCardDropDown } from "./tweet_card_dropdown";
import { User } from "react-feather";
interface TweetCardProps {
  name: string;
  username: string;
  timestamp: string;
  content: string;
  tweet_id?: string;
}

function getTimeAgo(timestamp: string) {
  const day = moment(parseInt(timestamp));
  const currentTime = moment();
  const duration = moment.duration(currentTime.diff(day));
  const hoursDifference = duration.asHours();
  const formattedDifference = `${Math.floor(hoursDifference)}h ago`;
  return formattedDifference;
}

const TweetCard = ({
  name,
  username,
  timestamp,
  content,
  tweet_id,
}: TweetCardProps) => {
  return (
    <Card className="py-2 px-4 flex flex-col gap-1">
      <CardHeader className="pb-0 pt-2 px-4">
        <div className="flex justify-between w-full">
          <div className="flex flex-row gap-2">
            <Avatar icon={<User />} />
            <p className="font-bold">{name}</p>
            <p className="text-tiny text-default-500">@{username}</p>
            <p className="text-tiny text-default-400">
              {getTimeAgo(timestamp)}
            </p>
          </div>
          {tweet_id && <TweetCardDropDown tweet_id={tweet_id} />}
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible py-2 flex items-center px-8">
        <p>{content}</p>
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
