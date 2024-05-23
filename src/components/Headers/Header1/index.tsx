"use client"

import Link from "next/link";

export default function Header1({title}:any){
    return(
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-48 text-center text-6xl font-bold leading-2 tracking-tight text-gray-900">
                {title}
            </h2>
        </div>
    )
}
