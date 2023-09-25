"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";
import { Eye, EyeOff, User } from "react-feather";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
const loginUser = (formData: FormData) => {
  const username = formData.get("username");
  const password = formData.get("password");
  signIn("credentials", {
    username: username,
    password: password,
    callbackUrl: "/",
  })
    .then(() => console.log("Logged IN"))
    .catch((err) => console.log(err));
};

const Login = () => {
  // Redirect user if session found
  const user = useSession();
  if (user.data?.user) {
    redirect("/");
  }

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">Login</h1>
        <form action={loginUser} className="flex flex-col items-center gap-4">
          <Input
            isRequired
            label="Username"
            name="username"
            variant="bordered"
            placeholder="yourUsername"
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
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? <EyeOff /> : <Eye />}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
          />
          <Button type="submit">Login</Button>
          <Link href="/register" as={NextLink}>
            Register
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
