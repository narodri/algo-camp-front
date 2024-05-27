"use client"

import Link from "next/link";

export default function Input(props:any){
    return(
        <div className="mx-auto mb-0 mt-8 space-y-4">
            <label htmlFor="name-with-label" className="text-m grid font-medium leading-6 text-gray-900">
                {props.title}
            </label>
            <label htmlFor="name-with-label" className="text-sm grid font-medium leading-6 text-gray-900">
                {props.sub_title}
            </label>
            <div
                className="block bg-gray-100 rounded-md border-0 w-full py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                {props.message}
            </div>
        </div>
    )
}
