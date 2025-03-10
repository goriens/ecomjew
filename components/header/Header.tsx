import { AlignJustify } from 'lucide-react';
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
            <Link
              href='/'
              className='ml-2 text-base font-semibold sm:ml-4 sm:text-lg'
            >
              Alankrita
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
