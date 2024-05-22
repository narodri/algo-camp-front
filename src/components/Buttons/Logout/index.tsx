"use client"

import Link from "next/link";

export default function Logout(){
    return(
        <Link
            href="/"
            className="px-6 py-2 rounded-full focus:outline-none transition ease-in duration-200 hover:bg-gray-800 hover:text-white border-2 border-gray-900 ">
            ログアウト
        </Link>
    )
}
