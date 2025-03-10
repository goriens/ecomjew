import { Metadata } from 'next';
import { Suspense } from 'react';

import Carousel, { CarouselSkeleton } from '@/components/carousel/carousel';
import Categories from '@/components/categories/Categories';
import Icons from '@/components/icons/Icons';
import ProductItems, {
  ProductItemsSkeleton,
} from '@/components/products/ProductItems';
import ReadMore from '@/components/readMore/ReadMore';
import Text from '@/components/readMore/Text';
import Slider from '@/components/slider/Slider';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Alankrita - Home',
  description:
    process.env.NEXT_PUBLIC_APP_DESC || 'Alankrita best hand maid jewellery',
};

const HomePage = () => {
  return (
    <div className='flex w-full flex-col gap-4 md:gap-16'>
      <div>
        <Suspense fallback={<CarouselSkeleton />}>
          <Carousel />
        </Suspense>
      </div>
      <Icons />
      <h2 className='mb-4 bg-gradient-to-r from-orange-500 to-purple-900 bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl'>
        CHOOSE OUR COLLECTIONS
      </h2>
      <Categories />
      {/* <Suspense
        fallback={<ProductItemsSkeleton qty={8} name='Latest Products' />}
      >
        <ProductItems />
      </Suspense> */}

      <Suspense fallback={<ProductItemsSkeleton qty={5} name='Top Rated!' />}>
        <Slider />
      </Suspense>

      <ReadMore>
        <Text />
      </ReadMore>
    </div>
  );
};

export default HomePage;
