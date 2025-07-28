"use client";

import { supabase } from "@/supabase";
import { useEffect, useState } from "react";

export default function NewQuestionC() {
  let [title, setTitle] = useState();
  let [desc, setDesc] = useState();
  let [file, setFile] = useState();
  let [error, setError] = useState();
  function randomID() {
    return `${new Date().getTime()}${Math.floor(Math.random() * 100000)}`;
  }
  return (
    <div className="flex flex-col items-center gap-5">
      {error && (
        <div className="bg-red-500 text-white px-3 py-2 rounded-sm">
          you have error <br /> {error}
        </div>
      )}
      <input
        type="text"
        placeholder="title..."
        className="w-[80%] border-gray-200 rounded-sm shadow shadow-gray-300 px-3 py-2 outline-gray-300"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
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
        onChange={(e) => {
          setFile(e.target.value);
        }}
      />
      <button
        className="btn btn-green"
        onClick={async () => {
          //   let { error } = await supabase.from("questions").insert({
          //     id: randomID(),
          //     title: title,
          //     desc: desc,
          //     userID: 123,
          //     image: null,
          //     addTime: new Date().getTime(),
          //   });
          //   error ? setError(error) : console.log("good!");
          console.log(file);
        }}
      >
        add
      </button>
    </div>
  );
}
