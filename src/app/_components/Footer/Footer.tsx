import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image'
function Footer() {
  return (
    <div className={`${styles.footer} bg-black text-white`}>
      <div className={`${styles.footerContainer} flex items-center sm:items-start gap-5 sm:gap-0 flex-col ml-10 mr-10 w-full md:grid md:grid-cols-12 `}>
        <div className='flex flex-col col-span-3 w-full items-center sm:items-start'>
          <h3>Exclusive</h3>
          <h5>Subscribe</h5>
          <p className=' text-sm'>Get 10% off your first order</p>
        </div>
        <div className='flex flex-col col-span-3 w-full items-center sm:items-start'>
          <h3 >Support</h3>
          <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
          <p className='text-light'>exclusive@gmail.com</p>
          <p className='text-light'>+88015-88888-9999</p>
        </div>
        <div className='flex flex-col col-span-2 w-full items-center sm:items-start'>
          <h3>Account</h3>
          <p className='text-sm'>My Account</p>
          <p className='text-sm'>Login / Register</p>
          <p className='text-sm'>Cart</p>
          <p className='text-sm'>Wishlist</p>
          <p className='text-sm'>Shop</p>
        </div>
        <div className='flex flex-col col-span-2 w-full items-center sm:items-start'>
          <h3>Quick Link</h3>
          <p className='text-sm'>Privacy Policy</p>
          <p className='text-sm'>Terms Of Use</p>
          <p className='text-sm'>FAQ</p>
          <p className='text-sm'>Contact</p>
        </div>
        <div className='flex flex-col col-span-2 w-full items-center sm:items-start'>
          <h3>Download App</h3>
          <p className='text-sm'>Save $3 with App New User Only</p>
          <div className='flex flex-col md:flex-row gap-2 items-center'>
            <Image alt='qr' src= "/qr.png" width={80} height={80} />
            <div className='flex flex-col gap-3 justify-center'>
              <Image alt='playstore' src= "/google_play.png" width={104} height={0} />
              <Image alt='appstore' src= "/app_store.png" width={104} height={30} />
            </div>
          </div>
          <div className='flex gap-2 justify-between mt-4'>
            <Image alt='social' src= "/facebook.png" width={24} height={24} />
            <Image alt='social' src= "/twitter.png" width={24} height={24} />
            <Image alt='social' src= "/insta.png" width={24} height={24} />
            <Image alt='social' src= "/linkedIn.png" width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer