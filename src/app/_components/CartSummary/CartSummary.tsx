"use client"
import React from 'react'
import Spacer from "../Spacer/Spacer"
import { useSelector } from 'react-redux';
import { RootState } from '../../_redux/store'
import { useRouter } from 'next/navigation';

function CartSummary() {
  const cartState = useSelector((state: RootState) => state.cart);
  console.log("cartState", cartState);
  const navigate = useRouter();
  // const cartState = useSelector((state) => state.cart);
  // const cartProducts = cartState.products;
  // console.log(userCart);

  const total = cartState.localCart.totalPrice;
  return (
    <div className='ms-auto col-12 col-md-4 border-1 p-3 border-black rounded'>
      <h6 className='mb-0'>Cart Total</h6>
      <div className='mt-3'>
        <div className='mb-2 text-secondary flex justify-between' style={{ fontSize: "13px" }}>
          <div>Sub Total:</div>
          <div>{`$${total.toFixed(2)}`}</div>
        </div>
        <Spacer direaction={"horizontal"} />
        <div className='mt-2 mb-2 text-secondary flex justify-between' style={{ fontSize: "13px" }}>
          <div>Shipping:</div>
          <div>$0</div>
        </div>
        <Spacer direaction={"horizontal"} />
        <div className='mt-2 text-secondary flex justify-between' style={{ fontSize: "13px" }}>
          <div>Total:</div>
          <div>{`$${total.toFixed(2)}`}</div>
        </div>
      </div>
      <div className='flex justify-center mt-3'>
        <button disabled={cartState.localCart.products.length == 0} onClick={() => navigate.push("/checkout")} className='btn btn-danger' type="button">Proceed to Checkout</button>
      </div>
    </div>
  )
}

export default CartSummary