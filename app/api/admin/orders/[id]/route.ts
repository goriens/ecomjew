import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';

export const GET = auth(async (...args: any) => {
  const [req, { params }] = args;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const order = await OrderModel.findById(params.id)
      .populate('user', 'name')
      .lean();

    if (!order) {
      return Response.json({ message: 'Order not found' }, { status: 404 });
    }

    return Response.json(order);
  } catch (err: any) {
    return Response.json(
      { message: err.message || 'Internal Server Error' },
      { status: 500 },
    );
  }
}) as any;

export const PUT = auth(async (...args: any) => {
  const [req, { params }] = args;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { isPaid, isDelivered, makingStatus, paymentResult } =
      await req.json();

    const order = await OrderModel.findById(params.id);

    if (!order) {
      return Response.json({ message: 'Order not found' }, { status: 404 });
    }

    if (typeof isPaid === 'boolean') {
      order.isPaid = isPaid;
      order.paidAt = isPaid ? Date.now() : null;
      if (paymentResult) {
        order.paymentResult = paymentResult;
      }
    }

    if (typeof isDelivered === 'boolean') {
      if (isDelivered && !order.isPaid) {
        return Response.json(
          { message: 'Order must be paid before marking as delivered' },
          { status: 400 },
        );
      }
      order.isDelivered = isDelivered;
      order.deliveredAt = isDelivered ? Date.now() : null;
    }

    if (
      makingStatus &&
      ['Not started', 'On process', 'ready'].includes(makingStatus)
    ) {
      order.makingStatus = makingStatus;
    }

    const updatedOrder = await order.save();
    return Response.json(updatedOrder);
  } catch (err: any) {
    return Response.json(
      { message: err.message || 'Internal Server Error' },
      { status: 500 },
    );
  }
}) as any;
