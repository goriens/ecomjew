import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';

export const GET = auth(async (req: any) => {
  // Check for authentication and admin privileges
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Ensure database connection
    await dbConnect();

    // Fetch all orders, sort by createdAt descending, and populate user name
    const orders = await OrderModel.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name')
      .lean(); // Convert to plain JS object for better performance

    // Return the orders
    return Response.json(orders);
  } catch (err: any) {
    // Handle any errors (e.g., database connection issues, query failures)
    return Response.json(
      { message: err.message || 'Internal Server Error' },
      { status: 500 },
    );
  }
}) as any;
