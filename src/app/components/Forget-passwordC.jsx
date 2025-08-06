"use client";

import Link from "next/link";

export default function ForgetPasswordC() {
  return (
    <div className="flex flex-col justify-between items-center gap-4 shadow shadow-gray-300 rounded-sm px-4 py-5 w-full">
      <input
        type="email"
        className="border border-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300 w-[90%]"
        placeholder="email..."
        name="email"
      />
      <Link href={`login`} className="inline m-0 p-0">
        login
      </Link>
      <Link href={`sign-up`} className="inline m-0 p-0">
        sign up
      </Link>

      <button className="btn btn-green">login</button>
    </div>
  );
}
