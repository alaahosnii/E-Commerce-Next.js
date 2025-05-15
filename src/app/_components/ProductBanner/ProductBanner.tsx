import React from 'react'
import TimerCard from '../TimerCard/TimerCard'
import { Button } from 'react-bootstrap'
import Image from 'next/image';
function ProductBanner() {

  return (
    <div className='relative w-full' style={{ marginTop: "100px", height: "fit-content" }}>
      <Image src= "/jbl_image.png" height={500} width={1000} alt='jbl image' className='w-full h-full object-cover'/>
      <div className='flex flex-col absolute h-full justify-evenly' style={{ left: 50, top: 0}}>
        <p className='mb-0' style={{ color: "#00FF66" }}>Categories</p>
        <div className='flex flex-col gap-4'>
          <p className='mb-0 text-sm md:text-base lg:text-lg xl:text-4xl font-bold' style={{ color: "white" }}>
            Enhance Your Music Experience
          </p>
          <div className='flex gap-4'>
            <TimerCard type={"Days"} />
            <TimerCard type={"Hours"} />
            <TimerCard type={"Minute"} />
            <TimerCard type={"Seconds"} />
          </div>
        </div>

        <Button
          variant="contained"
          className={` text-black`}
          style={{ height: "50px", width: "171px", backgroundColor: "#00FF66" }}>
          Buy Now!
        </Button>

      </div>
    </div>
  )
}

export default ProductBanner