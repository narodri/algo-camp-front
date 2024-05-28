'use client' // CSRの設定

import { useState, useEffect } from "react"
import {useRouter} from "next/navigation"
import Header2 from "@/components/Headers/Header2";
import Row from "@/components/Table/Row";
import Label from "@/components/Table/Label";
import Delete_event from "@/components/Buttons/Delete/Delete_events";

export default function Page() {
    const router = useRouter()
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsResponse = await fetch("http://localhost:8000/events/");

                const eventsData = await eventsResponse.json();

                setEvents(eventsData);
                console.log(events)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return(
      <div className="mt-10 space-x-16">
        <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-0">
            <Header2 title={"イベント一覧"} path={"/admin/events/create"}/>
            <div className="py-8">
                <div className="px-4 py-4 mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="min-w-full leading-normal text-center">
                            <thead>
                                <tr>
                                    <Label title={"イベント名"}/>
                                    <Label title={"開始"}/>
                                    <Label title={"終了"}/>
                                    <Label title={""}/>
                                    <Label title={""}/>
                                </tr>
                            </thead>{
                            events.map((event:any)=>{
                                return (
                                    <tbody>
                                        <tr>
                                        <Row title={event.title}/>
                                        <Row title={event.opened_at_str + " ~ "}/>
                                        <Row title={event.end_at_str}/>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                <button
                                                    type="submit"
                                                    onClick={()=>router.push("/admin/events/update/"+event.id)}
                                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
                                                    編集
                                                </button>
                                                </p>
                                            </td>
                                        <Row title={<Delete_event id={event.id}/>}/>
                                        </tr>
                                    </tbody>
                                )})}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
      )
  }