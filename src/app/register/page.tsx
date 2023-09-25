import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";
import { User } from "react-feather";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { REGISTERMUTATION } from "@/utils/queries";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { gqlClient } from "@/lib/query-client";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

const registerUser = async (formData: FormData) => {
  "use server";
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;

  let user;
  try {
    user = await gqlClient.request(REGISTERMUTATION, {
      username: username,
      password: password,
      name: name,
      bio: bio,
    });
  } catch (err) {
    console.log(err);
    return;
  }

  signIn("credentials", {
    username: user.addUser?.user?.username,
    password: user.addUser?.user?.password,
    callbackUrl: "/",
    redirect: false,
  })
    .then(() => console.log("Logged IN"))
    .catch((err) => console.log(err));
  redirect("/");
};

const Register = async () => {
  // Redirect user if session found
  const user = await getServerSession(authOptions);
  if (user) {
    redirect("/");
  }

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
          <Button type="submit">Register</Button>
          <Link href="/login" as={NextLink}>
            Already have a account?
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
