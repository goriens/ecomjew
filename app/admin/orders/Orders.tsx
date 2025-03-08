'use client';

import { EditIcon, EyeIcon } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';

import { Badge } from '@/components/ui/badge';
import { Order } from '@/lib/models/OrderModel';

export default function Orders() {
  const { data: orders, error, isLoading } = useSWR(`/api/admin/orders`);

  if (error) return 'An error has occurred.';
  if (isLoading) return 'Loading...';

  return (
    <div>
      <h1 className='py-4 text-2xl'>Orders</h1>
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
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
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
