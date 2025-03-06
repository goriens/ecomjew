import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const products = await ProductModel.find();
  return Response.json(products);
}) as any;

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  try {
    const {
      name,
      slug,
      image,
      price,
      makingCharge,
      materialCost,
      category,
      countInStock,
      description,
    } = await req.json();
    if (
      !name ||
      !slug ||
      !price ||
      !makingCharge ||
      !materialCost ||
      !category ||
      !countInStock ||
      !description
    ) {
      return Response.json(
        { message: 'All fields are required' },
        { status: 400 },
      );
    }

    const newProduct = new ProductModel({
      name,
      slug,
      image:
        image ||
        'https://res.cloudinary.com/dqxlehni0/image/upload/v1715622109/No_Image_Available_kbdno1.jpg',
      price,
      makingCharge,
      materialCost,
      category,
      countInStock,
      description,
      rating: 0,
      numReviews: 0,
    });

    await newProduct.save();
    return Response.json(
      { message: 'Product created successfully', product: newProduct },
      { status: 201 },
    );
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}) as any;
