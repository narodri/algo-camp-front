'use client' // CSRの設定
import React from "react";
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Logout from "@/components/Buttons/Logout";
import Wide from "@/components/Forms/Wide";
import Submit from "@/components/Buttons/Submit";
import Print from "@/components/Forms/Print"

export default function Page(props:Params) {
    const router = useRouter()
    const [question, setQuestion] = useState<any>({});
    const PL = require(`/public/runner.json`).apis[0].operations[0].parameters[1].allowableValues.values
    useEffect(() => {
        const fetchData = async () => {
            try {
                const questionResponse = await fetch("http://localhost:8000/questions/"+props.params.problem_id);

                const questionData = await questionResponse.json();

                setQuestion(questionData);
                console.log(question)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return(
        <div className="mx-auto mt-0 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
                <h2 className="mt-12 mr-5 text-right">
                    <Logout/>
                </h2>
                <h1 className="font-bold text-5xl mt-3 ml-3">
                    問題実施
                </h1>
            </div>

        <form action="#" className="mx-auto mt-8 max-w-3xl space-y-4">
            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                使用言語
            </label>
            <select
                className="block rounded-md border-0 w-1/3 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="">Select Language</option>
                {
                    PL.map((Language:any, i:any)=>{
                        return(<option value={i}>{Language}</option>)
                    })
                }
            </select>
            <Print title={"問題"} message={question.problem} />
            <Print title={"制約"} message={
                    question.condition
                    ? question.condition
                    : "制約無し"
                } />
            <Print title={"入力"} sub_title={"下記のような標準入力から入力する。"} message={question.in_format}/>
            <Print title={"出力"} message={question.out_format}/>
            <Print title={"入力例 1"} message={question.in_sample_1}/>
            <Print title={"出力例 1"} message={question.out_sample_1}/>
            <Print title={"入力例 2"} message={question.in_sample_2}/>
            <Print title={"出力例 2"} message={question.out_sample_2}/>
            <Wide title={"ソースコード"} message={""}/>
            <div className="flex justify-evenly">
                <button
                    type="button" onClick={()=>router.back()}
                    className="px-6 py-2 rounded-full focus:outline-none transition ease-in duration-200 hover:bg-gray-800 hover:text-white border-2 border-gray-900 ">
                    キャンセル
                </button>
                <Submit/>
            </div>
            </form>
        </div>
        )
  }