import React from 'react'
import styles from "./Cart.module.css"
import CartItem from '../_components/CartItem/CartItem'
import CartSummary from '../_components/CartSummary/CartSummary'

function Cart() {
  // const { userCart } = useContext(ProductsInCartContext);

  // console.log("local " , cartState.localCart);

  // const cartProducts = cartState.products;
  // console.log(cartState);

  return (
    <div className={`${styles.mainWrapper}`}>
      <div className={`${styles.mainContent} flex flex-col mt-5 items-center`}>
        <div className='shadow p-3 mb-5 bg-white rounded w-full flex'>
          <div className='col-3 text-center'>Product</div>
          <div className='col-3 text-center'>Price</div>
          <div className='col-3 text-center'>Quantity</div>
          <div className='col-3 text-center'>Subtotal</div>
        </div>
        <CartItem />

        <CartSummary />
      </div>
    </div>

  )
}

export default Cart