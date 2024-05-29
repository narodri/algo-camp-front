"use client"

import { useRouter } from 'next/navigation'

export default function Submit(props:any){
    const router=useRouter()
    return(
        <button
            type="submit"
            onChange={props.onChange}
            onClick={props.onClick}
            className="px-14 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
            作成
        </button>
    )
}

