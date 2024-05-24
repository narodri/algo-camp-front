'use client' // CSRの設定

import { useState, useEffect} from "react"
import { useRouter } from 'next/navigation'  // Usage: App router
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import Row from "@/components/Table/Row";
import Label from "@/components/Table/Label";
import Update from "@/components/Buttons/Update";
import Delete from "@/components/Buttons/Delete";
import Header2 from "@/components/Headers/Header2";
import {GET} from "@/app/api/users/route"

export default async function Page() {
    // const [users, setUsers] = useState([]);
    const router=useRouter()
    const response = await fetch("http://localhost:8000/users/")
    const data = await response.json();
    const users1 = [JSON.stringify(data)];
    const users = JSON.parse(users1[0]);
    console.log(users)
    let num_of_users = (users.length);

    return(
    <div className="mt-10 space-x-16">
        <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-0">
            <Header2 title={"ユーザー一覧"} path={"/admin/users/create"}/>
            <div className="py-8">
                <div className="px-4 py-4 mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="min-w-full leading-normal text-center">
                            <thead>
                                <tr>
                                    <Label title={""}/>
                                    <Label title={"ログインID"}/>
                                    <Label title={"登録日"}/>
                                    <Label title={"種別"}/>
                                    <Label title={""}/>
                                    <Label title={""}/>
                                </tr>
                            </thead>{
                            users.map((user:any)=>{
                                console.log(user)
                                return (
                                    <tbody>
                                        <tr>
                                            <Row title={user.id}/>
                                            <Row title={user.name}/>
                                            <Row title={user.created_at}/>
                                            {
                                            user.role === 1
                                            ? <Row title={"admin"}/>
                                            : <Row title={"student"}/>
                                            }
                                            {/* <Row title={<Update/>}/> */}
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                <button
                                                    type="submit"
                                                    onClick={()=>router.push("/admin/users/update/"+user.id)}
                                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
                                                    編集
                                                </button>
                                                </p>
                                            </td>
                                            <Row title={<Delete/>}/>
                                        </tr>
                                    </tbody>
                                )}
                            )
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}