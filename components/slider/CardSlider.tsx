'use client';

import { useState, useEffect } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

interface IProducts {
  children: React.ReactNode;
}

const CardSlider = ({ children }: IProducts) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className='container relative'>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: 'start',
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-2'>{children}</CarouselContent>
        <CarouselPrevious className='absolute left-2 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-white/80 p-1 text-gray-800 shadow-md transition-all duration-300 hover:bg-white/90 hover:shadow-lg sm:flex' />
        <CarouselNext className='absolute right-4 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-white/80 p-1 text-gray-800 shadow-md transition-all duration-300 hover:bg-white/90 hover:shadow-lg sm:flex' />
      </Carousel>
    </div>
  );
};

export default CardSlider;
