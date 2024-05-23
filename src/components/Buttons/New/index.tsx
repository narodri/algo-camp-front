"use client"

import Link from "next/link";
import { useRouter } from 'next/navigation'  // Usage: App router

export default function New(props:any){
    const router=useRouter()
    return(
        <a
            className="group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            href={props.path}>
            <span
                className="block rounded-full bg-white px-5 py-2 text-m group-hover:bg-transparent">
                Create New!
            </span>
        </a>
    )
}

