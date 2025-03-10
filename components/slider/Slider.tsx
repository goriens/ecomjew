import ProductItem from '@/components/products/ProductItem';
import CardSlider from '@/components/slider/CardSlider';
import { CarouselItem } from '@/components/ui/carousel';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

import TopRatedHeading from '../heading/Heading';

const Slider = async () => {
  const topRated = await productService.getTopRated();

  return (
    <div className='px-4 py-8 md:px-6 lg:px-8'>
      <TopRatedHeading />
      <CardSlider>
        {topRated.map((product) => (
          <CarouselItem
            key={product.slug}
            className='basis-full px-2 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4'
          >
            <div className='h-full rounded-lg'>
              <ProductItem product={convertDocToObj(product)} />
            </div>
          </CarouselItem>
        ))}
      </CardSlider>
    </div>
  );
};

export default Slider;
