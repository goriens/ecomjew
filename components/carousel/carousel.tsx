'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const jewelleryImages = [
  {
    id: 1,
    src: '/images/banner/slide1.jpeg',
    alt: 'Diamond Ring',
    title: 'Elegant Diamond Rings',
    subtitle: 'Timeless beauty for every occasion',
    cta: 'Explore Collection',
  },
  {
    id: 2,
    src: '/images/banner/slide2.jpeg',
    alt: 'Gold Necklace',
    title: 'Luxury Gold Necklaces',
    subtitle: 'Handcrafted perfection for your elegance',
    cta: 'Shop Now',
  },
  {
    id: 3,
    src: '/images/banner/earrings1.webp',
    alt: 'Pearl Earrings',
    title: 'Exquisite Pearl Earrings',
    subtitle: "Nature's elegance for your style",
    cta: 'Discover More',
  },
  {
    id: 4,
    src: '/images/banner/ring1.jpg',
    alt: 'Silver Bracelet',
    title: 'Chic Silver Bracelets',
    subtitle: 'Modern designs for everyday wear',
    cta: 'View Selection',
  },
];

const Carousel = () => {
  return (
    <div className='relative z-0 h-[80vh] w-full overflow-hidden'>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect='fade'
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletClass:
            'swiper-pagination-bullet !bg-white/50 !w-3 !h-3 !mx-1.5',
          bulletActiveClass: '!bg-white !w-8 !opacity-100',
        }}
        className='h-full w-full'
      >
        {jewelleryImages.map((image) => (
          <SwiperSlide key={image.id}>
            <div className='group relative h-full w-full'>
              {/* Image with parallax effect */}
              <div className='absolute inset-0 overflow-hidden'>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className='object-cover transition-transform duration-1000 group-hover:scale-105'
                  quality={100}
                  priority
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
                />
                <div className='absolute inset-0 bg-black/30'></div>
              </div>

              {/* Gradient overlay */}
              <div className='absolute inset-0 bg-gradient-to-t '></div>
              <div className='absolute inset-0 bg-gradient-to-r '></div>

              {/* Content */}
              <div className='container relative z-10 flex h-full items-center'>
                <motion.div
                  className='max-w-2xl text-white'
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.h2
                    className='text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {image.title}
                  </motion.h2>
                  <motion.p
                    className='mt-4 text-lg sm:text-xl'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    {image.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <button className='mt-8 rounded-full bg-white/10 px-8 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:shadow-lg hover:shadow-white/10'>
                      {image.cta}
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Pagination */}
        <div className='swiper-pagination absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 transform items-center justify-center space-x-2'></div>
      </Swiper>
    </div>
  );
};

export default Carousel;

export const CarouselSkeleton = () => {
  return (
    <div className='relative h-[80vh] w-full overflow-hidden bg-gray-200'>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-gray-400 border-t-transparent'></div>
      </div>
    </div>
  );
};
