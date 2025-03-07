import mongoose from 'mongoose';

export type Product = {
  _id?: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  makingCharge?: string;
  materialCost: string;
  description: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  isFeatured: boolean;
  __v: any;
};

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    makingCharge: Number,
    materialCost: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const ProductModel =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default ProductModel;
