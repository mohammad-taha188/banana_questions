"use client"; // Error boundaries must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error }) {
  let navigate = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error);
  }, [error]);

  return (
    <div className="px-4 py-3 border border-gray-200 rounded-sm shadow shadow-gray-100 flex flex-col items-center justify-center gap-5">
      <h2>Something went wrong!</h2>
      <button
        className="btn btn-red"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => navigate.push("/")
        }
      >
        back home
      </button>
    </div>
  );
}
