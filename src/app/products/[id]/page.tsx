import ProductDetails from '@/app/_components/ProductDetails/ProductDetails';
import { Metadata } from 'next';
import React, { Suspense } from 'react'

type Params = {
  params: Promise<{ id: string }>
}
export const metadata: Metadata = {
  title: "Product Details",
  description: "Product Details",
};

export default async function Page({ params }: Params) {
  const { id } = await params;
  console.log("id", id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails id={id} />
    </Suspense>
  )
}

