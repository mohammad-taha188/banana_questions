"use client";

import Link from "next/link";

export default function LoginC() {
  return (
    <div className="flex flex-col justify-between items-center gap-4 shadow shadow-gray-300 rounded-sm px-4 py-5 w-full">
      <input
        type="email"
        className="border border-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300 w-[90%]"
        placeholder="email..."
        name="email"
      />
      <input
        type="password"
        className="border border-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300 w-[90%]"
        placeholder="password"
        name="password"
      />

      <Link href={`forget-password`} className="inline m-0 p-0">
        forget password
      </Link>
      <Link href={`sign-up`} className="inline m-0 p-0">
        sign up
      </Link>

      <button className="btn btn-green">login</button>
    </div>
  );
}
