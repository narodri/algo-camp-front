'use client' // CSRの設定

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cancel from "@/components/Buttons/Cancel";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";
import Input_disable from "@/components/Forms/Input_disable";
import Select_role_disable from "@/components/Forms/Select/Select_role_disable";

export default function Page(props: any) {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [url,setUrl] = useState(`http://localhost:8000/users/update2/${props.params.id}`);
  const pattern = "(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{10,}";

  useEffect(() => {
    if (password && password2 && password !== password2) {
      setErrorMessage("パスワードが一致していません。");
    } else if (password && password2 && password === password2 && !new RegExp(pattern).test(password)) {
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
      setErrorMessage("パスワードは10文字以上、且つ英字、数字、記号を最低1つずつ組み合わせたものにしてください。");
    } else if (password && password2 && password === password2) {
      setErrorMessage("😊 ✅");
    } else {
      setErrorMessage("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`http://localhost:8000/users/${props.params.id}`);
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [props.params.id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const login_id = e.target.login_id.value;
    const role = e.target.role.value;
    const is_active = true;
    const updateData: any = { name, login_id, role, is_active };

    if (password) {
      updateData.password = password;
      setUrl(`http://localhost:8000/users/update/${props.params.id}`)
    }

    console.log("Update Data:", updateData); // 요청 전에 데이터 확인

    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    };

    try {
      // const response = await fetch(`http://localhost:8000/users/update/${props.params.id}`, option);
      const response = await fetch(url, option);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
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
          ユーザーの編集
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        action="#" className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
        <div>
          <label htmlFor="text" className="sr-only">question</label>
          <Input title={"名前"} name={"name"} message={"User Name"} value={user.name} />
          <Input_disable title={"ログインID"} name={"login_id"} message={"Loing ID"} value={user.login_id} />
          <Input title={"パスワード"} type={"password"} name={"password"} message={"User Password"}
            onChange={(e: any) => (setPassword(e.target.value))} onBlur={handlePasswordBlur} />
          <Input title={"パスワード（確認）"} type={"password"} message={"User Password Confirmation"}
            onChange={(e: any) => setPassword2(e.target.value)} onBlur={handlePasswordBlur} />
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          <Select_role_disable title={"種別"} name={"role"} value={user.role} default={user.role} />
        </div>
        <div className="flex justify-evenly">
          <Cancel title={"キャンセル"} path={"/admin/users"} />
          <Submit />
        </div>
      </form>
    </div>
  )
}



