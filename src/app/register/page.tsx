"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { ChangeEvent, useRef, useState } from "react";
import { Trash2, User } from "react-feather";

import { Image as ImageIcon } from "react-feather";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { registerUser } from "@/utils/actions";

const Register = () => {
  // Redirect user if session found
  const user = useSession();
  if (user.data) {
    redirect("/");
  }

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
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">Register</h1>
        <form
          action={registerUser}
          className="flex flex-col items-center gap-4"
        >
          <Input
            isRequired
            label="Username"
            name="username"
            variant="bordered"
            placeholder="Enter your Username"
            labelPlacement="outside"
            endContent={<User />}
            className="max-w-xs"
          />
          <Input
            isRequired
            label="Password"
            name="password"
            variant="bordered"
            placeholder="Enter your password"
            labelPlacement="outside"
            endContent={<button className="focus:outline-none"></button>}
            type={"text"}
            className="max-w-xs"
          />

          <Input
            isRequired
            label="Name"
            name="name"
            variant="bordered"
            placeholder="Enter your Name"
            labelPlacement="outside"
            className="max-w-xs"
          />

          <Input
            isRequired
            label="Bio"
            name="bio"
            variant="bordered"
            placeholder="Enter your Bio"
            labelPlacement="outside"
            className="max-w-xs"
          />
          <Button aria-label="Image">
            <label htmlFor="avatar" className="flex gap-2">
              <span>Avatar? </span>
              <ImageIcon className="stroke-violet-400" size={20} />
            </label>
            <input
              className="hidden"
              name="avatar"
              ref={imageRef}
              id="avatar"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
              multiple={false}
              type="file"
            />
          </Button>
          <Button type="submit">Register</Button>
          <Link href="/login" as={NextLink}>
            Already have a account?
          </Link>

          {selectedImage && (
            <div>
              <img src={selectedImage} alt="Selected" />
              <Button isIconOnly onClick={handleRemoveImage}>
                <Trash2 />
              </Button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
