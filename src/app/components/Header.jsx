"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
// import GetID from "./GetID";

export default function Header() {
  let [userLogin, setUserLogin] = useState("");

  useEffect(() => {
    async function fetchDate() {
      let res = await fetch("/api/get-cookie");

      let data = await res.json();

      setUserLogin(data);
    }

    fetchDate();
  });


  let links = [
    { name: "home", url: "/ " },
    { name: "new", url: "new-question" },
  ];
  return (
    <div
      className={`flex justify-between items-center border border-gray-300 rounded-sm shadow shadow-gray-200 px-4 py-1 my-3 w-full`}
    >
      <div className=" text-2xl select-none cursor-pointer">
        <Link href={`/`}>🍌</Link>
      </div>
      <div className="flex gap-5">
        {links.map((link) => {
          return (
            <Link href={link.url} key={link.name}>
              {link.name}
            </Link>
          );
        })}
        {userLogin.status ? (
          <Link href={"/account"}>account</Link>
        ) : (
          <Link href={"/login"}>login</Link>
        )}
      </div>
    </div>
  );
}
