import React from 'react'
import Image from 'next/image'
interface ServiceCardProps {
  serviceName: string,
  serviceImage: string,
  serviceDescription: string,
  index: number
}
function ServiceCard({ serviceName, serviceImage, serviceDescription, index }: ServiceCardProps) {
  return (
    <div style={{ width: "220px" }} className={` ${index == 1 ? "bg-danger  border-1 border-danger text-white" : " border-1 border-black"} shadow p-3 mb-5 rounded flex flex-col items-center justify-center`}>
      <Image src={serviceImage} width={60} height={60} alt="service image" />
      <h5 className='mt-3 mb-0'>{serviceName}</h5>
      <p style={{ fontSize: "13px" }} className={`${index == 1 ? "text-white" : "text-black"}  mb-0 mt-1`}> {serviceDescription}</p>
    </div>
  )
}

export default ServiceCard;