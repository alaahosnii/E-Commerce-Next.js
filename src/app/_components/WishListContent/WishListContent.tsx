"use client"
import React from 'react'
import styles from './WishListContent.module.css'
import ProductComponent from '../ProductComponent/ProductComponent'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/app/_redux/store'
import { addToCart } from '@/app/_redux/slices/CartSlice'
export default function WishListContent() {
  const favoriteState = useSelector((state: RootState) => state.favorite);
  const dispatch = useDispatch<AppDispatch>();
  const addAllToCart = () => {
    favoriteState.products.forEach((product) => dispatch(addToCart({
      ...product,
      quantity: 1,
      subTotalPrice: product.price,
    })));
  }
  return (
    <div className={`${styles.mainContent} mt-5`}>
      <div className='flex justify-between'>
        <p className='mb-0 text-dark-emphasis'>WishList ({favoriteState.products.length})</p>
        <div onClick={addAllToCart} className={`${styles.moveAllToCart} btn border-1 border-black rounded relative`}>
          <p className='mb-0 p-2'>Move All To Cart</p>
          <div className={`${styles.moveToCartWhenHover} absolute bg-black bottom-0 h-full w-full`}>
            <p className='text-white p-2'>Move All To Cart</p>
          </div>
        </div>
      </div>
      <div className='flex gap-3 flex-wrap mt-4 justify-center md:justify-start'>
        {
          favoriteState.products.length != 0 ?
            favoriteState.products.map((product) => <ProductComponent key={product.id} isWishList={true} product={product} />)
            : <div>No Products</div>
        }
      </div>
    </div>
  )
}
