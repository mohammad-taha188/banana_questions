"use client";

import { supabase } from "@/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Header from "./Header";

export default function LoginC() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [passwordError, setPasswordError] = useState(false);
  let [notCompeleted, setNotCompeleted] = useState(false);
  let [error, setError] = useState(false);
  let [success, setSuccess] = useState(false);

  let navigate = useRouter();

  return (
    <div className="flex flex-col justify-between items-center gap-4 shadow shadow-gray-300 rounded-sm px-4 py-5 w-full">
      <input
        type="email"
        className="border border-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300 w-[90%]"
        placeholder="email..."
        name="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        className="border border-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300 w-[90%]"
        placeholder="password"
        name="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Link href={`forget-password`} className="inline m-0 p-0">
        forget password
      </Link>
      <Link href={`sign-up`} className="inline m-0 p-0">
        sign up
      </Link>

      <button
        className="btn btn-green"
        onClick={async () => {
          let { data, error } = await supabase.from("users").select("*");

          if (email && password) {
            let userEmail = data.filter((user) => {
              return user.email == email;
            });

            if (userEmail) {
              if (userEmail[0].password == password) {
                let ID = await userEmail[0].id;

                let res = await fetch("/api/set-cookie", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ userId: ID }),
                  credentials: "include",
                });

                if (res.ok) {
                  const data = await res.json();
                  console.log(data);
                  navigate.replace("/");
                } else {
                  console.log(res);
                }
              } else {
                setPasswordError(true);
                console.log("password not valid");
              }
            }
          } else {
            setNotCompeleted(true);
            console.log("please Compelet all inputs");
          }
        }}
      >
        login
      </button>
    </div>
  );
}
