// src/app/api/set-cookie/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const body = await req.json();
  const { userId } = body;

  if (userId) {
    let response = NextResponse.json({ success: true });

    // api/set-cookie/route.js

    let key = process.env.JWT_KEY;

    let payload = {
      userId: userId,
    };

    let token = jwt.sign(payload, key, { expiresIn: "31d" });

    response.cookies.set({
      name: "session",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 31 * 24 * 60 * 60, // 31 روز بر حسب ثانیه
    });

    return response;
  }
  return NextResponse.json({ success: false });
}
