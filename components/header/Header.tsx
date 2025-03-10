import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Menu from './Menu';
import { SearchBox } from './SearchBox';

const Header = () => {
  return (
    <header>
      <nav className='bg-gradient-to-br from-pink-100 to-purple-100'>
        <div className='navbar justify-between'>
          <div>
            <label htmlFor='my-drawer' className='btn btn-square btn-ghost'>
              <AlignJustify />
            </label>
            <Link href='/' className='flex items-center space-x-2 sm:space-x-4'>
              <Image
                src='/images/logo.png'
                alt='logo'
                className='object-contain'
                width={120}
                height={10}
              />
            </Link>
          </div>
          <Menu />
        </div>
        <div className='mx-2 block bg-gradient-to-br from-pink-100 to-purple-100 pb-3 text-center md:hidden'>
          <SearchBox />
        </div>
      </nav>
    </header>
  );
};

export default Header;
