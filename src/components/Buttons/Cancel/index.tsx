"use client"
import { useRouter } from 'next/navigation'  // Usage: App router

export default function Cancel(props:any){
    const router=useRouter()
    return(
        <button
            type="button" onClick={()=>router.push(props.path)}
            className="px-6 py-2 rounded-full focus:outline-none transition ease-in duration-200 hover:bg-gray-800 hover:text-white border-2 border-gray-900 ">
            {props.title}
        </button>
    )
}
