import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';

export const PUT = auth(async (...args: any) => {
  const [req, { params }] = args;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const {
      isPaid,
      isDelivered,
      makingStatus,
      paymentResult, // Optional: { id, status, email_address }
    } = await req.json();

    const order = await OrderModel.findById(params.id);

    if (!order) {
      return Response.json({ message: 'Order not found' }, { status: 404 });
    }

    // Update fields if provided in request body
    if (typeof isPaid === 'boolean') {
      order.isPaid = isPaid;
      if (isPaid) {
        order.paidAt = Date.now();
      } else {
        order.paidAt = null;
      }
      if (paymentResult) {
        order.paymentResult = paymentResult;
      }
    }

    if (typeof isDelivered === 'boolean') {
      // Check if order is paid before allowing delivery status update
      if (isDelivered && !order.isPaid) {
        return Response.json(
          { message: 'Order must be paid before marking as delivered' },
          { status: 400 },
        );
      }
      order.isDelivered = isDelivered;
      if (isDelivered) {
        order.deliveredAt = Date.now();
      } else {
        order.deliveredAt = null;
      }
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
    return Response.json({ message: err.message }, { status: 500 });
  }
}) as any;
