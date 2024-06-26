'use client'

import Cancel from "@/components/Buttons/Cancel";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Select_role from "@/components/Forms/Select/Select_role";

export default function Page(props: any) {
  const router = useRouter();
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [status, setStatus] = useState<any>("");
  const pattern = "(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{10,}";

  useEffect(() => {
    if (password && !new RegExp(pattern).test(password)){
      setErrorMessage1("パスワードは10文字以上、且つ英字、数字、記号を最低1つずつ組み合わせたものにしてください。");
    }
    else {
      setErrorMessage1("");
    }
    if (password && password2 && password !== password2) {
      setErrorMessage2("パスワードが一致していません。");
    }
    else if (password && password2 && password === password2) {
      setErrorMessage2("😊 ✅");
    }
    else {
      setErrorMessage2("");
    }
  }, [password, password2]);

  const handlePasswordBlur = () => {
    if (password && !new RegExp(pattern).test(password)){
      setErrorMessage1("パスワードは10文字以上、且つ英字、数字、記号を最低1つずつ組み合わせたものにしてください。");
    }
    else {
      setErrorMessage1("");
    }
    if (password && password2 && password !== password2) {
      setErrorMessage2("パスワードが一致していません。");
    }
    else if (password && password2 && password === password2) {
      setErrorMessage2("😊 ✅");
    }
    else {
      setErrorMessage2("");
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
      const response = await fetch('http://localhost:8000/users/create', option);
      setStatus(response.status);
      // const result = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      router.push('/admin/users');
    } catch (error: any) {
      alert(`HTTP ${status}, ${error.message}`);
      console.error('☹️エラー！');
      router.push(`/admin/users/`)
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
            required={true} pattern={pattern} type={"password"}
            onChange={(e: any) => (setPassword(e.target.value))}
            onBlur={handlePasswordBlur}
          />
          {errorMessage1 && <div className="text-red-600">{errorMessage1}</div>}
          <Input
            title={"パスワード（確認）"} name={"password2"} message={"User Password Confirmation"} value={password2}
            required={true} pattern={pattern} type={"password"}
            onChange={(e: any) => (setPassword2(e.target.value))}
            onBlur={handlePasswordBlur}
          />
          {errorMessage2 && <div className="text-red-600">{errorMessage2}</div>}
          <Select_role title={"種別"} name={"role"} />
        </div>
        <div className="flex justify-evenly">
          <Cancel title={"キャンセル"} path={"/admin/users"} />
          <Submit />
        </div>
      </form>
    </div>
  );
}



