"use client"
import React from 'react'
import { RootState } from '@/app/_redux/store';
import { useSelector } from 'react-redux';

export default function Welcome() {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className='flex gap-1 justify-end items-end'>
            <p className='mb-0'>Welcome!</p>
            <p className='mb-0 font-bold text-red-500'>{user && user.name}</p>
        </div>
    )
}
