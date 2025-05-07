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
  ChartOptions,
} from 'chart.js';
import {
  BoxIcon,
  ShoppingBag,
  UserIcon,
  ArrowUp,
  ArrowDown,
  TrendingUp,
} from 'lucide-react';
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

const lineChartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          family: 'Inter, sans-serif',
          size: 12,
        },
        boxWidth: 12,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: '#1F2937',
      titleFont: {
        family: 'Inter, sans-serif',
        size: 14,
      },
      bodyFont: {
        family: 'Inter, sans-serif',
        size: 12,
      },
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      usePointStyle: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: 'Inter, sans-serif',
        },
      },
    },
    y: {
      grid: {
        color: '#E5E7EB',
      },
      ticks: {
        font: {
          family: 'Inter, sans-serif',
        },
      },
    },
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuad', // Changed to one of the valid easing options
  },
  maintainAspectRatio: false,
};

const doughnutOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: {
          family: 'Inter, sans-serif',
          size: 12,
        },
        boxWidth: 12,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: '#1F2937',
      titleFont: {
        family: 'Inter, sans-serif',
        size: 14,
      },
      bodyFont: {
        family: 'Inter, sans-serif',
        size: 12,
      },
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      usePointStyle: true,
    },
  },
  cutout: '70%',
  animation: {
    animateScale: true,
    animateRotate: true,
  },
  maintainAspectRatio: false,
};

const barChartOptions: any = {
  ...lineChartOptions,
  scales: {
    ...lineChartOptions.scales,
    y: {
      ...(lineChartOptions.scales?.y || {}),
      beginAtZero: true,
    },
  },
};

const Dashboard = () => {
  const { data: summary, error } = useSWR(`/api/admin/summary`);

  if (error)
    return (
      <div className='p-6 text-red-500'>
        Error loading dashboard data: {error.message}
      </div>
    );
  if (!summary)
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='animate-pulse text-lg text-gray-600'>
          Loading dashboard data...
        </div>
      </div>
    );

  // Calculate percentage changes (mock data - replace with actual comparison logic)
  const salesChange = 12.5;
  const ordersChange = -3.2;
  const productsChange = 8.7;
  const usersChange = 5.4;

  const salesData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: 'Sales',
        data: summary.salesData.map(
          (x: { totalSales: number }) => x.totalSales,
        ),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: '#3B82F6',
        pointRadius: 4,
        pointHoverRadius: 6,
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
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: '#8B5CF6',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const productsData = {
    labels: summary.productsData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        label: 'Products by Category',
        data: summary.productsData.map(
          (x: { totalProducts: number }) => x.totalProducts,
        ),
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(234, 179, 8, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(249, 115, 22, 0.7)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(249, 115, 22, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const usersData = {
    labels: summary.usersData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        label: 'User Growth',
        data: summary.usersData.map(
          (x: { totalUsers: number }) => x.totalUsers,
        ),
        backgroundColor: 'rgba(249, 115, 22, 0.7)',
        borderColor: 'rgba(249, 115, 22, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const StatCard = ({
    title,
    value,
    change,
    icon,
    link,
    linkText,
  }: {
    title: string;
    value: string | number;
    change: number;
    icon: React.ReactNode;
    link: string;
    linkText: string;
  }) => {
    const isPositive = change >= 0;

    return (
      <div className='overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md'>
        <div className='p-5'>
          <div className='flex items-start justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500'>{title}</p>
              <h3 className='mt-1 text-2xl font-semibold text-gray-900'>
                {value}
              </h3>
            </div>
            <div className='rounded-lg bg-blue-50 p-3 text-blue-600'>
              {icon}
            </div>
          </div>

          <div className='mt-4 flex items-center'>
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                isPositive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {isPositive ? (
                <ArrowUp className='mr-1 h-3 w-3' />
              ) : (
                <ArrowDown className='mr-1 h-3 w-3' />
              )}
              {Math.abs(change)}%
            </span>
            <span className='ml-2 text-xs text-gray-500'>vs last period</span>
          </div>
        </div>

        <div className='border-t border-gray-100 bg-gray-50 px-5 py-3'>
          <Link
            href={link}
            className='flex items-center text-sm font-medium text-blue-600 hover:text-blue-800'
          >
            {linkText}
            <svg
              className='ml-1 h-4 w-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Dashboard Overview</h1>
        <p className='text-gray-600'>
          Welcome back! Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Sales'
          value={`₹${formatNumber(summary.ordersPrice)}`}
          change={salesChange}
          icon={<TrendingUp className='h-6 w-6' />}
          link='/admin/orders'
          linkText='View sales'
        />

        <StatCard
          title='Total Orders'
          value={summary.ordersCount}
          change={ordersChange}
          icon={<ShoppingBag className='h-6 w-6' />}
          link='/admin/orders'
          linkText='View orders'
        />

        <StatCard
          title='Products'
          value={summary.productsCount}
          change={productsChange}
          icon={<BoxIcon className='h-6 w-6' />}
          link='/admin/products'
          linkText='View products'
        />

        <StatCard
          title='Users'
          value={summary.usersCount}
          change={usersChange}
          icon={<UserIcon className='h-6 w-6' />}
          link='/admin/users'
          linkText='View users'
        />
      </div>

      <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>
              Sales Performance
            </h2>
            <div className='flex space-x-2'>
              <button className='rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600'>
                Monthly
              </button>
              <button className='rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-600'>
                Weekly
              </button>
            </div>
          </div>
          <div className='h-80'>
            <Line options={lineChartOptions} data={salesData} />
          </div>
        </div>

        <div className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>
              Order Trends
            </h2>
            <div className='flex space-x-2'>
              <button className='rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-600'>
                Monthly
              </button>
              <button className='rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-600'>
                Weekly
              </button>
            </div>
          </div>
          <div className='h-80'>
            <Line options={lineChartOptions} data={ordersData} />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
          <h2 className='mb-4 text-lg font-semibold text-gray-900'>
            Product Categories
          </h2>
          <div className='flex h-80 items-center justify-center'>
            <Doughnut options={doughnutOptions} data={productsData} />
          </div>
        </div>

        <div className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>User Growth</h2>
            <div className='flex space-x-2'>
              <button className='rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-600'>
                Monthly
              </button>
              <button className='rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-600'>
                Weekly
              </button>
            </div>
          </div>
          <div className='h-80'>
            <Bar options={barChartOptions} data={usersData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
