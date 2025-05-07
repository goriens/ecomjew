'use client';

import { format } from 'date-fns';
import { EditIcon, EyeIcon } from 'lucide-react';
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import useSWR from 'swr';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Order } from '@/lib/models/OrderModel';

export default function Orders() {
  const { data: orders, error, isLoading } = useSWR(`/api/admin/orders`);

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [deliveryFilter, setDeliveryFilter] = useState('all');
  const [makingFilter, setMakingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });

  if (error) return 'An error has occurred.';
  if (isLoading) return 'Loading...';

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order: Order) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        order._id.toLowerCase().includes(searchLower) ||
        order.user?.name.toLowerCase().includes(searchLower);

      const matchesPayment =
        paymentFilter === 'all' ||
        (paymentFilter === 'paid' && order.isPaid) ||
        (paymentFilter === 'not-paid' && !order.isPaid);

      const matchesDelivery =
        deliveryFilter === 'all' ||
        (deliveryFilter === 'delivered' && order.isDelivered) ||
        (deliveryFilter === 'not-delivered' && !order.isDelivered);

      const matchesMaking =
        makingFilter === 'all' || order.makingStatus === makingFilter;

      const matchesDate =
        (!dateRange.from || new Date(order.createdAt) >= dateRange.from) &&
        (!dateRange.to || new Date(order.createdAt) <= dateRange.to);

      return (
        matchesSearch &&
        matchesPayment &&
        matchesDelivery &&
        matchesMaking &&
        matchesDate
      );
    })
    .sort((a: Order, b: Order) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'totalPrice') {
        return multiplier * (a.totalPrice - b.totalPrice);
      }
      return (
        multiplier *
        (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      );
    });

  return (
    <div className='p-4'>
      <h1 className='py-4 text-2xl'>Orders</h1>

      {/* Filters and Search */}
      <div className='mb-6 space-y-4'>
        <div className='flex flex-wrap gap-4'>
          {/* Search Bar */}
          <Input
            placeholder='Search by Order ID or User Name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='max-w-xs'
          />

          {/* Payment Status Filter */}
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Payment Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Payments</SelectItem>
              <SelectItem value='paid'>Paid</SelectItem>
              <SelectItem value='not-paid'>Not Paid</SelectItem>
            </SelectContent>
          </Select>

          {/* Delivery Status Filter */}
          <Select value={deliveryFilter} onValueChange={setDeliveryFilter}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Delivery Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Deliveries</SelectItem>
              <SelectItem value='delivered'>Delivered</SelectItem>
              <SelectItem value='not-delivered'>Not Delivered</SelectItem>
            </SelectContent>
          </Select>

          {/* Making Status Filter */}
          <Select value={makingFilter} onValueChange={setMakingFilter}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Making Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Making Status</SelectItem>
              <SelectItem value='Not started'>Not Started</SelectItem>
              <SelectItem value='In progress'>In Progress</SelectItem>
              <SelectItem value='ready'>Ready</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range Picker */}
          <div className='flex items-center gap-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-[280px] justify-start text-left font-normal'
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, 'LLL dd, y')} -{' '}
                        {format(dateRange.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(dateRange.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <DayPicker
                  mode='range'
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) =>
                    setDateRange({ from: range?.from, to: range?.to })
                  }
                />
              </PopoverContent>
            </Popover>
            <Button
              variant='outline'
              onClick={() => setDateRange({ from: undefined, to: undefined })}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Sort Options */}
        <div className='flex gap-4'>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort By' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='createdAt'>Date</SelectItem>
              <SelectItem value='totalPrice'>Total Price</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort Order' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='asc'>Ascending</SelectItem>
              <SelectItem value='desc'>Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders Table */}
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>DELIVERED</th>
              <th>PAID</th>
              <th>TOTAL</th>
              <th>MAKING STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order: Order) => (
              <tr key={order._id}>
                <td>{order._id.substring(0, 4)}...</td>
                <td>{order.user?.name || 'Deleted user'}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  {order.isDelivered && order.deliveredAt
                    ? `${order.deliveredAt.substring(0, 10)}`
                    : 'not delivered'}
                </td>
                <td>
                  {order.isPaid && order.paidAt ? (
                    <Badge className='bg-green-700'>
                      {order.paidAt.substring(0, 10)}
                    </Badge>
                  ) : (
                    <Badge variant='destructive'>Not Paid</Badge>
                  )}
                </td>
                <td>₹ {order.totalPrice}</td>
                <td>{order.makingStatus}</td>
                <td className='flex gap-2'>
                  <Link href={`/order/${order._id}`} passHref>
                    <EyeIcon size={38} className='rounded-full border p-2' />
                  </Link>
                  <Link href={`/admin/orders/${order._id}`} passHref>
                    <EditIcon size={38} className='rounded-full border p-2' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
