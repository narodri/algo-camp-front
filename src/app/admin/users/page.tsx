'use client' // CSRの設定

import { useState, useEffect } from "react"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import Row from "@/components/Table/Row";
import Label from "@/components/Table/Label";
import Update from "@/components/Buttons/Update";
import Delete from "@/components/Buttons/Delete";
import Header2 from "@/components/Headers/Header2";
import {GET} from "@/app/api/users/route"

export default async function Page() {
    // const [users, setUsers] = useState<any[]>([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await GET();
    //             // const json = await response.json();
    //             // const users1 = [JSON.stringify(json)];
    //             // const users = JSON.parse(users1[0]);
    //             console.log(response)
    //             setUsers(users);
    //         } catch (error) {
    //             console.error('Error fetching users:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);


        // const [users, setUsers] = useState<any[]>([]);
        // useEffect(() => {
        //     const fetchData = async () => {
        //         try {
        //             const response = await fetch("http://localhost:8000/users/");
        //             const json = await response.json();
        //             const users1 = [JSON.stringify(json)];
        //             const users = JSON.parse(users1[0]);
        //             console.log(users)
        //             setUsers(users);
        //         } catch (error) {
        //             console.error('Error fetching users:', error);
        //         }
        //     };
        //     fetchData();
        // }, []);

    const response = await fetch("http://localhost:8000/users/");
    const json = await response.json();
    const users1 = [JSON.stringify(json)];
    const users = JSON.parse(users1[0]);


    let num_of_users = (users.length);
    console.log(users)
    return(
    <div className="mt-10 space-x-16">
        <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-8">
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
                                            <Row title={user.role}/>
                                            {/* <Row title={JSON.parse(user).id}/>
                                            <Row title={JSON.parse(user).created_at}/>
                                            <Row title={JSON.parse(user).role}/>*/}
                                            <Row title={<Update/>}/>
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