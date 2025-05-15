import React from 'react'
import LoginForm from '../_components/LoginForm/LoginForm'
import Image from 'next/image'

const Login = () => {
  return (
    <div className='mt-3'>
      <div className='flex items-center'>
        <Image alt='signup' src="/signup_img.png" className='col-6' height={560} width={560} />
        <div className='col-2'></div>
        <div className='col-4'>
          <h2>Log in to Exclusive</h2>
          <p>Enter your details below</p>
          <LoginForm />
        </div>

      </div>
    </div>
  )
}

export default Login