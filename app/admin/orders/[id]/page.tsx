'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function OrderEditPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    isPaid: false,
    isDelivered: false,
    makingStatus: 'Not started',
    paymentResult: {
      id: '',
      status: '',
      email_address: '',
    },
  });

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) {
        setOrder(data);
        setFormData({
          isPaid: data.isPaid,
          isDelivered: data.isDelivered,
          makingStatus: data.makingStatus,
          paymentResult: data.paymentResult || {
            id: '',
            status: '',
            email_address: '',
          },
        });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Error fetching order');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Order updated successfully');
        setOrder(data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Error updating order');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-lg text-muted-foreground'>Loading...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-lg text-muted-foreground'>Order not found</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='mb-6 text-3xl font-bold'>Order #{order._id}</h1>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Order Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='text-sm text-muted-foreground'>User</p>
              <p className='font-medium'>{order.user?.name || 'N/A'}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Total Price</p>
              <p className='font-medium'>₹{order.totalPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Shipping Address</p>
              <p className='font-medium'>
                {order.shippingAddress.fullName},{' '}
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Payment Method</p>
              <p className='font-medium'>{order.paymentMethod}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Created At</p>
              <p className='font-medium'>
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Update Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Update Order</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Payment Status</label>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='isPaid'
                    checked={formData.isPaid}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isPaid: !!checked })
                    }
                  />
                  <label htmlFor='isPaid' className='text-sm'>
                    Paid
                  </label>
                </div>
              </div>

              {formData.isPaid && (
                <div className='space-y-4 rounded border p-4'>
                  <div>
                    <label className='block text-sm font-medium'>
                      Payment ID
                    </label>
                    <Input
                      value={formData.paymentResult.id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentResult: {
                            ...formData.paymentResult,
                            id: e.target.value,
                          },
                        })
                      }
                      placeholder='Enter payment ID'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium'>
                      Payment Status
                    </label>
                    <Input
                      value={formData.paymentResult.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentResult: {
                            ...formData.paymentResult,
                            status: e.target.value,
                          },
                        })
                      }
                      placeholder='Enter payment status'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium'>
                      Email Address
                    </label>
                    <Input
                      type='email'
                      value={formData.paymentResult.email_address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentResult: {
                            ...formData.paymentResult,
                            email_address: e.target.value,
                          },
                        })
                      }
                      placeholder='Enter email address'
                    />
                  </div>
                </div>
              )}

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Delivery Status</label>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='isDelivered'
                    checked={formData.isDelivered}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isDelivered: !!checked })
                    }
                  />
                  <label htmlFor='isDelivered' className='text-sm'>
                    Delivered
                  </label>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Making Status</label>
                <Select
                  value={formData.makingStatus}
                  onValueChange={(value) =>
                    setFormData({ ...formData, makingStatus: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Not started'>Not started</SelectItem>
                    <SelectItem value='On process'>On process</SelectItem>
                    <SelectItem value='ready'>Ready</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type='submit' disabled={updating} className='w-full'>
                {updating ? 'Updating...' : 'Update Order'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card className='mt-6'>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='h-12 w-12 rounded object-cover'
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>₹{item.price.toFixed(2)}</TableCell>
                  <TableCell>₹{(item.qty * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
