import React from 'react';
import getProducts from '@/app/apis/product.api';
import { ProductAPI } from '@/app/interfaces/product.interface';
import ProductItem from './Productitem';
export default async function FeaturedProducts() {
    const data: ProductAPI[] = await getProducts();
    // console.log(data)
    return(
<div className='flex flex-wrap'>
{data.map((product: ProductAPI) => <ProductItem key={product._id} prod={product} />)}
</div>
    )
}