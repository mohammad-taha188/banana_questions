import LoginC from "@/app/components/LoginC";
import { cookies } from "next/headers";

export default async function Login() {
  let res = await fetch("http://192.168.1.10:3000/api/get-cookie/", {
    method: "GET",
    credentials: "include", // خیلی مهم! کوکی رو ضمیمه می‌کنه
  });

  let userId = await res.json();
  console.log(userId);

  return (
    <div className="w-full">
      <LoginC />
    </div>
  );
}
