'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

import { Badge } from '@/components/ui/badge';
import { Order } from '@/lib/models/OrderModel';

const MyOrders = () => {
  const router = useRouter();
  const { data: orders, error, isLoading } = useSWR('/api/orders/mine');

  if (error) return <>An error has occurred</>;
  if (isLoading) return <>Loading...</>;
  if (!orders) return <>No orders...</>;

  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAYMENT</th>
            <th>DELIVERED</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order._id}>
              <td>{order._id.substring(0, 4)}...</td>
              <td className='whitespace-nowrap'>
                {order.createdAt.substring(0, 10)}
              </td>
              <td>₹ {order.totalPrice}</td>
              <td>
                {order.isPaid && order.paidAt ? (
                  <Badge className='bg-green-700'>
                    {order.paidAt.substring(0, 10)}
                  </Badge>
                ) : (
                  <Badge variant='destructive'>Not Paid</Badge>
                )}
              </td>
              <td>
                {order.isDelivered && order.deliveredAt
                  ? `${order.deliveredAt.substring(0, 10)}`
                  : 'not delivered'}
              </td>
              <td>
                <Link href={`/order/${order._id}`} passHref>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
