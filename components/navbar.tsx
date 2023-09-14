"use client";
import React from "react";
import { Home, LogOut, MoreHorizontal, Twitter, User } from "react-feather";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

export default function NavbarComp() {
  return (
    <Navbar>
      <NavbarBrand>
        <Twitter className="fill-blue-500 stroke-none" size={30} />
        <Home className="stroke-blue-500 ml-3 mr-2" size={20} />
        <div className="font-bold text-inherit text-xl text-blue-500">Home</div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link color="foreground" href="#">
            <Button
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              startContent={<User />}
              radius="sm"
              variant="light"
            >
              Profile
            </Button>
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                startContent={<MoreHorizontal />}
                radius="sm"
                variant="light"
              >
                More
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="More Options"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem key="logout" startContent={<LogOut />}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
