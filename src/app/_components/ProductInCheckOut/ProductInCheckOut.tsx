import React from 'react'
import { Product } from '@/app/_types/productTypes';
import Image from 'next/image';
function ProductInCheckOut({ product }: { product: Product }) {
  return (
    <div className='flex justify-between items-center mb-4'>
      <div className='flex gap-4 items-center'>
        <Image src={product.imageUrl} width={50} height={50} alt={product.name} />
        <p className='mb-0'>{product.name}</p>
      </div>
      <p className='mb-0'> ${product.price} </p>
    </div>
  )
}

export default ProductInCheckOut