"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterQuestions({ filter }) {
  let [filterValue, setFilterValue] = useState();
  let searchParams = useSearchParams();

  useEffect(() => {
    setFilterValue(filter);
  }, []);

  let router = useRouter();
  return (
    <div>
      <select
        onChange={(e) => {
          let params = new URLSearchParams(searchParams.toString());
          params.set("filter", e.target.value);

          router.push(`?${params.toString()}`);
        }}
        value={filter.filter}
        className="outline-0 border border-gray-200 rounded-sm px-2 py-1"
      >
        <option value="view">view</option>
        <option value="like">like</option>
        <option value="disLike">disLike</option>
        <option value="addTime">date</option>
      </select>
    </div>
  );
}
