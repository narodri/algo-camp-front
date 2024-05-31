// 'use client'

// import { useState, useEffect} from "react"
// import { useRouter } from 'next/navigation'  // Usage: App router
// import Row from "@/components/Table/Row";
// import Label from "@/components/Table/Label";
// import Delete_user from "@/components/Buttons/Delete/Delete_user";
// import Header2 from "@/components/Headers/Header2";
// import { timeStamp } from "console";

// // import jwtDecode from 'jwt-decode'
// // import { jwtDecode } from "jwt-decode";
// // import exp from "constants";
// // import { stringify } from "querystring";

// export default function Page(props:any) {
//     const router = useRouter()
//     const [users, setUsers] = useState<any[]>([]);
//     const [token, setToken] = useState<any>("empty");
//     const [c_id, setCid] = useState<any>(null);
//     const [c_role, setCrole] = useState<any>(null);
//     const [expire, setExpire] = useState<any>("");
//     const [temp, setTemp] = useState<any>("");
//     const [temp1, setTemp1] = useState<any>(1);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem("jwt");
//                 const c_id = localStorage.getItem("id");
//                 const c_role = localStorage.getItem("role");
//                 // const expire = localStorage.getItem("expire")

//                 if (!token) {
//                     alert("You have to login first.");
//                     router.push(`/`);
//                     return;
//                 }
//                 const response_for_check = await fetch(`http://localhost:8000/user_expired/${c_id}`);
//                 const check = await response_for_check.json();
//                 setTemp(check.access_expired);


//                 // if (expire  <  now) {
//                 //     alert("Your token is expired! Please login again.");
//                 //     router.push(`/`);
//                 //     return;
//                 // }

//                 const usersResponse = await fetch("http://localhost:8000/users/");
//                 const usersData = await usersResponse.json();
//                 setUsers(usersData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return(
//     <div className="mt-10 space-x-16">
//         <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-0">
//             <p>token : {token}, id : {c_id}, role : {c_role}, expire : {temp1}, now : {Date.now()} , temp :</p>
//             <Header2 title={"ユーザー一覧"} path={"/admin/users/create"}/>
//             <div className="py-8">
//                 <div className="px-4 py-4 mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
//                     <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
//                     {users.length === 0
//                             ? (<p className="text-center text-m mt-4 mb-4">有効なユーザーが存在しません 😯</p>)
//                             : (
//                         <table className="min-w-full leading-normal text-center">
//                             <thead>
//                                 <tr>
//                                     <Label title={""}/>
//                                     <Label title={"ログインID"}/>
//                                     <Label title={"登録日"}/>
//                                     <Label title={"種別"}/>
//                                     <Label title={""}/>
//                                     <Label title={""}/>
//                                 </tr>
//                             </thead>{
//                             users.map((user:any)=>{
//                                 console.log(user)
//                                 return (
//                                     <tbody>
//                                         <tr>
//                                             <Row title={user.id}/>
//                                             <Row title={user.name}/>
//                                             <Row title={user.created_at_str}/>
//                                             {
//                                             user.role === 1
//                                             ? <Row title={"admin"}/>
//                                             : <Row title={"student"}/>
//                                             }
//                                             {/* <Row title={<Update/>}/> */}
//                                             <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
//                                                 <p className="text-gray-900 whitespace-no-wrap">
//                                                 <button
//                                                     type="submit"
//                                                     onClick={()=>router.push(`/admin/users/update/${user.id}`)}
//                                                     className="px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
//                                                     編集
//                                                 </button>
//                                                 </p>
//                                             </td>
//                                             <Row title={<Delete_user id={user.id}/>}/>
//                                         </tr>
//                                     </tbody>
//                                 )}
//                             )
//                             }
//                         </table>)}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     )
// }

'use client'

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'  // Usage: App router
import Row from "@/components/Table/Row";
import Label from "@/components/Table/Label";
import Delete_user from "@/components/Buttons/Delete/Delete_user";
import Header2 from "@/components/Headers/Header2";

export default function Page(props: any) {
    const router = useRouter()
    const [users, setUsers] = useState<any[]>([]);
    const [token, setToken] = useState<any>("empty");
    const [c_id, setCid] = useState<any>(null);
    const [c_role, setCrole] = useState<any>(null);
    const [expire, setExpire] = useState<any>("");
    const [temp, setTemp] = useState<any>("");
    const [temp1, setTemp1] = useState<any>(1);

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

                const usersResponse = await fetch("http://localhost:8000/users/");
                const usersData = await usersResponse.json();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mt-10 space-x-16">
            <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-0">
                <Header2 title={"ユーザー一覧"} path={"/admin/users/create"} />
                <div className="py-8">
                    <div className="px-4 py-4 mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                            {users.length === 0
                                ? (<p className="text-center text-m mt-4 mb-4">有効なユーザーが存在しません 😯</p>)
                                : (
                                    <table className="min-w-full leading-normal text-center">
                                        <thead>
                                            <tr>
                                                <Label title={""} />
                                                <Label title={"ログインID"} />
                                                <Label title={"登録日"} />
                                                <Label title={"種別"} />
                                                <Label title={""} />
                                                <Label title={""} />
                                            </tr>
                                        </thead>
                                        {users.map((user: any) => {
                                            return (
                                                <tbody key={user.id}>
                                                    <tr>
                                                        <Row title={user.id} />
                                                        <Row title={user.name} />
                                                        <Row title={user.created_at_str} />
                                                        {
                                                            user.role === 1
                                                                ? <Row title={"admin"} />
                                                                : <Row title={"student"} />
                                                        }
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                <button
                                                                    type="submit"
                                                                    onClick={() => router.push(`/admin/users/update/${user.id}`)}
                                                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
                                                                    編集
                                                                </button>
                                                            </p>
                                                        </td>
                                                        <Row title={<Delete_user id={user.id} />} />
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </table>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
