'use client' // CSRの設定

import { useState, useEffect } from "react"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import Header2 from "@/components/Headers/Header2";
import Row from "@/components/Table/Row";
import Label from "@/components/Table/Label";
import Update from "@/components/Buttons/Update";
import Delete from "@/components/Buttons/Delete";
import {GET} from '@/app/api/questions/route';

export default function Page(props:Params) {
    const [questions, setQuestions] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GET();
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchData();
    }, []);
    let num_of_questions = (questions.length);

    return(
    <div className="mt-10 space-x-16">
        <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-8">
            <Header2 title={"問題一覧"} path={"/admin/questions/create"}/>
            <div className="py-8">
                <div className="px-4 py-4 mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="min-w-full leading-normal text-center">
                            <thead>
                                <tr>
                                    <Label title={"問題ID"}/>
                                    <Label title={"問題名"}/>
                                    <Label title={"対応イベント名"}/>
                                    <Label title={""}/>
                                    <Label title={""}/>
                                </tr>
                            </thead>{
                            questions.map(question=>{
                                return (
                                    <tbody>
                                        <tr>
                                            <Row title={question.id}/>
                                            <Row title={question.title}/>
                                            <Row title={question.event_name}/>
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