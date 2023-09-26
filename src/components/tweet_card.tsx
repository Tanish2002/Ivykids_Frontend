import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import moment from "moment";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import React from "react";
import { TweetCardDropDown } from "./tweet_card_dropdown";
interface TweetCardProps {
  name: string;
  username: string;
  timestamp: string;
  content: string;
  avatar_url: string | null;
  media_url: string | null;
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
  avatar_url,
  media_url,
  tweet_id,
}: TweetCardProps) => {
  console.log("Avatar: ", avatar_url);
  return (
    <Card className="px-2 py-4">
      <CardHeader>
        <div className="flex justify-between w-full gap-4">
          <Avatar src={avatar_url ?? ""} showFallback />
          <div className="grow">
            <h2>{name}</h2>
            <h4 className="text-tiny">@{username}</h4>
            <p className="text-tiny text-default-400">
              {getTimeAgo(timestamp)}
            </p>
          </div>
          {tweet_id && <TweetCardDropDown tweet_id={tweet_id} />}
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible py-2 flex px-8">
        <p className="text-center">{content}</p>
        {media_url && (
          <div className="relative h-72">
            <NextImage
              // as={NextImage}
              alt="Card background"
              className="object-cover rounded-xl"
              loading="lazy"
              src={media_url}
              fill
            />
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default TweetCard;
