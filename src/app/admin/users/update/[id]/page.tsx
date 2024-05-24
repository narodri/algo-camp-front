'use client' // CSRの設定

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cancel from "@/components/Buttons/Cancel";
import Select from "@/components/Forms/Select/Select_role";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";

export default async function Page(props:any) {
    const response = await fetch("http://localhost:8000/users/"+props.params.id)
    const url = response.url
    const data = await response.json();
    console.log(props.params.id);
    console.log(url);

    const req = await fetch(url);
    const result = await req.json();
    console.log(result);

  //   const [id, setId] = useState('')
  //   const [name, setName] = useState('')
  //   const [password, setPassword] = useState('')
  //   const [created_at, setCreated_at] = useState('')
  //   const [logined_at, setLogined_at] = useState('')

  //   const router = useRouter();
  //   useEffect(()=>{
  //     fetch("url").then(resp=>resp.json).then(result=>{
  //       console.log(result)
  //       setId(result.id)
  //       setName(result.name)
  //       setPassword(result.password)
  //       setCreated_at(result.created_at)
  //       setLogined_at(result.logined_at)
  //     })
  //   }
  // )


    return(
      <div className="mx-auto mt-0 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <h2 className="mt-12 mr-5 text-right">
            <Logout/>
          </h2>
          <h1 className="font-bold text-5xl mt-3 ml-3">
            ユーザーの編集
          </h1>
        </div>

        <form action="#" className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <div>
            <label htmlFor="text" className="sr-only">question</label>
            <Input title={"名前"} message={"User Name"} value={result.name}/>
            <Input title={"ログインID"} message={"Loing ID"} value={result.id}/>
            <Input title={"パスワード"} message={"User Password"} value={result.password}/>
            <Input title={"パスワード（確認）"} message={"User Password Confirmation"} value={result.password}/>
            <Select title={"種別"} value={result.role} default={result.role}/>
          </div>
          <div className="flex justify-evenly">
            <Cancel title={"キャンセル"} path={"/admin/users"}/>
            <Submit/>
          </div>
        </form>
      </div>
      )
  }