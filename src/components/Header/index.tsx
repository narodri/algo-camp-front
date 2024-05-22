"use client"

import Link from "next/link";

export default function Header({name}:any){
    return(
        <div className="bg-white dark:bg-gray-800 ">
            <div className="lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                <div className="text-5xl font-extrabold text-black dark:text-white sm:text-4xl">
                    <span className="block">
                        {name}
                    </span>
                </div>
            </div>
        </div>
    )
}
