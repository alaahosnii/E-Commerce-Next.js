"use client"
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const navigate = useRouter();
    const pathName = usePathname();
    return (
        <div className='container mx-auto'>
            <div className='flex gap-2 mt-4'>
                <div onClick={() => navigate.push("/")} className='text-gray-500 hover:text-black cursor-pointer'>Home</div>
                <div>{pathName.split("/").join(" / ")}</div>
            </div>
            {children}
        </div>
    )
}
