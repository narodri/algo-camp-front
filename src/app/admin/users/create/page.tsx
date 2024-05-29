'use client' // CSRの設定

import Cancel from "@/components/Buttons/Cancel";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select_role from "@/components/Forms/Select/Select_role";


export default async function Page(props:any) {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    const pwCheck = async (ee: any) => {
      ee.preventDefault();
      const pw1 = ee.target.password.value;
      const pw2 = ee.target.password2.value;
      try{
        if(pw1==pw2){
          setErrorMessage("yes")
        }
        else{
          setErrorMessage("no")
        }
      }
      catch(error) {
        console.error('There was an 에러!', error);
      }
    };

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const name = e.target.name.value;
      const login_id = e.target.login_id.value;
      const password = e.target.password.value;
      const role = e.target.role.value;
      const is_active = true;

      // const pw1 = e.target.password.value;
      // const pw2 = e.target.password2.value;

      // const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
      // if (!passwordPattern.test(password)) {
      //   setErrorMessage("パスワードは英字、数字、記号を含む10文字以上である必要があります。");
      //   return;
      // }
      setErrorMessage('23');


      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, login_id, password, role, is_active})
      };
      try {
        const response = await fetch('http://localhost:8000/users/create', option);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
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
            ユーザーの新規作成
          </h1>
        </div>

        <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <div>
            <label htmlFor="text" className="sr-only">question</label>
            <Input title={"名前"} name={"name"} message={ "User Name"} required={true}/>
            <Input title={"ログインID"} name={"login_id"} message={"Login ID"} required={true}/>
            <Input title={"パスワード"} name={"password"} message={"User Password"} sub_title={"パスワードは英字、数字、記号を含む10文字以上である必要があります。"} required={true} pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}"/>
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
            <Input title={"パスワード（確認）"} name={"password2"} message={"User Password Confirmation"} required={true}/>
            <Select_role title={"種別"} name={"role"} />
          </div>
          <div className="flex justify-evenly">
            <Cancel title={"キャンセル"} path={"/admin/users"}/>
            <Submit />
          </div>
        </form>
      </div>
      )
  }