'use client';

import { motion } from 'framer-motion';

const TopRatedHeading = () => {
  return (
    <div className='relative my-8 flex items-center justify-center'>
      {/* Left Animated Line */}
      <motion.div
        className='mr-4 h-1 w-1/4 bg-gradient-to-r from-transparent via-orange-500 to-purple-900'
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Animated Gradient Text */}
      <motion.h2
        className='relative my-2 bg-gradient-to-r from-orange-500 to-purple-900 bg-clip-text text-2xl font-bold text-transparent sm:text-4xl'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        Top Rated
      </motion.h2>

      {/* Right Animated Line */}
      <motion.div
        className='ml-4 h-1 w-1/4 bg-gradient-to-l from-transparent via-orange-500 to-purple-900'
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
};

export default TopRatedHeading;
