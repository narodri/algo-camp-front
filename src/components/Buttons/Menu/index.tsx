"use client"

import Link from "next/link";

export default function Menu(props:any){
    return(
        <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
                href={props.path}
                className="rounded-md bg-indigo-600 w-96 py-3 text-xl text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {props.name}
            </Link>
        </div>
    )
}
