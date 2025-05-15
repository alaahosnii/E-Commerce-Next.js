"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Drawer from '@mui/material/Drawer';
import DrawerList from '../DrawerList';

function LogoComponent() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setIsDrawerOpen(open);
    };

    return (
        <div className='flex flex-row h-fit items-center'>
            <Image
                className='lg:hidden mr-5 cursor-pointer'
                alt='menu'
                src="/menu_icon.png"
                height={50}
                width={50}
                onClick={toggleDrawer(true)}
            />
            <h1 className='mb-0'>Exclusive</h1>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <div className="p-4 w-64">
                    <DrawerList setIsDrawerOpen={setIsDrawerOpen} />
                </div>
            </Drawer>
        </div>
    );
}

export default LogoComponent;
