'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import useSWR from 'swr';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const SearchBox = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const router = useRouter();

  const [formCategory, setFormCategory] = useState(category);
  const [formQuery, setFormQuery] = useState(q);

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR('/api/products/categories');

  if (error) return error.message;

  if (isLoading) return <div className='skeleton flex h-12 w-[371px]'></div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?category=${formCategory}&q=${formQuery}`);
  };

  return (
    <form onSubmit={handleSubmit} className='mx-auto w-full max-w-md'>
      <div className='flex w-full items-center gap-2'>
        <Select
          value={formCategory}
          onValueChange={(value) => setFormCategory(value)}
        >
          <SelectTrigger className='w-[120px] border-indigo-200 bg-white text-slate-800 hover:border-indigo-300 sm:w-[140px]'>
            <SelectValue placeholder='Category' />
          </SelectTrigger>
          <SelectContent className='border-indigo-200 bg-white'>
            <SelectItem value='all'>All</SelectItem>
            {categories?.map((c: string) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          className='flex-1 border-indigo-200 bg-white text-slate-800 placeholder-slate-400 hover:border-indigo-300'
          placeholder='Search'
          defaultValue={q}
          onChange={(e) => setFormQuery(e.target.value)}
        />

        <div>
          <Button type='submit' className='font-semibold text-white'>
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};
