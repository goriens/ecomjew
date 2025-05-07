import Image from 'next/image';
import Link from 'next/link';

import Overlay from './Overlay';
import Clay from '../../public/images/categories/cat1.jpeg';
import HandPent from '../../public/images/categories/cat2.jpeg';
import Emb from '../../public/images/categories/cat3.jpeg';

const Categories = () => {
  return (
    <div className='container grid auto-rows-[300px] grid-cols-2 gap-4 md:auto-rows-[330px] md:grid-cols-4'>
      <Link
        href='/search?category=Clay Jewellery'
        className='group relative col-span-2 row-span-1 overflow-hidden rounded-md md:row-span-2'
      >
        <Image
          src={Clay}
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
          src={Emb}
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
          src={HandPent}
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
