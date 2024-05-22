"use client"

import Link from "next/link";

export default function Password(props:any){
    return(
        <div className="flex flex-col items-center mt-2 relative ">
            <label htmlFor="name-with-label" className="text-sm grid font-medium leading-6 text-gray-900">
                {props.title}
            </label>
            <input
                type="password"
                id="name-with-label"
                className="block rounded-md border-0 w-80 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                name={props.name}
                placeholder={props.message}/>
        </div>
    )
}
