// "use client"

import Link from "next/link";

export default async function Select_event(props:any){
    const response1 = await fetch("http://localhost:8000/events")
    const data = await response1.json();
    const events1 = [JSON.stringify(data)];
    const events = JSON.parse(events1[0]);
    console.log(events)
    return(
        <div className="mx-auto mb-0 mt-8 space-y-4">
            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                対応イベント名
            </label>
            <select defaultValue={props.default}
                name={props.name}
                id="HeadlineAct"
                className="block rounded-md border-0 w-1/3 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                {/* <option value="">Please select</option> */}
                {events.map((event:any)=>{
                                return (
                                    <option value={event.id}>{event.title}</option>
                                )}
                )}
            </select>
        </div>
    )
}
