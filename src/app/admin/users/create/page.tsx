'use client' // CSRの設定

import { useState } from "react"
import Cancel from "@/components/Buttons/Cancel";
import Select from "@/components/Forms/Select/Select_role";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";
import {POST} from "@/app/api/users/route"
import { useRouter } from "next/navigation";

export default function Page(props:any) {
    // 입력 필드의 상태를 관리하기 위한 상태 변수들
    const router = useRouter();
    // const [id, setId] = useState('');
    // const [name, setName] = useState('');
    // const [role, setRole] = useState('');
    // const [password, setPassword] = useState('');

    // 폼 제출 핸들러
    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault(); // 폼의 기본 동작 방지

    //     // 새로운 사용자 정보
    //     const newUser = {
    //         id,
    //         name,
    //         role,
    //         created_at: new Date().toISOString()
    //     };
    //     const response = await fetch('/api/users', {
    //       method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(newUser)
    //     });
    //     if(response.ok){
    //       router.push('/admin/users')
    //       console.log("success")
    //     }
    //     else{
    //       console.log("failed")
    //     }
    // };
    return(
      // <div className="mx-auto mt-0 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      //   <div className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
      //     <h2 className="mt-12 mr-5 text-right">
      //       <Logout/>
      //     </h2>
      //     <h1 className="font-bold text-5xl mt-3 ml-3">
      //       ユーザーの新規作成
      //     </h1>
      //   </div>

      //   <form onSubmit={(e)=>{
      //     e.preventDefault();
      //     const id = e.target.id.value
      //     console.log(id);
      //     const name = e.target.name.value
      //     const password = e.target.password.value
      //     const role = e.target.role.value
      //     const created_at = new Date().toISOString()
      //     const logined_at = new Date().toISOString()
      //     const option = {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify({id, name, role, created_at, logined_at})
      //     }
      //     fetch('http://localhost:8000/users', option).then(res=>res.json())
      //     .then(
      //       result=>{
      //         console.log(result);
      //         const lastid = result.id;
      //         router.push('/admin/users')
      //       }
      //     )

      //   }} className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
      //     <div>
      //       {/* <label htmlFor="text" className="sr-only">question</label> */}
      //       <input type="text" name="name" //onChange={(e) => setName(e.target.value)}
      //         placeholder="Enter user name" required/>
      //         <input type="text" name="id" //onChange={(e) => setId(e.target.value)}
      //         placeholder="Enter user id" required/>
      //         <input type="text" name="password" //onChange={(e) => setPassword(e.target.value)}
      //         placeholder="Enter user pw" required/>
      //         <input type="text" name="role" //onChange={(e) => setRole(e.target.value)}
      //         placeholder="Enter user role" required/>

      //       {/* <Input title={"名前"} message={"User Name"} name={name}/>
      //       <Input title={"ログインID"} message={"Loing ID"} name={id}/>
      //       <Input title={"パスワード"} message={"User Password"} name={password}/>
      //       <Input title={"パスワード（確認）"} message={"User Password Confirmation"}/>
      //       <Select title={"種別"} name={role}/> */}
      //     </div>
      //     <div className="flex justify-evenly">
      //       <Cancel title={"キャンセル"}/>
      //       <Submit/>
      //     </div>
      //   </form>
      // </div>
      <div className="mx-auto mt-0 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <h2 className="mt-12 mr-5 text-right">
            <Logout/>
          </h2>
          <h1 className="font-bold text-5xl mt-3 ml-3">
            ユーザーの新規作成
          </h1>
        </div>

        <form onSubmit={(e:any)=>{
          e.preventDefault();
          const id = e.target.id.value
          console.log(id);
          const name = e.target.name.value
          const password = e.target.password.value
          const role = e.target.role.value
          const created_at = new Date().toISOString()
          const logined_at = new Date().toISOString()
          const option = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, name, password, role, created_at, logined_at})
          }
          fetch('http://localhost:8000/users', option).then(res=>res.json())
          .then(
            result=>{
              console.log(result);
              const lastid = result.id;
              router.push('/admin/users')
            }
          )
        }}
        className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <div>
            <label htmlFor="text" className="sr-only">question</label>
            <Input title={"名前"} name={"name"} message={"User Name"} />
            <Input title={"ログインID"} name={"id"} message={"Loing ID"} />
            <Input title={"パスワード"} name={"password"} message={"User Password"}/>
            <Input title={"パスワード（確認）"} message={"User Password Confirmation"}/>
            <Select title={"種別"} name={"role"} />
          </div>
          <div className="flex justify-evenly">
            <Cancel title={"キャンセル"} path={"/admin/users"}/>
            <Submit/>
          </div>
        </form>
      </div>
      )
  }