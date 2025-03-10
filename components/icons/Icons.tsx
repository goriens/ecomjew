'use client';

import { motion } from 'framer-motion';
import { Truck, Wallet, LockKeyhole, Phone } from 'lucide-react';

const Icons = () => {
  // Animation variants for the circular layout
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.1,
      rotate: 10,
      backgroundColor: 'rgba(99, 102, 241, 0.1)', // Light indigo background on hover
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  // Pulse animation for icons
  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: 1.1,
      transition: { repeat: Infinity, duration: 1, ease: 'easeInOut' },
    },
  };

  // Icons data
  const iconsData = [
    {
      icon: <Truck width={48} height={48} strokeWidth={1} />,
      title: 'Free Shipping',
      description: 'Order above $200',
    },
    {
      icon: <Wallet width={48} height={48} strokeWidth={1} />,
      title: 'Money-back',
      description: '30 days guarantee',
    },
    {
      icon: <LockKeyhole width={48} height={48} strokeWidth={1} />,
      title: 'Secure Payments',
      description: 'Secured by Stripe',
    },
    {
      icon: <Phone width={48} height={48} strokeWidth={1} />,
      title: '24/7 Support',
      description: 'Phone and Email support',
    },
  ];

  return (
    <motion.div
      className='flex items-center justify-center'
      animate='visible'
      variants={containerVariants}
    >
      {/* Circular Layout */}
      <div className='container grid w-full grid-cols-1 flex-col gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        {iconsData.map((icon, index) => {
          return (
            <motion.div
              key={index}
              className='flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 p-6 shadow-lg backdrop-blur-sm'
              variants={iconVariants}
              whileHover='hover'
            >
              <motion.div
                className='text-primary'
                variants={pulseVariants}
                initial='initial'
                animate='pulse'
              >
                {icon.icon}
              </motion.div>
              <div className='text-center'>
                <p className='font-bold text-slate-800'>{icon.title}</p>
                <p className='text-sm text-slate-600'>{icon.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Icons;
