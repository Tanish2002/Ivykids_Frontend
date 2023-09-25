"use client";
import { gqlClient } from "@/lib/query-client";
import { DELETETWEET, GETUSERTWEETS } from "@/utils/queries";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVertical } from "react-feather";

export const TweetCardDropDown = ({ tweet_id }: { tweet_id: string }) => {
  const queryClient = useQueryClient();
  const deleteTweet = useMutation({
    mutationFn: async () => {
      return gqlClient.request(DELETETWEET, { tweet_id: tweet_id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETUSERTWEETS"] });
    },
  });

  const menuHandler = (key: React.Key) => {
    switch (key) {
      case "edit":

      case "delete":
        deleteTweet.mutate();
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
