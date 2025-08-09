import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const userId = cookieStore.get("ID")?.value;

  if (userId) {
    return new Response(JSON.stringify({ userId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ message: "cookie not found" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
