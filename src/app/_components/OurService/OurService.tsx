import React from 'react'
import Image from 'next/image'
interface OurServiceProps {
  service: {
    ourServiceImage: string,
    ourServiceName: string,
    ourServiceDesc: string
  }
}
function OurService({ service }: OurServiceProps) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Image src={service.ourServiceImage} width={60} height={60} alt="service image" />
      <h5 className='mt-3 mb-0'>{service.ourServiceName}</h5>
      <p style={{ fontSize: "13px" }} className='mb-0 mt-1'>{service.ourServiceDesc}</p>
    </div>
  )
}

export default OurService