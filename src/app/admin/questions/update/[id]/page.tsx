// 'use client' // CSRの設定

// import { useState } from "react"
import Cancel from "@/components/Buttons/Cancel";
import Wide from "@/components/Forms/Wide";
import Select_event from "@/components/Forms/Select/Select_event";
import Select_level from "@/components/Forms/Select/Select_level";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";

export default async function Page(props:any) {
    const response = await fetch("http://localhost:8000/questions/we/"+props.params.id)
    const url = response.url
    const data = await response.json();
    console.log(props.params.id);
    console.log(url);

    const req = await fetch(url);
    const result = await req.json();
    console.log(result);
    return(
      <div className="mx-auto mt-0 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <h2 className="mt-12 mr-5 text-right">
            <Logout/>
          </h2>
          <h1 className="font-bold text-5xl mt-3 ml-3">
            問題の編集
          </h1>
        </div>

        <form action="#" className="mx-auto mt-8 max-w-3xl space-y-4">
          <div>
            <label htmlFor="text" className="sr-only">question</label>
            <Select_event title={"対応イベント名"} value={result.event.title} default={result.event.title}/>
            <Input title={"問題名"} message={"Question Title"} value={result.title}/>
            <Select_level title={"難易度"} message={"A ~ D"} value={result.level}/>
            <Input title={"制限時間"} message={"Time Limit (sec)"} value={result.limit_millisec}/>
            <Wide title={"問題内容"} message={""} value={result.problem}/>
            <Input title={"制約"} message={"Constraints"} value={result.condition}/>
            <Input title={"入力フォーマット"} message={"Input Format"} value={result.in_format}/>
            <Input title={"出力フォーマット"} message={"Outpur Format"} value={result.out_format}/>
          </div>
          <div className="flex justify-evenly">
            <Cancel title={"キャンセル"} path={"/admin/questions/"}/>
            <Submit/>
          </div>
        </form>
      </div>
      )
  }