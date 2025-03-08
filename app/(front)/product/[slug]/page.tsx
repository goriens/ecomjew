import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlaiceholder } from 'plaiceholder';

import AddToCart from '@/components/products/AddToCart';
import { Rating } from '@/components/products/Rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const product = await productService.getBySlug(params.slug);

  console.log(product);

  if (!product) {
    return notFound();
  }

  const buffer = await fetch(product.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className='container mx-auto p-4'>
      {/* Back Button */}
      <div className='mb-6'>
        <Link href='/'>
          <Button
            variant='outline'
            className='flex items-center gap-2 transition-colors hover:bg-gray-100'
          >
            <span>←</span>
            <span>Back to Products</span>
          </Button>
        </Link>
      </div>

      {/* Product Grid */}
      <div className='flex flex-col gap-8 lg:flex-row'>
        {/* Product Image */}
        <div className='lg:w-1/2'>
          <div className='relative aspect-square overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105'>
            <Image
              src={product.image}
              alt={product.name}
              placeholder='blur'
              blurDataURL={base64}
              width={600}
              height={600}
              sizes='100vw'
              className='h-full w-full object-cover'
            />
          </div>
        </div>

        {/* Product Details and Price Card */}
        <div className='lg:w-1/2'>
          <div className='flex flex-col gap-8'>
            {/* Product Details */}
            <div className='space-y-6'>
              {/* Product Title */}
              <h1 className='text-3xl font-bold text-gray-900'>
                {product.name}
              </h1>

              {/* Rating */}
              <div className='flex items-center gap-2'>
                <Rating
                  value={product.rating}
                  caption={`${product.numReviews} ratings`}
                />
                <Badge variant='secondary' className='text-sm'>
                  {product.numReviews} Reviews
                </Badge>
              </div>

              {/* Brand and Category */}
              <div className='space-y-2'>
                <p className='text-sm text-gray-600'>
                  <span className='font-semibold'>Brand:</span> No Brand
                </p>
                <p className='text-sm text-gray-600'>
                  <span className='font-semibold'>Category:</span>{' '}
                  {product.category}
                </p>
              </div>

              {/* Divider */}
              <div className='border-t border-gray-200'></div>

              {/* Description */}
              <div className='space-y-2'>
                <h2 className='text-xl font-semibold text-gray-900'>
                  Description
                </h2>
                <p className='text-gray-600'>{product.description}</p>
              </div>
            </div>

            {/* Price and Add to Cart Card */}
            <Card className='sticky top-4 h-fit shadow-lg transition-shadow hover:shadow-xl'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold text-success'>
                  ₹ {product.price}{' '}
                  <span className='text-xl italic text-destructive line-through'>
                    ₹ {product.price * 1.3}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Stock Status */}
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>Status:</span>
                  <Badge
                    variant={
                      product.countInStock > 0 ? 'default' : 'destructive'
                    }
                  >
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>

                {/* Add to Cart */}
                {product.countInStock > 0 && (
                  <AddToCart
                    item={{
                      ...convertDocToObj(product),
                      qty: 0,
                      color: '',
                      size: '',
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
