'use client' // CSRの設定

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Header2 from "@/components/Headers/Header2";
import Row from "@/components/Table/Row";
import Label from "@/components/Table/Label";
import Delete_question from "@/components/Buttons/Delete/Delete_question";

export default function Page(props:Params) {
    const router = useRouter()
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwt");
                const c_id = localStorage.getItem("id");
                const c_role = localStorage.getItem("role");

                if (!token) {
                    alert("You have to login first.");
                    router.push(`/`);
                    return;
                }

                const response_for_check = await fetch(`http://localhost:8000/user_expired/${c_id}`);
                const check = await response_for_check.json();
                const expireTimestamp = new Date(check.access_expired).getTime() / 1000;
                const nowTimestamp = Date.now() / 1000;

                if (expireTimestamp < nowTimestamp) {
                    alert("Your token is expired! Please login again.");
                    router.push(`/`);
                    return;
                }
                const questionsResponse = await fetch("http://localhost:8000/questions/we/");

                const questionsData = await questionsResponse.json();

                setQuestions(questionsData);
                console.log(questions)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return(
    <div className="mt-10 space-x-16">
        <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-0">
            <Header2 title={"問題一覧"} path={"/admin/questions/create"}/>
            <div className="py-8">
                <div className="px-4 py-4 mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        {questions.length === 0
                            ? (<p className="text-center text-m mt-4 mb-4">有効な問題が存在しません 😯</p>)
                            : (
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
                                            {/* <Row title={
                                                question.event.map((even:any, i:any)=>{
                                                    if(i===0) {return(even.title)}
                                                    else      {return(" , "+even.title)}
                                                })
                                            }/> */}
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
                                            <Row title={<Delete_question id={question.id}/>}/>
                                        </tr>
                                    </tbody>
                                )})}
                        </table>)}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }