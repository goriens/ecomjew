'use client';

import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const jewelleryImages = [
  { id: 1, src: '/images/banner/ring1.jpg', alt: 'Diamond Ring' },
  { id: 2, src: '/images/banner/necklace1.jpg', alt: 'Gold Necklace' },
  { id: 3, src: '/images/banner/earrings1.webp', alt: 'Pearl Earrings' },
  { id: 4, src: '/images/banner/bracelet1.jpg', alt: 'Silver Bracelet' },
];

const Carousel = () => {
  return (
    <div className='relative z-0 h-[65vh] w-full'>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white',
        }}
        className='h-full w-full'
      >
        {jewelleryImages.map((image) => (
          <SwiperSlide key={image.id}>
            <div className='group relative h-full w-full'>
              {/* Image */}
              <Image
                src={image.src}
                alt={image.alt}
                className='h-full w-full object-cover blur-sm'
                width={100}
                height={100}
                unoptimized
              />

              <div className='absolute inset-0 bg-opacity-30 bg-gradient-to-r from-yellow-800/50 to-purple-500/10 transition-opacity duration-300 group-hover:bg-opacity-50'></div>
              <div className='absolute inset-0 flex items-center justify-center text-center'>
                <h2 className='text-3xl font-bold text-white sm:text-4xl lg:text-5xl'>
                  {image.alt}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;

export const CarouselSkeleton = () => {
  return <div className='skeleton h-[304px] w-full rounded-lg lg:h-[536px]' />;
};
