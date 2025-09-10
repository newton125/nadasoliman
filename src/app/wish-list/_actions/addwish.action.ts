'use server'
import { getTokenAuth } from "@/utlitis/getTokenAuth";

export async function addwish(productId: string) {
  const token = await getTokenAuth();

  if (!token) {
    throw new Error("No token found, user not authenticated");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token": token, // لازم كده
    },
    body: JSON.stringify({ productId }),
  });

  const payload = await res.json();
  return payload;
}
