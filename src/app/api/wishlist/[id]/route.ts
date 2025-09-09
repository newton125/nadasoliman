import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function DELETE(req: NextRequest, { params }: any) {
  const { id } = params;

  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      method: "DELETE",
      headers: {
        token: token.token as string,
      },
    }
  );

  const payload = await res.json();
  return NextResponse.json(payload, { status: res.status });
}
