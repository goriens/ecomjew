// lib/services/productService.client.ts
'use client';

const productService = {
  getByQuery: async ({
    category,
    q,
    price,
    rating,
    page,
    sort,
  }: {
    category: string;
    q: string;
    price: string;
    rating: string;
    page: string;
    sort: string;
  }) => {
    const url = new URL('/api/products', window.location.origin);
    const params = { category, q, price, rating, page, sort };
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getCategories: async () => {
    const response = await fetch('/api/products/categories');
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },
};

export default productService;
