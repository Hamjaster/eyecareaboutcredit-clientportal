"use client";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, User2Icon, X } from "lucide-react";
import { useAppSelector } from "@/store/store";

import logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NotificationsBell from "./Notifications";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
    "dashboard",
    "messages",
    "dispute-details",
    "settings",
    "billings",
  ];
  const { profile } = useAppSelector((state) => state.profile);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);

  const formatString = (str: string): string => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    console.log(location.pathname);
    console.log(location.pathname.split("/")[2], "current");
    setActiveItem(location.pathname.split("/")[-1]);
  }, [location]);

  const handleNavigation = (item: string) => {
    setActiveItem(item);
    navigate(item === "dashboard" ? "/dashboard" : `/dashboard/${item}`);
    setIsOpen(false);
  };

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-4 md:px-6 md:py-6">
      <div className="flex items-center space-x-2">
        <img src={logo} className="w-24" alt="Logo" />
      </div>
      <nav className="hidden md:flex space-x-2 text-xs">
        {navItems.map((item) => (
          <Button
            key={item}
            onClick={() => handleNavigation(item)}
            className={`${
              item === activeItem
                ? "bg-websitePrimary text-white hover:bg-websitePrimaryDark"
                : "hover:bg-websitePrimaryLight bg-white text-black"
            } shadow-none px-4 py-5 rounded-2xl`}
          >
            {formatString(item)}
          </Button>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <NotificationsBell />
        <Avatar
          onClick={() => navigate("/dashboard/settings")}
          className="w-10 bg-white border shadow-md h-10 cursor-pointer"
        >
          <AvatarImage src={profile?.avatar || ""} alt="User Avatar" />
          <AvatarFallback>
            <User2Icon />
          </AvatarFallback>
        </Avatar>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-6">
              {navItems.map((item) => (
                <Button
                  key={item}
                  onClick={() => handleNavigation(item)}
                  className={`${
                    item === activeItem
                      ? "bg-websitePrimary text-white hover:bg-websitePrimaryDark"
                      : "hover:bg-websitePrimaryLight bg-white text-black"
                  } shadow-none px-4 py-5 rounded-2xl w-full justify-start`}
                >
                  {formatString(item)}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
