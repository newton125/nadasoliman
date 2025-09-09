import getsingleProducts from '@/app/apis/singleproduct.api';
import Image from 'next/image';
import ProductItemBtn from "../_components/ProductitemBtn"
import getProductsInCat from '@/app/apis/getProductsincat.api';
import ProductItem from '../_components/Productitem';
import { ProductAPI } from '@/app/interfaces/product.interface';

// ⚠️ متحطيش type strict هنا، خليه any علشان bug Next.js 15
export default async function Productdetails({ params }: any) {
  const id = Array.isArray(params.id) ? params.id : [params.id];

  const product = await getsingleProducts(id[0]);
  const catProduct = await getProductsInCat(id[1]);

  return (
    <div className='flex flex-wrap items-center p-2 lg:mx-90'>
      <div className='w-full md:w-1/3 '>
        <Image
          src={product.imageCover}
          alt={product.title}
          width={300}
          height={300}
          className='object-cover w-full'
        />
      </div>
      <div className='w-full md:w-2/3 px-3'>
        <p className='text-gray-400 my-3'>{product.description}</p>
        <p>{product.category.name}</p>
        <div className="flex justify-between items-center my-3">
          <span>{product.price} EGP</span>
          <span>{product.ratingsAverage}
            <i className="fa-solid fa-star text-rating"></i>
          </span>
        </div>
        <ProductItemBtn id={product._id} />
      </div>

      <h2 className="my-5">Related Product </h2>
      <div className='flex flex-wrap'>
        {catProduct.map((product: ProductAPI) => (
          <ProductItem key={product._id} prod={product} />
        ))}
      </div>
    </div>
  );
}
