"use client"
import React from 'react'
import {  useSelector } from 'react-redux';
import { RootState } from '../../_redux/store';
import CartItemContent from '../CartItemContent/CartItemContent';

function CartItem() {
  const cartState = useSelector((state: RootState) => state.cart);
  // const { userCart } = useContext(ProductsInCartContext);

  return (

    cartState.localCart.products.length != 0 ? cartState.localCart.products.map((product) => <CartItemContent key={product.id} product={product} />)
      : <div>No Products</div>

  )
}

export default CartItem