import React from 'react'
import Spacer from '@/app/_components/Spacer/Spacer';
import ContactForm from '@/app/_components/ContactForm/ContactForm';
import Image from 'next/image';
import PageNav from '@/app/_components/PageNav/PageNav';
function Contact() {
  return (
    <div className='container mt-5'>
      <PageNav title="Contact" />
      <div className='mt-5 flex flex-wrap gap-5'>
        <div className='col-12 col-lg-3 border-1 p-4 border-white shadow rounded'>
          <div className='flex gap-3 items-center'>
            <Image src="/phone_icon.png" width={35} height={35} alt="phone icon" />
            <p className='mb-0'>Call To Us</p>
          </div>
          <p className='mb-0 mt-3'>We are available 24/7, 7 days a week.</p>
          <p className='mb-4 mt-3' style={{ fontSize: "14px" }}>Phone: +8801611112222</p>
          <Spacer direaction={"horizontal"} />
          <div className='flex gap-3 items-center mt-4'>
            <Image src="/mail_icon.png" width={35} height={35} alt="email icon" />
            <p className='mb-0'>Write To Us</p>
          </div>
          <p className='mb-0 mt-3'>Fill out our form and we will contact you within 24 hours.</p>
          <p className='mb-4 mt-3' style={{ fontSize: "14px" }}>Emails: customer@exclusive.com</p>
          <p className='mb-4 mt-3' style={{ fontSize: "14px" }}>Emails: support@exclusive.com</p>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact;