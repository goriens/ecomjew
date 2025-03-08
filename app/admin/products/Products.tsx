'use client';

import {
  DeleteIcon,
  EditIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Product } from '@/lib/models/ProductModel';
import { formatId } from '@/lib/utils';

export default function Products() {
  const { data: products, error } = useSWR(`/api/admin/products`);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('name');
  const router = useRouter();

  const { trigger: deleteProduct } = useSWRMutation(
    `/api/admin/products`,
    async (url, { arg }: { arg: { productId: string } }) => {
      const toastId = toast.loading('Deleting product...');
      const res = await fetch(`${url}/${arg.productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success('Product deleted successfully', {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    },
  );

  const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
    `/api/admin/products`,
    async (url) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success('Product created successfully');
      router.push(`/admin/products/${data.product._id}`);
    },
  );

  if (error) return 'An error has occurred.';
  if (!products) return <LoadingSkeleton />;

  const filteredProducts = products
    .filter((product: Product) =>
      product.name.toLowerCase().includes(filter.toLowerCase()),
    )
    .sort((a: Product, b: Product) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'price') return a.price - b.price;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className='p-8'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Products</h1>
        <Button
          disabled={isCreating}
          onClick={() => router.push(`/admin/products/add`)}
          className='flex items-center gap-2'
        >
          {isCreating ? (
            <span className='loading loading-spinner'></span>
          ) : (
            <PlusIcon size={18} />
          )}
          Create Product
        </Button>
      </div>

      <div className='mb-8 flex gap-4'>
        <div className='relative flex-1'>
          <SearchIcon
            className='absolute left-3 top-2.5 text-gray-400'
            size={18}
          />
          <Input
            type='text'
            placeholder='Filter by name...'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='pl-10'
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Sort by' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='name'>Sort by Name</SelectItem>
            <SelectItem value='price'>Sort by Price</SelectItem>
            <SelectItem value='rating'>Sort by Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>Manage your products with ease.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Scrollable Table Container */}
          <div className='max-h-[600px] overflow-y-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product: Product) => (
                  <TableRow key={product._id}>
                    <TableCell>{formatId(product._id!)}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.countInStock}</TableCell>
                    <TableCell>⭐ {product.rating}</TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        <Button variant='ghost' size='icon' asChild>
                          <Link href={`/product/${product.slug}`}>
                            <EyeIcon size={18} />
                          </Link>
                        </Button>
                        <Button variant='ghost' size='icon' asChild>
                          <Link href={`/admin/products/${product._id}`}>
                            <EditIcon size={18} />
                          </Link>
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() =>
                            deleteProduct({ productId: product._id! })
                          }
                        >
                          <DeleteIcon size={18} className='text-red-500' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className='p-8'>
    <div className='mb-8 flex items-center justify-between'>
      <Skeleton className='h-8 w-1/4' />
      <Skeleton className='h-10 w-32' />
    </div>
    <div className='mb-8 flex gap-4'>
      <Skeleton className='h-10 flex-1' />
      <Skeleton className='h-10 w-48' />
    </div>
    <Card>
      <CardHeader>
        <Skeleton className='h-6 w-1/4' />
        <Skeleton className='h-4 w-1/2' />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {[...Array(6)].map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className='h-4 w-24' />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(6)].map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className='h-4 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);
