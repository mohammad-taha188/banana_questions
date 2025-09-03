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
    <div className="max-w-sm w-full mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>

      <input
        type="email"
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lightBlue-400 focus:outline-none transition w-full"
        placeholder="Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lightBlue-400 focus:outline-none transition w-full"
        placeholder="Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex justify-between text-sm text-gray-500">
        <Link
          href="forget-password"
          className="hover:text-lightBlue-600 transition-colors font-medium"
        >
          Forgot Password?
        </Link>
        <Link
          href="sign-up"
          className="hover:text-lightBlue-600 transition-colors font-medium"
        >
          Sign Up
        </Link>
      </div>

      <button
        className="bg-lightBlue-500 hover:bg-lightBlue-600 text-white font-semibold py-2 rounded-lg transition cursor-pointer"
        onClick={async () => {
          let { data, error } = await supabase.from("users").select("*");

          if (email && password) {
            let userEmail = data.filter((user) => user.email === email);

            if (userEmail.length > 0) {
              if (userEmail[0].password === password) {
                let ID = userEmail[0].userId;

                let res = await fetch("/api/set-cookie", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
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
            console.log("please complete all inputs");
          }
        }}
      >
        Login
      </button>

      {notCompeleted && (
        <p className="text-red-500">please Compelet all inputs</p>
      )}
      {error && <p className="text-red-500">sorry! try again</p>}
      {passwordError && <p className="text-red-500">password is wrong!!</p>}
      {success && <p className="text-green-500">success</p>}
    </div>
  );
}
