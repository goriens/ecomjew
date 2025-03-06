'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import { Product } from '@/lib/models/ProductModel';

export default function ProductAddForm() {
  const router = useRouter();
  const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
    '/api/admin/products',
    async (url, { arg }) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success('Product added successfully');
      router.push('/admin/products');
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  const formSubmit = async (formData: any) => {
    await createProduct(formData);
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
    placeholder,
  }: {
    id: keyof Product;
    name: string;
    required?: boolean;
    placeholder?: string;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className='mb-6 md:flex'>
      <label className='label md:w-1/5' htmlFor={id}>
        {name}
      </label>
      <div className='md:w-4/5'>
        <input
          type='text'
          id={id}
          placeholder={placeholder}
          {...register(id, {
            required: required && `${name} is required`,
            pattern,
          })}
          className='input input-bordered w-full max-w-md text-white'
        />
        {errors[id]?.message && (
          <div className='text-error'>{errors[id]?.message}</div>
        )}
      </div>
    </div>
  );

  const uploadHandler = async (e: any) => {
    const toastId = toast.loading('Uploading image...');
    try {
      const resSign = await fetch('/api/cloudinary-sign', {
        method: 'POST',
      });
      const { signature, timestamp } = await resSign.json();
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await res.json();
      console.log(data.secure_url);
      setValue('image', data.secure_url);
      toast.success('File uploaded successfully', {
        id: toastId,
      });
    } catch (err: any) {
      toast.error(err.message, {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <h1 className='py-4 text-2xl'>Add New Product</h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput
            name='Name'
            id='name'
            required
            placeholder='Product Name'
          />
          <FormInput
            name='Slug'
            id='slug'
            required
            placeholder='Product Slug'
          />
          <FormInput
            name='Image'
            id='image'
            required
            placeholder='Image URL (Only cloudinary images allowed)'
          />
          <div className='mb-6 md:flex'>
            <label className='label md:w-1/5' htmlFor='imageFile'>
              Upload Image
            </label>
            <div className='md:w-4/5'>
              <input
                type='file'
                className='file-input w-full max-w-md'
                id='imageFile'
                onChange={uploadHandler}
              />
            </div>
          </div>
          <FormInput name='Price' id='price' required placeholder='300' />
          <FormInput
            name='Material Cost'
            id='materialCost'
            required
            placeholder='200'
          />
          <FormInput
            name='Making Charges'
            id='makingCharge'
            required
            placeholder='150'
          />
          <FormInput
            name='Category'
            id='category'
            required
            placeholder='Product Category'
          />
          <FormInput
            name='Description'
            id='description'
            required
            placeholder='Product Description'
          />
          <FormInput
            name='Count In Stock'
            id='countInStock'
            required
            placeholder='Stock Count'
          />

          <button
            type='submit'
            disabled={isCreating}
            className='btn btn-primary'
          >
            {isCreating && <span className='loading loading-spinner'></span>}
            Add Product
          </button>
          <Link className='btn ml-4 ' href='/admin/products'>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
