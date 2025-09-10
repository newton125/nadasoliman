import getCatgory from "../_actions/getcagory";
import Image from "next/image";
import { Categorytype } from "../interface/catgorytype";

export default async function Categories() {
  const { data } = await getCatgory();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-6 justify-items-center">
        {data.map((cat: Categorytype) => (
 <div
  key={cat._id}
  className="bg-white w-[100%] sm:w-[350px] md:w-[400px] lg:w-[450px] h-[400px] border border-gray-200 rounded-lg shadow-sm overflow-hidden 
             transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
>
  <a href="#">
    <Image
      className="w-full h-64 sm:h-72 md:h-80 object-cover"
      src={cat.image}
      alt={cat.name}
      width={400}
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
