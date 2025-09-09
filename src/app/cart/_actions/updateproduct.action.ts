'use server'
import { getTokenAuth } from "@/utlitis/getTokenAuth";

export async function UpdateCount({ productId, count }:{ productId: string; count: number }) {
  const token = await getTokenAuth();

  if (!token) {
    throw new Error("No token found, user not authenticated");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    cache: "no-store",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "token": token, // لازم كده
    },
    body: JSON.stringify({ count }),
  });

  const payload = await res.json();
  return payload;
}
