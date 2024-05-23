'use client' // CSRの設定

import { useState } from "react"
import Cancel from "@/components/Buttons/Cancel";
import Select from "@/components/Forms/Select";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";
import {POST} from "@/app/api/users/route"
import { useRouter } from "next/navigation";

export default function Page(props:any) {
    // 입력 필드의 상태를 관리하기 위한 상태 변수들
    const router = useRouter();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');

    // 폼 제출 핸들러
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // 폼의 기본 동작 방지

        // 새로운 사용자 정보
        const newUser = {
            id,
            name,
            role,
            password,
            created_at: new Date().toISOString()
        };
        const response = await fetch('/api/users', {
          method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
        });
        if(response.ok){
          router.push('/admin/users')
          console.log("success")
        }
        else{
          console.log("failed")
        }
    };
    return(
      <div className="mx-auto mt-0 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <h2 className="mt-12 mr-5 text-right">
            <Logout/>
          </h2>
          <h1 className="font-bold text-5xl mt-3 ml-3">
            ユーザーの新規作成
          </h1>
        </div>

        <form onSubmit={handleSubmit} method="POST" className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <div>
            <label htmlFor="text" className="sr-only">question</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Enter user name" required/>
              <input type="text" value={id} onChange={(e) => setId(e.target.value)}
              placeholder="Enter user id" required/>
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter user pw" required/>
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)}
              placeholder="Enter user role" required/>

            {/* <Input title={"名前"} message={"User Name"} name={name}/>
            <Input title={"ログインID"} message={"Loing ID"} name={id}/>
            <Input title={"パスワード"} message={"User Password"} name={password}/>
            <Input title={"パスワード（確認）"} message={"User Password Confirmation"}/>
            <Select title={"種別"} name={role}/> */}
          </div>
          <div className="flex justify-evenly">
            <Cancel title={"キャンセル"}/>
            <Submit/>
          </div>
        </form>
      </div>
      )
  }