import { NextRequest, NextResponse } from 'next/server';

import data from '@/lib/data';
import dbConnect from '@/lib/dbConnect';
// import ProductModel from '@/lib/models/ProductModel';
// import UserModel from '@/lib/models/UserModel';

export const GET = async (request: NextRequest) => {
  const { users, products } = data;
  console.log('suhaibbbbbbbbbb', data);
  await dbConnect();
  // await UserModel.deleteMany();
  // await UserModel.insertMany(users);

  // await ProductModel.deleteMany();
  // await ProductModel.insertMany(products);

  return NextResponse.json({
    message: 'seeded successfully',
    // users,
    // products,
  });
};
