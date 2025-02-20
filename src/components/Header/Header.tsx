"use server";

import { farwrith } from "@/fonts/fonts";
import MyLink from "../Link/MyLink";
import getAuthUser from "@/lib/getAuthUser";


export default async function Header() {
  
  const authuser = await getAuthUser();
  console.log(authuser);


  return (
    <header
      className={`${farwrith.className} flex flex-row justify-between items-center p-4 bg-neutral-800 gap-2 text-white`}
    >
      <div className="flex flex-row items-center gap-4">
        <MyLink linkPath="/" text="Home" />
        <MyLink linkPath="/posts" text="Posts" />
        <MyLink linkPath="/about" text="About" />

      </div>
      <div className="flex flex-row items-center gap-2">
        {authuser ? (
          <MyLink linkPath="/account" text="Account" />
        ): (
          <>
          <MyLink linkPath="/login" text="Login" />
          <MyLink linkPath="/register" text="Register" />
          </>
        )}
      </div>
    </header>
  );
}
