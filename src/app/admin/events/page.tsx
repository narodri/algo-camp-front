'use client' // CSRの設定

import { useState, useEffect } from "react"
import Link from "next/link";
import Logout from "@/components/Buttons/Logout";
import Solve from "@/components/Buttons/Solve";
import Label from "@/components/Table/Label";
import Update from "@/components/Buttons/Update";
import Delete from "@/components/Buttons/Delete";
import {GET} from "@/app/api/events/route"
import Cancel from "@/components/Buttons/Cancel";

export default function Page() {
  const [events, setEvents] = useState<any[]>([]);
  let num_of_questions = events.length
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET();
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchData();
  }, []);
  let num_of_events = (events.length);

    return(
      <div className="mt-10 space-x-16">
        <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-8">
            <div>
                <h2 className="mt-12 mr-10 text-right">
                    <Cancel title={"戻る"}/>
                </h2>
                <h1 className="font-bold text-5xl mt-3 ml-3">
                  イベント一覧
                </h1>
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
                                    <Label title={""}/>
                                </tr>
                            </thead>{
                            events.map(event=>{
                                return (
                                    <tbody>
                                        <tr>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {event.id}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {event.opened_at}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {event.end_at}
                                                </p>
                                            </td>
                                            <td className="px-2 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                <Update/>
                                                </p>
                                            </td>
                                            <td className="px-2 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                <Delete/>
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