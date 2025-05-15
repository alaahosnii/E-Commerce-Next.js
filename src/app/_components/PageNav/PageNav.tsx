"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
interface PageNavProps {
    title: string;
}
export default function PageNav({ title }: PageNavProps) {
    const router = useRouter();
    return (
        <div className='flex gap-2 mt-4'>
            <div onClick={() => router.push("/")} className='text-gray-500 hover:text-black cursor-pointer'>Home</div>
            <div style={{ color: "grey" }}>/</div>
            <div>{title}</div>
        </div>
    )
}
