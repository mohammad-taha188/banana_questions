"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  let navigate = useRouter();
  async function removerCookie() {
    await fetch("/api/remove-cookie");
    navigate.push("/");
  }
  return (
    <div>
      <button
        onClick={() => {
          removerCookie();
        }}
        className="btn btn-red"
      >
        Logout
      </button>
    </div>
  );
}
