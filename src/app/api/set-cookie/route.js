// src/app/api/set-cookie/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { userId } = body;

  if (userId) {
    let response = NextResponse.json({ success: true });

    // api/set-cookie/route.js
    response.cookies.set({
      name: "ID",
      value: userId,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // یک روز
    });

    return response;
  }
  return NextResponse.json({ success: false });
}
