'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, ValidationRule, useForm } from 'react-hook-form';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';
import { ShippingAddress } from '@/lib/models/OrderModel';

// List of countries for dropdown
const countries = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'China',
  'Brazil',
];

const Form = () => {
  const router = useRouter();
  const { saveShippingAddress, shippingAddress } = useCartService();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'India', // Default to India
    },
  });

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName || '');
    setValue('address', shippingAddress.address || '');
    setValue('city', shippingAddress.city || '');
    setValue('postalCode', shippingAddress.postalCode || '');
    setValue('country', shippingAddress.country || 'India');
  }, [setValue, shippingAddress]);

  const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
    saveShippingAddress(form);
    router.push('/payment');
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
    placeholder,
    type,
  }: {
    id: keyof ShippingAddress;
    name: string;
    required?: boolean;
    placeholder: string;
    type: string;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className='mb-2'>
      <label className='label' htmlFor={id}>
        {name}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        id={id}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        className='input input-bordered w-full'
      />
      {errors[id]?.message && (
        <div className='text-error'>{errors[id]?.message}</div>
      )}
    </div>
  );

  return (
    <div>
      <CheckoutSteps current={1} />
      <div className='card mx-auto my-4 max-w-lg bg-base-300'>
        <div className='card-body'>
          <h1 className='card-title'>Shipping Address</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormInput
              name='Full Name'
              id='fullName'
              type='text'
              required
              placeholder='John Deo'
            />
            <FormInput
              name='Address'
              id='address'
              type='address'
              required
              placeholder='Full Address'
            />
            <FormInput
              name='City'
              id='city'
              required
              placeholder='New Delhi'
              type='address'
            />
            <FormInput
              name='Postal Code'
              id='postalCode'
              type='number'
              required
              placeholder='110008'
            />
            <div className='mb-2'>
              <label className='label' htmlFor='country'>
                Country
              </label>
              <select
                id='country'
                {...register('country', { required: 'Country is required' })}
                className='input input-bordered w-full'
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country?.message && (
                <div className='text-error'>{errors.country?.message}</div>
              )}
            </div>
            <div className='my-2'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='btn btn-primary w-full'
              >
                {isSubmitting && <span className='loading loading-spinner' />}
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
