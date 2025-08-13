import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const userId = await cookieStore.delete("session")?.value;

  if (userId) {
    return new Response(JSON.stringify({ userId, status: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(
      JSON.stringify({ message: "cookie not found", status: false }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
