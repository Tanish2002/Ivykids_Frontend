"use client";
import { createTweet } from "@/utils/actions";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Textarea } from "@nextui-org/input";
import React, { ChangeEvent, useRef, useState } from "react";
import { Image as ImageIcon, Trash2, Video } from "react-feather";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
const TweetInput = ({ avatar_url }: { avatar_url: string | null }) => {
  const { pending } = useFormStatus();
  const [content, setContent] = useState("");
  const [validation, setValidation] = useState<"valid" | "invalid">("valid");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
    imageRef.current!.value = "";
  };
  return (
    <Card>
      <CardBody className="grid grid-cols-[5fr_95fr]">
        <Avatar className="mr-5 mt-3" src={avatar_url ?? ""} showFallback />
        <form
          action={createTweet}
          onSubmit={(e) => {
            if (content === "") {
              e.preventDefault();
              setValidation("invalid");
              setSelectedImage(null);
              return false;
            }
            setValidation("valid");
            setContent("");
            setSelectedImage(null);
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
                <input
                  className="hidden"
                  ref={imageRef}
                  name="image"
                  id="image-input"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleImageChange}
                  multiple={false}
                  type="file"
                />
              </Button>
              <Button isIconOnly aria-label="Image">
                <label htmlFor="video-input">
                  <Video className="stroke-violet-400" size={20} />
                </label>
                <input
                  className="hidden"
                  name="video"
                  id="video-input"
                  type="file"
                />
              </Button>
            </div>
            <Button
              isLoading={pending}
              isDisabled={pending}
              color={pending ? "secondary" : "primary"}
            >
              {pending ? "Adding" : "Tweet"}
            </Button>
          </div>
          {selectedImage && (
            <div>
              <img src={selectedImage} alt="Selected" />
              <Button isIconOnly onClick={handleRemoveImage}>
                <Trash2 />
              </Button>
            </div>
          )}
        </form>
      </CardBody>
    </Card>
  );
};

export default TweetInput;
