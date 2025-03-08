'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ProductItem from '@/components/products/ProductItem';
import { Rating } from '@/components/products/Rating';
import productService from '@/lib/services/productService.client';

const sortOrders = ['newest', 'lowest', 'highest', 'rating'];
const prices = [
  { name: '₹1 to ₹50', value: '1-50' },
  { name: '₹51 to ₹200', value: '51-200' },
  { name: '₹201 to ₹1000', value: '201-1000' },
];
const ratings = [5, 4, 3, 2, 1];

export default function SearchPage() {
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [countProducts, setCountProducts] = useState(0);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const q = searchParams.get('q') || 'all';
  const category = searchParams.get('category') || 'all';
  const price = searchParams.get('price') || 'all';
  const rating = searchParams.get('rating') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const page = searchParams.get('page') || '1';

  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = new URLSearchParams(searchParams);
    if (c) params.set('category', c);
    if (p) params.set('price', p);
    if (r) params.set('rating', r);
    if (pg) params.set('page', pg);
    if (s) params.set('sort', s);
    return `/search?${params.toString()}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await productService.getByQuery({
          category,
          q,
          price,
          rating,
          page,
          sort,
        });

        setCategories(data.categories);
        setProducts(data.products);
        setCountProducts(data.countProducts);
        setPages(data.pages);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [q, category, price, rating, sort, page]);

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        Loading...
      </div>
    );
  }

  return (
    <div className='my-5 grid p-4 md:grid-cols-5 md:gap-5 md:p-8'>
      <div className='rounded-lg bg-gradient-to-br from-base-200 to-base-300 p-6 shadow-xl'>
        {/* Categories Section */}
        <div className='mb-6'>
          <div className='flex items-center gap-2 py-2 text-xl font-bold text-gray-800'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v10h8V6H6z'
                clipRule='evenodd'
              />
            </svg>
            Categories
          </div>
          <ul className='flex flex-col gap-2'>
            <li>
              <Link
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${'all' === category ? 'bg-primary/75 text-white shadow-md' : 'hover:bg-base-100 hover:shadow-sm'}`}
                href={getFilterUrl({ c: 'all' })}
              >
                All Categories
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c}>
                <Link
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${c === category ? 'bg-primary text-white shadow-md' : 'hover:bg-base-100 hover:shadow-sm'}`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Section */}
        <div className='mb-6'>
          <div className='flex items-center gap-2 py-2 text-xl font-bold text-gray-800'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 1 1 0 001.415 1.414z'
                clipRule='evenodd'
              />
            </svg>
            Price
          </div>
          <ul className='flex flex-col gap-2'>
            <li>
              <Link
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${'all' === price ? 'bg-primary/75 text-white shadow-md' : 'hover:bg-base-100 hover:shadow-sm'}`}
                href={getFilterUrl({ p: 'all' })}
              >
                All Price
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${p.value === price ? 'bg-primary text-white shadow-md' : 'hover:bg-base-100 hover:shadow-sm'}`}
                  href={getFilterUrl({ p: p.value })}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Review Section */}
        <div>
          <div className='flex items-center gap-2 py-2 text-xl font-bold text-gray-800'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 1l2.928 6.472L20 8.236l-5 4.764 1.18 6.928L10 16.944l-6.18 3.984L5 13 0 8.236l7.072-.764L10 1z'
                clipRule='evenodd'
              />
            </svg>
            Customer Review
          </div>
          <ul className='flex flex-col gap-2'>
            <li>
              <Link
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${'all' === rating ? 'bg-primary/75 text-white shadow-md' : 'hover:bg-base-100 hover:shadow-sm'}`}
                href={getFilterUrl({ r: 'all' })}
              >
                All Ratings
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${`${r}` === rating ? 'bg-primary/75 text-white shadow-md' : 'hover:bg-base-100 hover:shadow-sm'}`}
                  href={getFilterUrl({ r: `${r}` })}
                >
                  <Rating caption={' & up'} value={r} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='rounded-lg bg-base-100 p-6 shadow-xl md:col-span-4'>
        {/* Filters and Results Summary */}
        <div className='flex flex-col justify-between gap-4 py-4 md:flex-row'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-wrap items-center gap-3'>
              <span className='text-xl font-bold text-gray-800'>
                {products.length === 0 ? 'No' : countProducts} Results
              </span>
              {q !== 'all' && q !== '' && (
                <span className='flex items-center gap-1 rounded-full bg-base-100 px-3 py-1 text-sm text-gray-600 shadow-sm'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {q}
                </span>
              )}
              {category !== 'all' && (
                <span className='flex items-center gap-1 rounded-full bg-base-100 px-3 py-1 text-sm text-gray-600 shadow-sm'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v10h8V6H6z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {category}
                </span>
              )}
              {price !== 'all' && (
                <span className='flex items-center gap-1 rounded-full bg-base-100 px-3 py-1 text-sm text-gray-600 shadow-sm'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 1 1 0 001.415 1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Price {price}
                </span>
              )}
              {rating !== 'all' && (
                <span className='flex items-center gap-1 rounded-full bg-base-100 px-3 py-1 text-sm text-gray-600 shadow-sm'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 1l2.928 6.472L20 8.236l-5 4.764 1.18 6.928L10 16.944l-6.18 3.984L5 13 0 8.236l7.072-.764L10 1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Rating {rating} & up
                </span>
              )}
            </div>

            {(q !== 'all' && q !== '') ||
            category !== 'all' ||
            rating !== 'all' ||
            price !== 'all' ? (
              <Link
                className='btn-danger btn btn-sm mt-3 w-fit transform rounded-full bg-red-600 px-6 font-medium text-white shadow-sm transition-all duration-200 hover:bg-red-500 hover:shadow-md'
                href='/search'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='mr-2 h-4 w-4'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
                Clear Filters
              </Link>
            ) : null}
          </div>

          <div className='flex flex-col gap-4 rounded-lg'>
            <div className='flex flex-wrap gap-3'>
              {sortOrders.map((s) => (
                <Link
                  key={s}
                  className={`btn btn-sm ${sort === s ? 'btn-primary transform transition-all duration-200 hover:scale-110' : 'btn-ghost transform bg-base-100 transition-all duration-200 hover:scale-105 hover:bg-base-300'} rounded-full px-6 font-medium capitalize shadow-sm`}
                  href={getFilterUrl({ s })}
                >
                  {sort === s && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='mr-2 h-4 w-4'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {products.map((product) => (
            <div
              key={product.slug}
              className='transition-transform duration-300 hover:scale-105'
            >
              <ProductItem product={product} />
            </div>
          ))}
        </div>

        {products.length > 0 && (
          <div className='mt-8 flex justify-center'>
            <div className='join'>
              {Array.from(Array(pages).keys()).map((p) => (
                <Link
                  key={p}
                  className={`btn join-item ${Number(page) === p + 1 ? 'btn-active bg-primary text-white' : 'bg-base-200 hover:bg-base-300'}`}
                  href={getFilterUrl({ pg: `${p + 1}` })}
                >
                  {p + 1}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
