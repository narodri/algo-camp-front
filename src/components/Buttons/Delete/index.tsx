"use client"

import Link from "next/link";
import { useRouter } from 'next/navigation'  // Usage: App router

export default function Delete(){
    const router=useRouter()
    return(
        <button
            type="submit" onClick={()=>router.back()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
            削除
        </button>
    )
}

