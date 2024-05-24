'use client' // CSRの設定

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Header2 from "@/components/Headers/Header2";
import Row from "@/components/Table/Row";
import Label from "@/components/Table/Label";
import Delete from "@/components/Buttons/Delete";

export default async function Page(props:Params) {
    const router=useRouter()
    const response1 = await fetch("http://localhost:8000/questions/we/")
    const data = await response1.json();
    const questions1 = [JSON.stringify(data)];
    const questions = JSON.parse(questions1[0]);
    console.log(questions)
    let num_of_users = (questions.length);

    return(
    <div className="mt-10 space-x-16">
        <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-0">
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
                            questions.map((question:any)=>{
                                return (
                                    <tbody>
                                        <tr>
                                            <Row title={question.id}/>
                                            <Row title={question.title}/>
                                            <Row title={question.event.title}/>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                <button
                                                    type="submit"
                                                    onClick={()=>router.push("/admin/questions/update/"+question.id)}
                                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
                                                    編集
                                                </button>
                                                </p>
                                            </td>
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