import ProductItem from '@/components/products/ProductItem';
import CardSlider from '@/components/slider/CardSlider';
import { CarouselItem } from '@/components/ui/carousel';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

import TopRatedHeading from '../heading/Heading';

const Slider = async () => {
  const topRated = await productService.getTopRated();

  return (
    <div className='px-4 md:px-6 lg:px-8'>
      <TopRatedHeading />
      <CardSlider>
        {/*Wrap for SSR */}
        {topRated.map((product) => (
          <CarouselItem
            key={product.slug}
            className='sm:basis-1/1 md:basis-1/3 lg:basis-1/5'
          >
            <ProductItem product={convertDocToObj(product)} />
          </CarouselItem>
        ))}
      </CardSlider>
    </div>
  );
};

export default Slider;
