import getBrands from "../_actions/getbrand";
import Image from "next/image";
import { BrandType } from "../interface/brandtype";


export default async function Brands() {
  const { data } = await getBrands();

  return (
    <>
      <h1 className="text-main m-5 text-2xl font-bold">All Brands</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 my-6 justify-items-center">
        {data.map((cat: BrandType) => (
          <div
            key={cat._id}
            className="bg-white w-[370px] h-[400px] border border-gray-200 rounded-lg shadow-sm overflow-hidden
                       transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <a href="#">
              <Image
                className="w-full h-80 object-cover"
                src={cat.image}
                alt={cat.name}
                width={300}
                height={500}
              />
            </a>
            <div className="p-5">
              <h5 className="mb-2 text-xl font-semibold tracking-tight text-center text-main">
                {cat.name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
