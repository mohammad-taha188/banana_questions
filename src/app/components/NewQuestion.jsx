"use client";

import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import POST from "../api/upload/route";
import Alert from "./Alert";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import GetID from "./GetID";

export default function NewQuestionC() {
  let [title, setTitle] = useState();
  let [desc, setDesc] = useState();
  let [error, setError] = useState();
  let [loading, setLoading] = useState(false);
  let [isUrl, setIsUrl] = useState(true);
  let [isComplete, setIsComplete] = useState(true);
  let [isClicked, setIsClicked] = useState(false);
  let [userLogin, setUserLogin] = useState("");
  let [url, setUrl] = useState([]);
  let navigate = useRouter();

  useEffect(() => {
    async function fetchDate() {
      let res = await fetch("/api/get-cookie");

      let data = await res.json();

      setUserLogin(data);
    }

    fetchDate();
  });

  async function fetchData() {
    let userId = await GetID();

    setIsClicked(true);
    if (!isClicked) {
      setIsComplete(true);
      let { error } = await supabase.from("questions").insert({
        question_id: generateID(),
        title: title,
        desc: desc,
        userID: userId.userId,
        image: JSON.stringify(url),
        addTime: new Date().getTime(),
      });
      error ? setError(error) : console.log("good!");
      !error && navigate.replace("/");
    }
  }

  async function imageHandler(e) {
    const files = Array.from(e.target.files); // همه فایل‌ها

    setLoading(true);

    for (const file of files) {
      const res = await fetch(
        `/api/upload?filename=${generateID()}_${file.name}`,
        {
          method: "POST",
          body: file,
        }
      );

      if (!res.ok) {
        setError(true);
        continue;
      }

      const data = await res.json();
      setUrl((prev) => [...prev, data.url]); // چند URL ذخیره می‌شه
    }

    setLoading(false);
  }

  function generateID() {
    const now = Date.now(); // زمان حال به صورت میلی‌ثانیه
    const random = Math.floor(Math.random() * 100000); // عدد رندوم بین 0 تا 99999
    return `${now}${random}`;
  }
  if (userLogin.status == true) {
    return (
      <div className="flex flex-col items-center gap-5 w-full">
        {error && (
          <Alert
            title={error.message}
            color="bg-red-400"
            textColor="text-white"
            isRemoving={false}
          />
        )}
        <input
          type="text"
          placeholder="title..."
          className="w-[80%] border-gray-200 rounded-sm shadow shadow-gray-300 px-3 py-2 outline-gray-300"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          name="title"
        />
        <textarea
          name=""
          id=""
          placeholder="description..."
          className="w-[80%] h-30 border-gray-200 rounded-sm shadow shadow-gray-300 px-3 py-2 outline-gray-300 resize-none"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        ></textarea>
        <label
          htmlFor="image"
          className="border-gray-300 rounded-sm shadow shadow-gray-200 px-3 py-2 cursor-pointer"
        >
          add Image
        </label>
        <input
          type="file"
          id="image"
          className="hidden"
          multiple
          onChange={(e) => imageHandler(e)}
        />
        {url.length > 0 &&
          url.map((index) => (
            <Alert
              key={index}
              title={`image ${index + 1} added`}
              color="bg-green-400"
              textColor="text-white"
            />
          ))}

        {loading && (
          <Alert
            title="loading"
            color="bg-yellow-400"
            textColor="text-white"
            isRemoving={false}
          />
        )}
        <button
          className={`btn btn-green ${loading && "hidden"}`}
          onClick={async () => {
            if (!title || !desc) {
              setIsComplete(false);
            } else {
              if (url.length == 0) {
                setIsUrl(false);
              } else {
                fetchData();
              }
            }
          }}
        >
          add
        </button>

        <button
          className={`py-2 px-5 rounded-sm shadow-gray-500 bg-gray-500 text-gray-300 outline-1 outline-gray-600 ${
            !loading && "hidden"
          }`}
        >
          loading
        </button>

        {isComplete == false && (
          <p className="text-red-400">pleace complete all inputs</p>
        )}
        {!isUrl && (
          <div className="z-50 border border-gray-200 shadow-gray-100 rounded-sm w-[90%] h-[50%] fixed flex flex-col bg-gray-100 items-center justify-center gap-2">
            <h2>Do you want to continue without a photo?</h2>
            <button
              className="btn btn-red"
              onClick={(e) => {
                setIsUrl(true);
              }}
            >
              cancel
            </button>
            <button
              className="btn btn-green"
              onClick={() => {
                fetchData();
              }}
            >
              continue
            </button>
          </div>
        )}
      </div>
    );
  } else if (userLogin.status == false) {
    return (
      <div className="flex justify-center items-center flex-col gap-12">
        <h2>please first login</h2>
        <button
          className="btn btn-yellow"
          onClick={() => {
            navigate.replace("/login");
          }}
        >
          login
        </button>
      </div>
    );
  } else if (userLogin.status == undefined) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="animate-pulse flex flex-col items-center gap-4 w-full">
          <div className="h-9 bg-slate-400 w-[80%] rounded-md"></div>
          <div className="h-9 bg-slate-400 w-[80%] rounded-md"></div>
          <div className="h-10 bg-slate-400 w-[10%] rounded-md"></div>
          <div className="h-10 bg-slate-400 w-[8%] rounded-md"></div>
        </div>
      </div>
    );
  }
}
