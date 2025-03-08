'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useCartService from '@/lib/hooks/useCartStore';
import { OrderItem } from '@/lib/models/OrderModel';

const AddToCart = ({ item }: { item: OrderItem }) => {
  const router = useRouter();
  const { items, increase, decrease } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();

  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug));
  }, [item, items]);

  const addToCartHandler = () => {
    increase(item);
  };

  return existItem ? (
    <div>
      <button className='btn' type='button' onClick={() => decrease(existItem)}>
        -
      </button>
      <span className='px-2'>{existItem.qty}</span>
      <button className='btn' type='button' onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    <motion.button
      className='rounded-lg bg-gradient-to-r from-pink-900 to-purple-900 px-4 py-2 text-white transition-all duration-300 hover:from-pink-600 hover:to-purple-600'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type='button'
      onClick={addToCartHandler}
    >
      Add to cart
    </motion.button>
  );
};

export default AddToCart;
