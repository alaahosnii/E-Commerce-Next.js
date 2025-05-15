"use client";
import React, { useEffect, useState } from 'react'
import styles from './FlashSaleLabel.module.css'
import Image from 'next/image';

function FlashSaleLabel() {
  const dateNow = new Date();
  const salesExpiryDate = new Date("2025-03-05T08:15:00");
  const difference = salesExpiryDate.getTime() - dateNow.getTime();
  const [remainingDate, setRemainingDate] = useState({
    days: difference > 0 ? Math.floor(difference / (1000 * 60 * 60 * 24)) : 0,
    hours: difference > 0 ? Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : 0,
    minutes: difference > 0 ? Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)) : 0,
    seconds: difference > 0 ? Math.floor((difference % (1000 * 60)) / 1000) : 0
  });

  useEffect(() => {
    console.log("flash");

    const salesExpiryDate = new Date("2025-03-05T08:15:00");
    const id = setInterval(() => {
      const dateNow = new Date();
      const difference = salesExpiryDate.getTime() - dateNow.getTime();
      if (difference > 0) {
        setRemainingDate({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setRemainingDate({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        clearInterval(id);

      }

    }, 1000);

    return () => {
      clearInterval(id);
    }
  }, [])


  return (
    <div>
      <div className={`${styles.categoryLabel} flex items-center`}>
        <div className={`${styles.redCard} rounded`}></div>
        <h6 className='ms-3 mb-0'> Today&apos;s </h6>
      </div>


      <div className='flex'>

        <div className='flex flex-col items-start md:flex-row md:items-center md:w-full'>
          <h4 className='mb-0 mt-3'>Flash Sale</h4>
          <div className='flex gap-3 items-center md:ms-50'>
            <div className='flex p-2 flex-col items-center'>
              <p className='mb-0' style={{ fontSize: "13px" }}>Days</p>
              <h4 className='mb-0'>{remainingDate.days}</h4>
            </div>
            <Image
              src="/semicolon.png"
              alt='semicolon'
              width={4}
              height={20}
            />

            <div className='flex p-2 flex-col items-center'>
              <p className='mb-0' style={{ fontSize: "13px" }}>Hours</p>
              <h4 className='mb-0'> {remainingDate.hours} </h4>
            </div>
            <Image
              src="/semicolon.png"
              alt='semicolon'
              width={4}
              height={20}
            />
            <div className='flex p-2 flex-col items-center'>
              <p className='mb-0' style={{ fontSize: "13px" }}>Minutes</p>
              <h4 className='mb-0'> {remainingDate.minutes} </h4>
            </div>
            <Image
              src="/semicolon.png"
              alt='semicolon'
              width={4}
              height={20}
            />
            <div className='flex p-2 flex-col items-center'>
              <p className='mb-0' style={{ fontSize: "13px" }}>Seconds</p>
              <h4 className='mb-0'> {remainingDate.seconds} </h4>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default FlashSaleLabel;