// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';

const PAGE_SIZE = 12;

export async function GET(request: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(request.url);

  const q = searchParams.get('q') || 'all';
  const category = searchParams.get('category') || 'all';
  const price = searchParams.get('price') || 'all';
  const rating = searchParams.get('rating') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1');

  if (searchParams.get('action') === 'categories') {
    const categories = await ProductModel.distinct('category');
    return NextResponse.json(categories);
  }

  const queryFilter =
    q && q !== 'all' ? { name: { $regex: q, $options: 'i' } } : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const ratingFilter =
    rating && rating !== 'all' ? { rating: { $gte: Number(rating) } } : {};
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const order: Record<string, 1 | -1> =
    sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
        ? { price: -1 }
        : sort === 'rating' // Changed from 'toprated' to match client
          ? { rating: -1 }
          : { _id: -1 };

  const [products, countProducts, categories] = await Promise.all([
    ProductModel.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(order)
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE)
      .lean(),
    ProductModel.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    }),
    ProductModel.distinct('category'),
  ]);

  return NextResponse.json({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / PAGE_SIZE),
    categories,
  });
}
