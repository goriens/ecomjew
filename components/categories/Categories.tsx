import Image from 'next/image';
import Link from 'next/link';

import Overlay from './Overlay';
import Handbags from '../../public/images/banner/bracelet1.jpg';
import Pants from '../../public/images/banner/earrings1.webp';
import Shirts from '../../public/images/banner/ring1.jpg';

const Categories = () => {
  return (
    <div className='container grid auto-rows-[300px] grid-cols-2 gap-4 md:auto-rows-[330px] md:grid-cols-4'>
      <Link
        href='/search?category=Clay Jewellery'
        className='group relative col-span-2 row-span-1 overflow-hidden rounded-md md:row-span-2'
      >
        <Image
          src={Shirts}
          alt='Clay Jewellery'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy'
        />
        <Overlay category='Clay Jewellery' />
      </Link>
      <Link
        href='/search?category=Embroidery Jewellery'
        className='group relative col-span-2 overflow-hidden'
      >
        <Image
          src={Pants}
          alt='Embroidery Jewellery'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy'
        />
        <Overlay category='Embroidery Jewellery' />
      </Link>
      <Link
        href='/search?category=Hand Painted Jewellery'
        className='group relative col-span-2 overflow-hidden'
      >
        <Image
          src={Handbags}
          alt='Hand Painted Jewellery'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy'
        />
        <Overlay category='Hand Painted Jewellery' />
      </Link>
    </div>
  );
};

export default Categories;
