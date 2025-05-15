"use client"
import React, { useEffect, useState } from 'react'
import styles from './TimerCard.module.css'
function TimerCard({ type }: {
  type: string,
}) {

  const [remainingDate, setRemainingDate] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  useEffect(() => {
    const salesExpiryDate = new Date("2025-04-05T08:15:00");

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
  }, []);
  return (
    <div className={`${styles.card} bg-white flex flex-col items-center justify-center rounded-full`}>  
      <p className='mb-0 font-bold'>{type === "Days" ? remainingDate.days : type === "Hours" ? remainingDate.hours : type === "Minute" ? remainingDate.minutes : remainingDate.seconds}</p>
      <p className='mb-0'>{type}</p>
    </div>
  )
}

export default TimerCard