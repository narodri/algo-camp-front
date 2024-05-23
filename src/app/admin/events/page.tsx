'use client' // CSRの設定

import { useState, useEffect } from "react"
import Link from "next/link";
import Header2 from "@/components/Headers/Header2";
import Row from "@/components/Table/Row";
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
                            events.map(event=>{
                                return (
                                    <tbody>
                                        <tr>
                                        <Row title={event.id}/>
                                        <Row title={event.opened_at}/>
                                        <Row title={event.end_at}/>
                                        <Row title={<Update/>}/>
                                        <Row title={<Delete/>}/>
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