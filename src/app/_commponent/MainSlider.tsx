'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';

export default function Slider() {
  // مصفوفة صور الـ Slider
  const sliders = [
    "/images/slider-image-1.jpeg",
    "/images/slider-image-2.jpeg",
    "/images/slider-image-3.jpeg",
  ];

  // مصفوفة صور الـ Blog
  const blogs = [
    "/images/blog-img-1.jpeg",
    "/images/blog-img-2.jpeg",
  ];

  return (
    <div className="lg:flex w-full overflow-hidden">
      {/* الجزء المتحرك - Slider */}
      <div className="w-full lg:w-3/4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
        >
          {sliders.map((src, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={src}
                alt={`Slider Image ${idx + 1}`}
                width={1200}
                height={400}
                className="w-full h-[250px] sm:h-[350px] lg:h-[400px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* الجزء الثابت - Blog */}
      <div className="hidden lg:flex lg:w-1/4 flex-col gap-4">
        {blogs.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Blog Image ${idx + 1}`}
            width={400}
            height={200}
            className="w-full h-[200px] object-cover"
          />
        ))}
      </div>
    </div>
  );
}
