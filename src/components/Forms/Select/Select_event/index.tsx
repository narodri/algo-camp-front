'use client' // CSRの設定

import { useState, useEffect } from "react";

export default function Select_event(props:any){
    const [events, setEvents] = useState<any>([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsResponse = await fetch("http://localhost:8000/events/");
  
                const eventsData = await eventsResponse.json();
                console.log(eventsData);
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
  
        fetchData();
    }, []);
    console.log(events)
    return(
        <div className="mx-auto mb-0 mt-8 space-y-4">
            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                対応イベント名
            </label>
            <select
                // defaultValue={props.value}
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
