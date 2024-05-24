'use client' // CSRの設定

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logout from "@/components/Buttons/Logout";
import Label from "@/components/Table/Label";
import Row from "@/components/Table/Row";
import Participate from "@/components/Buttons/Participate";
import {GET} from "@/app/api/events/route"

export default async function Page(props:any) {
    // const [events, setEvents] = useState<any[]>([]);
    // let num_of_questions = events.length
    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {
    //         const response = await GET();
    //         const data = await response.json();
    //         setEvents(data);
    //         console.log(data)
    //     } catch (error) {
    //         console.error('Error fetching events:', error);
    //     }
    // };
    // fetchData();
    // }, []);
    // let num_of_events = (events.length);
    const router=useRouter()
    const response = await fetch("http://localhost:8000/events_active")
    const data = await response.json();
    const events1 = [JSON.stringify(data)];
    const events = JSON.parse(events1[0]);
    console.log(events)
    let num_of_events = (events.length);
    const response2 = await fetch("http://localhost:8000/users/")
    const data2 = await response2.json();
    const users2 = [JSON.stringify(data2)];
    const users = JSON.parse(users2[0]);
    let num_of_users = (events.length);

    return(
    <div className="mt-10 space-x-16">
        <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-8">
            <div>
                <h2 className="mt-12 mr-10 text-right">
                    <Logout/>
                </h2>
                <h1 className="font-bold text-5xl mt-3 ml-3">イベント一覧</h1>
                <h2 className="font-normal text-2xl mt-10 ml-5">Welcome back, {users[--props.params.id].name} !</h2>
            </div>

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
                                </tr>
                            </thead>{
                            events.map((event:any)=>{
                                return (
                                    <tbody>
                                        <tr>
                                            <Row title={event.title}/>
                                            <Row title={event.opened_at}/>
                                            <Row title={event.end_at}/>
                                            {/* <Row title={<Participate/>}/> */}
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    <button
                                                        type="submit"
                                                        onClick={()=>router.push("/events/"+props.params.id+"/read_event/"+event.id)}
                                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
                                                        参加
                                                    </button>
                                                </p>
                                            </td>
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