"use client";
import { farwrith } from "@/fonts/fonts";
import MyLink from "../Link/MyLink";

export default function Header() {


  const myLinks = [
    {
      linkPath: "/",
      text: "Home"
    },
    {
      linkPath: "/dashboard",
      text: "Dashboard"
    },
    {
      linkPath: "/posts",
      text: "Posts"
    },
    {
      linkPath: "/about",
      text: "About"
    },
    {
      linkPath: "/login",
      text: "Login"
    },
    {
      linkPath: "/register",
      text: "Register"
    }
  ]

  return (
    <header className={`${farwrith.className} flex flex-row justify-between items-center p-4 bg-neutral-800 gap-2 text-white`}>
      <div className="flex flex-row items-center gap-4">
        {myLinks.slice(0, 4).map((link, index) => (
          <MyLink key={index} linkPath={link.linkPath} text={link.text} />
        ))}
      </div>
      <div className="flex flex-row items-center gap-2">
        {myLinks.slice(4).map((link, index) => (
          <MyLink key={index} linkPath={link.linkPath} text={link.text} />
        ))}
      </div>
    </header>
  );
}
