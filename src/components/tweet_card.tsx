import { DELETETWEET } from "@/utils/queries";
import { useMutation } from "@apollo/client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { MoreVertical, User } from "react-feather";
interface TweetCardProps {
  name: string;
  username: string;
  timestamp: string;
  content: string;
  userTweet?: {
    tweet_id: string;
    refetch: any;
  };
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
  userTweet,
}: TweetCardProps) => {
  const [deleteTweet] = useMutation(DELETETWEET);

  const menuHandler = (key: React.Key) => {
    switch (key) {
      case "edit":

      case "delete":
        deleteTweet({ variables: { tweet_id: userTweet!.tweet_id } });
        userTweet!.refetch();
    }
  };

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
          {userTweet && (
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                    isIconOnly
                    startContent={<MoreVertical />}
                  />
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Action event example"
                  onAction={(key) => menuHandler(key)}
                >
                  <DropdownItem key="edit">Edit tweet</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Delete tweet
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
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
