import React from 'react'
import styles from "./About.module.css"
import ServiceCard from '@/app/_components/ServiceCard/ServiceCard';
import ManagerCard from '@/app/_components/ManagerCard/ManagerCard';
import OurService from '@/app/_components/OurService/OurService';
import Image from 'next/image';
import PageNav from '@/app/_components/PageNav/PageNav';
function About() {
  const managers = [
    {
      managerImage: "/person1.png",
      managerName: "John Doe",
      managerPosition: "Founder & Chairman",
    },
    {
      managerImage: "/person2.png",
      managerName: "Emma Watson",
      managerPosition: "Managing Director",
    },
    {
      managerImage: "/person3.png",
      managerName: "Will Smith",
      managerPosition: "Product Designer",
    },
  ]
  const ourServices = [
    {
      ourServiceImage: "/our_service1.png",
      ourServiceName: "FREE AND FAST DELIVERY",
      ourServiceDesc: "Free delivery for all orders over $140"
    },
    {
      ourServiceImage: "/our_service2.png",
      ourServiceName: "24/7 CUSTOMER SERVICE",
      ourServiceDesc: "Friendly 24/7 customer support"
    },
    {
      ourServiceImage: "/our_service3.png",
      ourServiceName: "MONEY BACK GUARANTEE",
      ourServiceDesc: "We return money within 30 days"
    },
  ]
  const services = [
    {
      serviceName: "10.5k",
      serviceImage: "/service1.png",
      serviceDescription: "Sallers active our site"
    },
    {
      serviceName: "33k",
      serviceImage: "/service2.png",
      serviceDescription: "Monthly Produduct Sale"
    },
    {
      serviceName: "45.5k",
      serviceImage: "/service3.png",
      serviceDescription: "Customer active in our site"
    },
    {
      serviceName: "25k",
      serviceImage: "/service4.png",
      serviceDescription: "Anual gross sale in our site"
    },
  ]
  return (
    <div >
      <PageNav title="About" />
      <div className='flex mt-3 items-center'>
        <div className={`${styles.container} col-6`}>
          <h1 className='mb-0'>Our Story</h1>
          <div className='mt-3'>
            <p className='mb-0 text-xs sm:text-sm md:text-base lg:text-lg'>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
            <p className='mb-0 mt-3 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
          </div>
        </div>
        <div className='col-1'></div>
        <div className='col-5'>
          <Image src="/about_image.png" width={500} height={500} alt="about image" className='col-12'/>
        </div>
      </div>
      <div className='flex flex-wrap container gap-5 justify-evenly' style={{ marginTop: "150px" }}>
        {
          services.map((service, index) => <ServiceCard index={index} serviceName={service.serviceName} serviceImage={service.serviceImage} serviceDescription={service.serviceDescription} key={service.serviceName} />)
        }
      </div>
      <div className='mt-5 flex flex-wrap container gap-5 justify-evenly'>
        {
          managers.map((manager) => <ManagerCard manager={manager} key={manager.managerName} />)
        }
      </div>
      <div className='mt-5 flex flex-wrap container gap-5 justify-evenly'>
        {
          ourServices.map((service) => <OurService service={service} key={service.ourServiceName} />)
        }
      </div>
    </div>
  )
}

export default About