"use client"

import Link from "next/link";

export default function Row({title}:any){
    return(
        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
                {title}
            </p>
        </td>
    )
}

