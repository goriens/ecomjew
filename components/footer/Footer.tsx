import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className='bg-gray-900 py-12 text-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          {/* Info Column */}
          <div className='space-y-4'>
            <h3 className='text-lg font-bold'>About Us</h3>
            <p className='text-sm text-gray-400'>
              We are a creative team dedicated to building amazing products and
              experiences for our users.
            </p>
            <p className='text-sm text-gray-400'>
              &copy; {new Date().getFullYear()} Alankrita. All rights reserved.
            </p>
          </div>

          {/* Category Column */}
          <div className='space-y-4'>
            <h3 className='text-lg font-bold'>Categories</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/search?category=All'
                  className='text-sm text-gray-400 hover:text-white'
                >
                  All
                </Link>
              </li>
              <li>
                <Link
                  href='/search?category=Clay Jewellery'
                  className='text-sm text-gray-400 hover:text-white'
                >
                  Clay Jewellery
                </Link>
              </li>
              <li>
                <Link
                  href='/search?category=Embroidery Jewellery'
                  className='text-sm text-gray-400 hover:text-white'
                >
                  Embroidery Jewellery
                </Link>
              </li>
              <li>
                <Link
                  href='/search?category=Hand Painted Jewellery'
                  className='text-sm text-gray-400 hover:text-white'
                >
                  Hand Painted Jewellery
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Connect Column */}
          <div className='space-y-4'>
            <h3 className='text-lg font-bold'>Follow Us</h3>
            <p className='text-gray-400 transition-colors'>
              1st Floor, 22, Lake Place Rd, Lake Market, Kalighat, Kolkata, West
              Bengal 700029
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-gray-400 transition-colors hover:text-white'
              >
                <FaFacebook size={24} />
              </a>
              <a
                href='#'
                className='text-gray-400 transition-colors hover:text-white'
              >
                <FaTwitter size={24} />
              </a>
              <a
                href='#'
                className='text-gray-400 transition-colors hover:text-white'
              >
                <FaInstagram size={24} />
              </a>
              <a
                href='#'
                className='text-gray-400 transition-colors hover:text-white'
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className='space-y-4'>
            <h3 className='text-lg font-bold'>Subscribe to Our Newsletter</h3>
            <p className='text-sm text-gray-400'>
              Get the latest updates and news straight to your inbox.
            </p>
            <div className='flex space-x-2'>
              <Input
                type='email'
                placeholder='Enter your email'
                className='border-gray-700 bg-gray-800 text-white'
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
