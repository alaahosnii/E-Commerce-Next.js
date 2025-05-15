import React from 'react'
import SignUpForm from '../_components/SignUpForm/SignUpForm'
import Image from 'next/image'
function SignUp() {
  return (
    <div className='mt-3'>
      <div className='flex items-center'>
        <Image alt='signup' src="/signup_img.png" className='col-6' height={400} width={560}/>
        <div className='col-2'></div>
        <div className='col-4'>
          <h2>Create an Account</h2>
          <SignUpForm />
        </div>

      </div>
    </div>
  )
}

export default SignUp