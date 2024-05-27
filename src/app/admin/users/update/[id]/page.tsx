'use client' // CSRの設定

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cancel from "@/components/Buttons/Cancel";
import Select from "@/components/Forms/Select/Select_role";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";

export default function Page(props:any) {
  const router = useRouter()
  const [user, setUser] = useState<any>({});
  useEffect(() => {
      const fetchData = async () => {
          try {
              const userResponse = await fetch(`http://localhost:8000/users/${props.params.id}`);
              const userData = await userResponse.json();
              setUser(userData);
              console.log(user)
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const login_id = e.target.login_id.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
    const is_active = true;
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, login_id, password, role, is_active})
    };
    try {
      const response = await fetch(`http://localhost:8000/users/udpate/${props.params.id}`, option);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("Server response:", response);
      
      const result = await response.json();
      console.log(result);
      router.push('/admin/users');
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

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

        <form
                onSubmit={handleSubmit}
                action="#" className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <div>
            <label htmlFor="text" className="sr-only">question</label>
            <Input title={"名前"} name={"name"} message={"User Name"} value={user.name}/>
            <Input title={"ログインID"} name={"login_id"} message={"Loing ID"} value={user.login_id}/>
            <Input title={"パスワード"} name={"password"} message={"User Password"} value={user.password}/>
            <Input title={"パスワード（確認）"} message={"User Password Confirmation"} value={user.password}/>
            <Select title={"種別"} name={"role"} value={user.role} default={user.role}/>
          </div>
          <div className="flex justify-evenly">
            <Cancel title={"キャンセル"} path={"/admin/users"}/>
            <Submit/>
          </div>
        </form>
      </div>
      )
  }