import React from 'react'
import styles from './WishList.module.css'
import WishListContent from '@/app/_components/WishListContent/WishListContent';
function WishList() {

  return (
    <div className={`${styles.mainWrapper}`}>
      <WishListContent />
    </div>
  )
}

export default WishList