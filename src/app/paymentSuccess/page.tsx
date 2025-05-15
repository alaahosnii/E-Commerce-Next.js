import React from 'react'
import Image from 'next/image';
import PaymentSuccessContent from '../_components/PaymentSuccessContent/PaymentSuccessContent';
function PaymentSuccess() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "80vh" }}>
      <Image src= "/assets/payment_success.png" alt="payment success" height={300} width={300} />
      <PaymentSuccessContent />
    </div>
  )
}

export default PaymentSuccess