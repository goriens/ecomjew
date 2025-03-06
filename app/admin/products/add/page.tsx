import Form from './Form';

import AdminLayout from '@/components/admin/AdminLayout';

export function generateMetadata() {
  return {
    title: `Add Product`,
  };
}

export default function ProductEditPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AdminLayout activeItem='products'>
      <Form />
    </AdminLayout>
  );
}
