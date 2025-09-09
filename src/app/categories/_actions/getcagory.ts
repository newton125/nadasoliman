'use server'
import { CategoriesResponse } from "../interface/catgorytype";
export default async function getCatgory(): Promise<CategoriesResponse> {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  const payload: CategoriesResponse = await response.json();
  return payload;
}