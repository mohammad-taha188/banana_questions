"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchQuestions() {
  let [search, setSearch] = useState("");

  let [prevSearch, setprevSearch] = useState("");

  let searchParams = useSearchParams();

  let router = useRouter();

  function searchHandler() {
    let params = new URLSearchParams(searchParams.toString());

    params.set("search", search);

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="w-full my-3 flex gap-3">
      <input
        type="text"
        className="w-full border border-gray-200 shadow shadow-gray-300 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.keyCode == 13) {
            searchHandler();
          }
        }}
        placeholder="search..."
      />
      <button className="btn btn-green" onClick={searchHandler}>
        search
      </button>
    </div>
  );
}
