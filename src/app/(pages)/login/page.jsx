import LoginC from "@/app/components/LoginC";
import { cookies } from "next/headers";

export default async function Login() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("ID")?.value;

  console.log(userId); 

  return (
    <div className="w-full">
      <LoginC />
    </div>
  );
}
