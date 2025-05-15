import React from 'react';
import "./NavComponent.css";
import styles from './NavComponent.module.css';
import NavLinks from '../NavLinks/NavLinks';
import UserActions from '../UserActions/UserActions';
import LogoComponent from '../LogoComponent/LogoComponent';

function NavComponent() {

  return (
    <div className={`flex flex-row lg:justify-between lg:items-center ${styles.navBar}`}>
      <LogoComponent />
      <NavLinks />
      <div className='lg:flex lg:items-center gap-1 hidden'>
        <UserActions />
      </div>
    </div>
  )
}

export default NavComponent