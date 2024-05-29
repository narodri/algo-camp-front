'use client' // CSRの設定

import Cancel from "@/components/Buttons/Cancel";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Select_role from "@/components/Forms/Select/Select_role";

export default function Page(props: any) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const pattern = "(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{10,}";
  const pattern2 = /^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{10,}$/

  useEffect(() => {
    if (password && password2 && password !== password2) {
      setErrorMessage("パスワードが一致していません。");
    } else if (password && password2 && password === password2 && !new RegExp(pattern).test(password)) {
    // } else if (password && password2 && password === password2 && !pattern2.test(password)) {
      setErrorMessage("パスワードは10文字以上、且つ英字、数字、記号を最低1つずつ組み合わせたものにしてください。");
    } else if (password && password2 && password === password2) {
      setErrorMessage("😊 ✅");
    } else {
      setErrorMessage("");
    }
  }, [password, password2]);

  const handlePasswordBlur = () => {
    if (password && password2 && password !== password2) {
      setErrorMessage("パスワードが一致していません。");
    } else if (password && password2 && password === password2 && !new RegExp(pattern).test(password)) {
    // } else if (password && password2 && password === password2 && !pattern2.test(password)) {
      setErrorMessage("パスワードは10文字以上、且つ英字、数字、記号を最低1つずつ組み合わせたものにしてください。");
    } else if (password && password2 && password === password2) {
      setErrorMessage("😊 ✅");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const login_id = e.target.login_id.value;
    const role = e.target.role.value;
    const is_active = true;
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, login_id, password, role, is_active })
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

  return (
    <div className="mx-auto mt-0 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
        <h2 className="mt-12 mr-5 text-right">
          <Logout />
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
          <Input title={"名前"} name={"name"} message={"User Name"} required={true} />
          <Input title={"ログインID"} name={"login_id"} message={"Login ID"} required={true} />
          <Input title={"パスワード"} name={"password"} message={"User Password"} value={password}
            required={true} pattern={pattern}
            onChange={(e:any) => (setPassword(e.target.value))}
            onBlur={handlePasswordBlur}
          />
          <Input
            title={"パスワード（確認）"} name={"password2"} message={"User Password Confirmation"} value={password2}
            required={true} pattern={pattern}
            onChange={(e:any) => setPassword2(e.target.value)}
            onBlur={handlePasswordBlur}
          />
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          <Select_role title={"種別"} name={"role"} />
        </div>
        <div className="flex justify-evenly">
          <Cancel title={"キャンセル"} path={"/admin/users"} />
          <Submit />
        </div>
      </form>
    </div>
  )
}
