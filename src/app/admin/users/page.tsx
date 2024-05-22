'use client' // CSRの設定

import { useState, useEffect } from "react"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import Logout from "@/components/Buttons/Logout";
import Solve from "@/components/Buttons/Solve";
import Label from "@/components/Table/Label";
import Update from "@/components/Buttons/Update";
import Delete from "@/components/Buttons/Delete";
import {GET} from '@/app/api/users/route.tsx'

export default function Page(props:Params) {
    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GET();
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchData();
    }, []);
    let num_of_users = (users.length);

    return(
    <div className="mt-10 space-x-16">
        <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-8">
            <div>
                <h2 className="mt-12 mr-10 text-right">
                    <Logout/>
                </h2>
                <h1 className="font-bold text-5xl mt-3 ml-3">
                  ユーザー一覧
                </h1>
            </div>

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
                            users.map(user=>{
                                return (
                                    <tbody>
                                        <tr>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {user.title}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {user.id}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {user.created_at}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {user.role}
                                                </p>
                                            </td>
                                            <td className="px-2 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                <Update/>
                                                </p>
                                            </td>
                                            <td className="px-2 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                <Delete/>
                                                </p>
                                            </td>
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
  
  // 'use client' // CSRの設定

// import { useState } from "react"
