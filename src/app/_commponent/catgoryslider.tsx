// src/app/_component/CategoriesSliderClient.tsx
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'

interface Category { _id: string; name: string; image: string }

export default function CategoriesSliderClient({ categories }: { categories: Category[] }) {
  if (categories.length === 0) {
    return <p className="text-center py-8">No categories found</p>
  }

  const slides: Category[][] = []
  for (let i = 0; i < categories.length; i += 5) {
    slides.push(categories.slice(i, i + 5))
  }

  return (
    <section>
      <h2 className="text-gray-700 mb-4">Shop Popular Categories</h2>
      <div className="bg-light rounded-lg p-4">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1}
          loop
          className="w-full min-h-[200px]"
        >
          {slides.map((group, idx) => (
            <SwiperSlide key={idx}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.map(cat => (
                  <div key={cat._id} className="text-center">
                    <div className="bg-white rounded-md shadow-sm overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        width={220}
                        height={160}
                        className="mx-auto w-full h-[160px] object-cover"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{cat.name}</p>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
