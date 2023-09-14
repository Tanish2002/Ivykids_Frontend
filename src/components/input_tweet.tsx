import { ADDTWEET } from "@/utils/queries";
import { useMutation } from "@apollo/client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Textarea } from "@nextui-org/input";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Image, Video } from "react-feather";

const TweetInput = () => {
  const { data: session } = useSession();
  const [content, setContent] = useState("");

  const [addTweet, { loading }] = useMutation(ADDTWEET);

  return (
    <Card>
      <CardBody className="grid grid-cols-[5fr_95fr]">
        <Avatar
          className="mr-5 mt-3"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTweet({
              variables: { authorID: session!.user.id, content: content },
            });
          }}
        >
          <Textarea
            inputMode="text"
            placeholder="What's happening?!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            isRequired
          />
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
            {loading ? (
              <Button isLoading color="secondary">
                Adding
              </Button>
            ) : (
              <Button type="submit" color="primary">
                Tweet
              </Button>
            )}
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default TweetInput;
