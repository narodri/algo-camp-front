// 'use client' // CSRの設定

import { useState, useEffect } from "react"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Row from "@/components/Table/Row";
import Logout from "@/components/Buttons/Logout";
import Solve from "@/components/Buttons/Solve";
import Label from "@/components/Table/Label";
import {GET} from "@/app/api/questions/route"

export default async function Page(props:Params) {
    // const [questions, setQuestions] = useState<any[]>([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await GET();
    //             const data = await response.json();
    //             setQuestions(data);
    //         } catch (error) {
    //             console.error('Error fetching questions:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);
    // let num_of_questions = (questions.length);
    const response = await fetch("http://localhost:8000/events/wq/"+props.params.event_id)
    const url = response.url
    const data = await response.json();
    const req = await fetch(url);
    const result = await req.json();
    console.log(result)
    return(
    <div className="mt-10 space-x-16">
        <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-8">
            <div>
                <h2 className="mt-12 mr-10 text-right">
                    <Logout/>
                </h2>
                <h1 className="font-bold text-5xl mt-3 ml-3">
                  問題一覧
                </h1>
                <h3 className="text-xl mt-14 ml-3">
                  参加しているイベント : {result.title}
                </h3>
            </div>

            <div className="py-8">
                <div className="px-4 py-4 mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="min-w-full leading-normal text-center">
                            <thead>
                                <tr>
                                    <Label title="難易度"/>
                                    <Label title="問題名"/>
                                    <Label title="実行制限時間"/>
                                    <Label title="メモリ制限"/>
                                    <Label title=""/>
                                </tr>
                            </thead>
                                <tbody>
                                    <tr>
                                        <Row title={result.question[0].title}/>
                                        <Row title={result.question[0].problem}/>
                                        <Row title={result.question[0].in_format}/>
                                        <Row title={result.question[0].out_format}/>
                                        <td className="px-2 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                            <Solve/>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }