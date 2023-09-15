import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";
import { User } from "react-feather";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { REGISTERMUTATION } from "@/utils/queries";
import { getClient } from "@/lib/apollo-client";
import { getServerSession } from "next-auth";

const registerUser = async (formData: FormData) => {
  "use server";
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;

  const user = await getClient().mutate({
    mutation: REGISTERMUTATION,
    variables: {
      username: username,
      password: password,
      name: name,
      bio: bio,
    },
  });

  if (user.errors) {
    console.log(user.errors);
    return;
  }

  signIn("credentials", {
    username: user.data!.addUser?.user?.username,
    password: user.data!.addUser?.user?.password,
    callbackUrl: "/",
    redirect: false,
  })
    .then(() => console.log("Logged IN"))
    .catch((err) => console.log(err));
  redirect("/");
};

const Register = async () => {
  // Redirect user if session found
  const user = await getServerSession();
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
        </form>
      </div>
    </>
  );
};

export default Register;
