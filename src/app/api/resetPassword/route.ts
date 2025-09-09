import { NextResponse } from "next/server";
import { EncryptJWT } from "jose";

const secret = new TextEncoder().encode(process.env.RESET_SECRET_KEY!);

async function encrypt(text: string) {
  return await new EncryptJWT({ token: text })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .encrypt(secret);
}

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error("Reset API returned non-JSON:", text);
    return NextResponse.json({ error: "Invalid response from upstream" }, { status: 500 });
  }

  if (data.token) {
    data.token = await encrypt(data.token); // 🔐 تشفير التوكن
  }

  return NextResponse.json(data);
}
