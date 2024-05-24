// 'use client' // CSRの設定

// import { useState } from "react"
import Cancel from "@/components/Buttons/Cancel";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";

export default async function Page(props:any) {
    const response = await fetch("http://localhost:8000/events/"+props.params.id)
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
            イベントの編集
          </h1>
        </div>

        <form action="#" className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <div>
            <label htmlFor="text" className="sr-only" >Event</label>
            <Input title={"イベント名"} message={"Event Name"} value={result.title} default={result.title}/>
            <Input title={"開始"} message={"Start at"} value={result.created_at} default={result.created_at}/>
            <Input title={"終了"} message={"End at"} value={result.opened_at} default={result.opened_at}/>
          </div>
          <div className="flex justify-evenly">
            <Cancel title={"キャンセル"} path={"/admin/events"}/>
            <Submit/>
          </div>
        </form>
      </div>
      )
  }