"use client";

import Link from "next/link";

export default function ForgetPasswordC() {
  return (
    <div className="max-w-sm w-full mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl flex flex-col gap-5">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Forget Password
      </h2>

      <input
        type="email"
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lightBlue-400 focus:outline-none transition w-full"
        placeholder="Enter your email"
        name="email"
      />

      <div className="flex justify-between text-sm text-gray-500">
        <Link
          href="login"
          className="hover:text-lightBlue-600 transition-colors font-medium"
        >
          Login
        </Link>
        <Link
          href="sign-up"
          className="hover:text-lightBlue-600 transition-colors font-medium"
        >
          Sign Up
        </Link>
      </div>

      <button className="bg-lightBlue-500 hover:bg-lightBlue-600 text-white font-semibold py-2 rounded-lg transition cursor-pointer">
        Login
      </button>
    </div>
  );
}
