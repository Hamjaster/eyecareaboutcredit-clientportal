import React, { useEffect, useState } from "react";

import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = ["home", "dispute-details", "settings"];
  const formatString = (str: string): string => {
    return str
      .split("-") // Split the string by hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words with a space
  };
  const [activeItem, setActiveItem] = useState("dashboard");
  useEffect(() => {
    console.log(location.pathname);
    console.log(location.pathname.split("/")[2], "current");
    setActiveItem(location.pathname.split("/")[-1]);
  }, [location]);

  return (
    <header className="flex mx-6 justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        <img src={logo} className="w-24" alt="" />
      </div>
      <nav className="flex space-x-2 text-xs">
        {navItems.map((item) => {
          return (
            <Button
              onClick={() => {
                setActiveItem(item);
                navigate(item === "home" ? "/" : `/${item}`);
              }}
              className={` ${
                item === activeItem
                  ? "bg-websitePrimary text-white hover:bg-websitePrimaryDark"
                  : "hover:bg-websitePrimaryLight bg-white text-black"
              }   shadow-none  px-4 py-5 rounded-2xl `}
            >
              {formatString(item)}
            </Button>
          );
        })}
      </nav>
      <div className="flex items-center space-x-4">
        {/* <Bell className="w-6 h-6" /> */}
        <img
          src="https://i.pravatar.cc/300
"
          alt="User avatar"
          className="w-12 h-12 rounded-full"
        />
      </div>
    </header>
  );
}
