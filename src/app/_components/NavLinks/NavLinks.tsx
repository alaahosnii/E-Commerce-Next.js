"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';
import styles from './NavLinks.module.css'
import { RootState } from '@/app/_redux/store';
export default function NavLinks() {
    const pathname = usePathname();
    const links = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Contact",
            href: "/contact",
        },
        {
            name: "About",
            href: "/about",
        },
    ]
    const newLinks = [...links];
    const authState = useSelector((state: RootState) => state.auth);

    if (authState.user) {
        newLinks.push({
            name: "Account",
            href: "/account",
        });
    } else {
        newLinks.push({
            name: "Sign Up",
            href: "/signup",
        });
    }
    return (
        <ul className={`hidden lg:flex-row lg:flex text-sm`}>
            {
                newLinks.map((link) => (
                    <li key={link.name}><Link className={pathname === link.href ? styles.navActive : styles.navDefault} href={link.href}>{link.name}</Link></li>
                ))
            }

        </ul>
    )
}
