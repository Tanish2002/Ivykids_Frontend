"use client";
import { createTweet } from "@/utils/actions";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Textarea } from "@nextui-org/input";
import React, { useState } from "react";
import { Image as ImageIcon, User, Video } from "react-feather";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
const TweetInput = () => {
  const { pending } = useFormStatus();
  const [content, setContent] = useState("");
  const [validation, setValidation] = useState<"valid" | "invalid">("valid");
  return (
    <Card>
      <CardBody className="grid grid-cols-[5fr_95fr]">
        <Avatar className="mr-5 mt-3" icon={<User />} />
        <form
          action={createTweet}
          onSubmit={(e) => {
            if (content === "") {
              e.preventDefault();
              setValidation("invalid");
              return false;
            }
            setValidation("valid");
            setContent("");
            return true;
          }}
        >
          <Textarea
            inputMode="text"
            placeholder="What's happening?!"
            value={content}
            onValueChange={(e) => setContent(e)}
            validationState={validation}
            name="content"
            required
          />
          <div className="flex justify-between mt-2">
            <div className="flex gap-2">
              <Button isIconOnly aria-label="Image">
                <label htmlFor="image-input">
                  <ImageIcon className="stroke-violet-400" size={20} />
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
            {pending ? (
              <Button isLoading isDisabled color="secondary">
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
