'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';

import { Product } from '@/lib/models/ProductModel';

import { Rating } from './Rating';

const ProductItem = ({ product }: { product: Product }) => {
  // const buffer = await fetch(product.image).then(async (res) =>
  //   Buffer.from(await res.arrayBuffer()),
  // );

  // const { base64 } = await getPlaiceholder(buffer);

  return (
    <motion.div
      className='card mb-4 overflow-hidden rounded-lg  border bg-base-300 shadow-lg transition-shadow duration-300 hover:bg-gradient-to-br hover:from-white hover:to-purple-200 hover:shadow-2xl'
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <figure className='relative overflow-hidden'>
        <Link
          href={`/product/${product.slug}`}
          className='relative aspect-square h-full w-full'
        >
          <motion.div
            className='relative h-full w-full'
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Image
              src={product.image}
              alt={product.name}
              // blurDataURL={base64}
              width={350}
              height={350}
              className='h-full w-full object-cover'
            />
          </motion.div>
        </Link>
      </figure>
      <motion.div
        className='card-body p-4'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href={`/product/${product.slug}`}>
          <h3 className='card-title line-clamp-1 font-normal text-slate-800 transition-colors duration-300 hover:text-primary'>
            {product.name}
          </h3>
        </Link>
        <Rating
          value={product.rating}
          caption={`(${product.numReviews})`}
          isCard
        />
        <p className='line-clamp-1 text-slate-600'>Brand test</p>
        <div className='card-actions mt-4 flex items-center justify-between'>
          <span className='text-2xl font-bold text-slate-900'>
            ₹{product.price}
          </span>
          <motion.button
            className='rounded-lg bg-gradient-to-r from-pink-900 to-purple-900 px-4 py-2 text-white transition-all duration-300 hover:from-pink-600 hover:to-purple-600'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductItem;
