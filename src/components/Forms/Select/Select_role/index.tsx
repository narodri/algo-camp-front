"use client"

import Link from "next/link";

export default function Select_role(props:any){
    return(
        <div className="mx-auto mb-0 mt-8 space-y-4">
            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                種別
            </label>
            <select defaultValue={props.default}
                name={props.name}
                id="HeadlineAct"
                className="block rounded-md border-0 w-1/3 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                {/* <option value="">Please select</option> */}
                <option value="0">student</option>
                <option value="1">admin</option>
            </select>
        </div>
    )
}
