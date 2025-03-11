'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { BoxIcon, ShoppingBag, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import useSWR from 'swr';

import { formatNumber } from '@/lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales and Orders Overview',
    },
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart',
  },
};

const Dashboard = () => {
  const { data: summary, error } = useSWR(`/api/admin/summary`);

  if (error) return <div className='text-red-500'>{error.message}</div>;
  if (!summary) return <div className='text-blue-500'>Loading...</div>;

  const salesData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: 'Sales',
        data: summary.salesData.map(
          (x: { totalSales: number }) => x.totalSales,
        ),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const ordersData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: 'Orders',
        data: summary.salesData.map(
          (x: { totalOrders: number }) => x.totalOrders,
        ),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  };

  const productsData = {
    labels: summary.productsData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        label: 'Category',
        data: summary.productsData.map(
          (x: { totalProducts: number }) => x.totalProducts,
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };

  const usersData = {
    labels: summary.usersData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        label: 'Users',
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        data: summary.usersData.map(
          (x: { totalUsers: number }) => x.totalUsers,
        ),
      },
    ],
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <div className='rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
          <div className='text-gray-500'>Sales</div>
          <div className='text-2xl font-bold text-blue-500'>
            ₹{formatNumber(summary.ordersPrice)}
          </div>
          <Link
            href='/admin/orders'
            className='text-blue-500 hover:text-blue-700'
          >
            View sales
          </Link>
        </div>
        <div className='rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
          <div className='text-gray-500'>Orders</div>
          <div className='flex items-center gap-1 text-2xl font-bold text-purple-500'>
            <ShoppingBag size={20} />
            <span>{summary.ordersCount}</span>
          </div>
          <Link
            href='/admin/orders'
            className='text-purple-500 hover:text-purple-700'
          >
            View orders
          </Link>
        </div>
        <div className='rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
          <div className='text-gray-500'>Products</div>
          <div className='flex items-center gap-1 text-2xl font-bold text-green-500'>
            <BoxIcon />
            <span>{summary.productsCount}</span>
          </div>
          <Link
            href='/admin/products'
            className='text-green-500 hover:text-green-700'
          >
            View products
          </Link>
        </div>
        <div className='rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
          <div className='text-gray-500'>Users</div>
          <div className='flex items-center gap-1 text-2xl font-bold text-orange-500'>
            <UserIcon /> <span>{summary.usersCount}</span>
          </div>
          <Link
            href='/admin/users'
            className='text-orange-500 hover:text-orange-700'
          >
            View users
          </Link>
        </div>
      </div>

      <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
          <h2 className='mb-4 text-xl font-semibold'>Sales Report</h2>
          <Line data={salesData} />
        </div>
        <div className='rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
          <h2 className='mb-4 text-xl font-semibold'>Orders Report</h2>
          <Line data={ordersData} />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
          <h2 className='mb-4 text-xl font-semibold'>Products Report</h2>
          <div className='flex items-center justify-center'>
            <Doughnut data={productsData} />
          </div>
        </div>
        <div className='rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
          <h2 className='mb-4 text-xl font-semibold'>Users Report</h2>
          <Bar data={usersData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
