'use server'
import { BrandsResponse } from '../interface/brandtype'

export default async function getBrands(): Promise<BrandsResponse> {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch brands');
  }
  const payload: BrandsResponse = await res.json();
  return payload;
}