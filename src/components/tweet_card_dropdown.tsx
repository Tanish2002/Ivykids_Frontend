"use client";
import { DELETETWEET, GETUSERTWEETS } from "@/utils/queries";
import { useMutation } from "@apollo/client";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { MoreVertical } from "react-feather";

export const TweetCardDropDown = ({ tweet_id }: { tweet_id: string }) => {
  const [deleteTweet] = useMutation(DELETETWEET, {
    variables: { tweet_id: tweet_id },
  });
  const menuHandler = (key: React.Key) => {
    switch (key) {
      case "edit":

      case "delete":
        deleteTweet({
          refetchQueries: [GETUSERTWEETS, "Tweets"],
        });
    }
  };
  return (
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
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete tweet
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
