'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import slider1 from '../../assets/images/slider-image-1.jpeg';
import slider2 from '../../assets/images/slider-image-2.jpeg';
import slider3 from '../../assets/images/slider-image-3.jpeg';
import blog1 from '../../assets/images/blog-img-1.jpeg';
import blog2 from '../../assets/images/blog-img-2.jpeg';
import Image from 'next/image';

export default function Slider() {
  return (
    <div className="lg:flex w-full overflow-hidden">
      
      {/* Swiper الجزء المتحرك */}
      <div className="w-full lg:w-3/4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          slidesPerView={1}
        >
          <SwiperSlide>
            <Image
              src={slider1}
              className="w-full h-[250px] sm:h-[350px] lg:h-[400px] object-cover"
              alt="Slider Image 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={slider2}
              className="w-full h-[250px] sm:h-[350px] lg:h-[400px] object-cover"
              alt="Slider Image 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={slider3}
              className="w-full h-[250px] sm:h-[350px] lg:h-[400px] object-cover"
              alt="Slider Image 3"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Blog الجزء الثابت (مخفي في الموبايل) */}
      <div className="hidden lg:flex lg:w-1/4 flex-col">
        <Image
          className="w-full h-[200px] object-cover"
          src={blog1}
          alt="Blog Image 1"
        />
        <Image
          className="w-full h-[200px] object-cover"
          src={blog2}
          alt="Blog Image 2"
        />
      </div>
    </div>
  );
}
