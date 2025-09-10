import { ProductAPI } from '@/app/interfaces/product.interface';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import  ProductItemBtn from './ProductitemBtn';
import Heartitem from '@/app/wish-list/_components/Heartitem'
export default function ProductItem({prod}: {prod: ProductAPI}) {
  // console.log(prod)
    return(
<>

<div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5">
  <div
    className="p-4 m-2 border-main border rounded-2xl 
               flex flex-col justify-between min-h-[450px]"
  >
    <Heartitem id={prod._id} />

    <Link href={`/products/${prod._id}/${prod.category._id}`}>
      <Image
        width={300}
        height={300}
        src={prod.imageCover}
        className="w-full rounded-lg"
        alt={prod.title}
      />
      <span className="text-main">{prod.category.name}</span>
      <p className="line-clamp-1">{prod.title}</p>

      <div className="flex justify-between my-5 items-center">
        <span>{prod.price} EGP</span>
        {prod.priceAfterDiscount && (
          <span className="line-through text-gray-500">
            {prod.priceAfterDiscount} EGP
          </span>
        )}
        <span>
          {prod.ratingsAverage}{" "}
          <i className="fa-solid fa-star text-rating"></i>
        </span>
      </div>
    </Link>

    <ProductItemBtn id={prod._id} />
  </div>
</div>


</>
    )
} 