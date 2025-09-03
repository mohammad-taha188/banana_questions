"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";

export default function Sign_upC() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConfirm, setPasswordConfirm] = useState("");
  let [userID, setUserID] = useState("");
  let [date, setDate] = useState("");
  let [isCheck, setIsCheck] = useState(false);
  let [userName, setUserName] = useState("");
  let [code, setCode] = useState();
  let [isClicked, setIsClicked] = useState(false);
  let [passwordError, setPasswordError] = useState(false);
  let [notCompeleted, setNotCompeleted] = useState(false);
  let [error, setError] = useState(false);
  let [success, setSuccess] = useState(false);
  let confirmInput = useRef(null);
  let navigate = useRouter();

  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function generateID() {
    const now = Date.now(); // زمان حال به صورت میلی‌ثانیه
    const random = Math.floor(Math.random() * 100000); // عدد رندوم بین 0 تا 99999
    return `${now}${random}`;
  }

  useEffect(() => {
    setCode(Math.floor(Math.random() * 10000));

    setUserID(generateID());
    setDate(new Date().getTime());
  }, []);

  async function send() {
    setUserName(`${name}_${generateID()}`);
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        title: "banana questions code",
        body: `your code : ${code}`,
      }),
    });

    const data = await res?.json();
    console.log(data);

    res && setIsCheck(true);

    setSuccess(true);
    setError(false);
    setNotCompeleted(false);
    setPasswordError(false);
  }

  function CheckEmail() {
    return (
      <div
        className={`border border-gray-300 shadow shadow-gray-400 rounded-sm px-4 py-3 fixed ${
          isCheck ? "flex" : "hidden"
        } flex-col items-center justify-center z-50 bg-white w-[90%] h-[50%] gap-5`}
      >
        <input
          type="text"
          placeholder="code..."
          className="border border-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300 w-[90%]"
          ref={confirmInput}
        />
        <div className="flex gap-3">
          <button
            className="btn btn-red"
            onClick={() => {
              setIsCheck(false);
              // navigate.push("/");
            }}
          >
            cancel
          </button>
          <button
            className="btn btn-yellow"
            onClick={async () => {
              if (confirmInput.current.value == code) {
                console.log("name : ", name);
                console.log("email : ", email);
                console.log("password : ", password);
                console.log("userID : ", userID);
                console.log("date : ", date);
                console.log("userName : ", userName);

                let { error } = await supabase.from("users").insert({
                  userId: userID,
                  name: name,
                  password: password,
                  userName: userName,
                  email: email,
                  date_add: date,
                  isAdmin: false,
                });

                error ? setError(error) : console.log("good!");
                !error && navigate.replace("/");
              }
            }}
          >
            confirm
          </button>
        </div>
        <p
          onClick={() => {
            send();
          }}
          className="cursor-pointer"
        >
          resend
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-center gap-4 shadow shadow-gray-300 rounded-sm px-4 py-5 w-full">
      <input
        type="text"
        className="border border-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300 w-[90%]"
        placeholder="user name..."
        onChange={(e) => {
          setName(e.target.value);
        }}
        name="name"
      />
      <input
        type="email"
        className="border border-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300 w-[90%]"
        placeholder="email..."
        onChange={(e) => {
          let isValid = regex.test(e.target.value);

          if (isValid) {
            setEmail(e.target.value);
          } else {
            console.log("not valid");
            setEmail("");
          }
        }}
        name="email"
      />
      <input
        type="password"
        className="border border-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300 w-[90%]"
        placeholder="password..."
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        name="password"
      />
      <input
        type="password"
        className="border border-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300 w-[90%]"
        placeholder="confirm password..."
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
        name="password"
      />
      <Link href={`forget-password`} className="inline m-0 p-0">
        forget password
      </Link>
      <Link href={`login`} className="inline m-0 p-0">
        login
      </Link>
      <button
        className="btn btn-green"
        onClick={async () => {
          if (!isClicked) {
            setIsClicked(true);
            if (name && password && email) {
              setUserName(`${name}_${generateID()}`);
              if (password == passwordConfirm) {
                if (userID && date && userName) {
                  try {
                    send();
                  } catch {
                    setError(true);
                    setNotCompeleted(false);
                    setPasswordError(false);
                  }
                } else {
                  setIsCheck(true);
                  setNotCompeleted(false);
                }
              } else {
                setPasswordError(true);
                setNotCompeleted(false);
              }
            } else {
              setNotCompeleted(true);
              setPasswordError(false);
            }
          }
        }}
      >
        sign up
      </button>
      <CheckEmail />
      {notCompeleted && (
        <p className="text-red-500">please Compelet all inputs</p>
      )}
      {error && <p className="text-red-500">sorry! try again</p>}
      {passwordError && (
        <p className="text-red-500">
          password and passwordConfirm not matching!
        </p>
      )}
      {success && <p className="text-green-500">success</p>}
    </div>
  );
}
