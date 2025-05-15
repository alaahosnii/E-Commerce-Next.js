import React from 'react'
import styles from './ManagerCard.module.css'
import Image from 'next/image'
interface ManagerCardProps {
  manager: {
    managerImage: string,
    managerName: string,
    managerPosition: string
  }
}
function ManagerCard({ manager }: ManagerCardProps) {
  return (
    <div className={styles.ManagerCard}>
      <Image src={manager.managerImage} width={400} height={100} alt="manager image" />
      <h4 className='mt-3'>{manager.managerName}</h4>
      <p>{manager.managerPosition}</p>
      <div className='flex gap-2'>
        <Image src= "/twitter_black.png" width={20} height={20} alt="twitter black" />
        <Image src="/insta_black.png" width={20} height={20} alt="instagram black" />
        <Image src="/linked_black.png" width={20} height={20} alt="linked black" />
      </div>
    </div>
  )
}

export default ManagerCard