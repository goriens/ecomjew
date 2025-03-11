'use client';

import { Home, ShoppingCart, Box, Users, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const AdminLayout = ({
  activeItem = 'dashboard',
  children,
}: {
  activeItem: string;
  children: React.ReactNode;
}) => {
  const { data: session } = useSession(); // Use useSession for client-side session management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!session || !session.user.isAdmin) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <div className='rounded-lg bg-white p-8 text-center shadow-lg'>
          <h1 className='mb-4 text-3xl font-bold text-gray-800'>
            Unauthorized
          </h1>
          <p className='text-gray-600'>
            Admin permissions are required to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 text-gray-800'>
      {/* Mobile Navbar */}
      <div className='flex items-center justify-between bg-white p-4 shadow-sm md:hidden'>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>
        <h2 className='text-xl font-semibold'>Admin Panel</h2>
      </div>

      {/* Sidebar and Main Content */}
      <div className='grid min-h-screen md:grid-cols-[auto,1fr]'>
        {/* Sidebar */}
        <div
          className={`fixed h-full w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='border-b border-gray-200 p-6'>
            <h2 className='text-xl font-semibold'>Admin Panel</h2>
          </div>
          <ul className='space-y-2 p-4'>
            {[
              {
                name: 'Dashboard',
                href: '/admin/dashboard',
                key: 'dashboard',
                icon: Home,
              },
              {
                name: 'Orders',
                href: '/admin/orders',
                key: 'orders',
                icon: ShoppingCart,
              },
              {
                name: 'Products',
                href: '/admin/products',
                key: 'products',
                icon: Box,
              },
              {
                name: 'Users',
                href: '/admin/users',
                key: 'users',
                icon: Users,
              },
            ].map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-lg p-3 transition-all duration-200 ${
                    activeItem === item.key
                      ? 'bg-blue-50 font-semibold text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className='mr-3 h-5 w-5' />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className='min-h-screen p-4 md:p-8'>
          <div className='rounded-lg bg-white p-6 shadow-md'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
