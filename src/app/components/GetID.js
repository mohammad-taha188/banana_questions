import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function GetID() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session")?.value;
  let key = process.env.JWT_KEY;

  if (userId) {
    return jwt.verify(userId, key);
  } else {
    return null;
  }
}
