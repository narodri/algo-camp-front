'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";
import Header1 from "@/components/Headers/Header1";
import Link from "next/link";

export default function Page() {
  const [count, setCount] = useState(0);
  // const [id, setId] = useState('');
  const [login_id, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // const handleLogin = async (e:any) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:8000/login', {
  //       id: parseInt(id),
  //       password
  //     });
  //     const role = response.data.role;
  //     if (role === 1) {
  //       router.push('/admin/');
  //     } else if (role === 0) {
  //       router.push(`/events/${id}`);
  //     }
  //   } catch (error) {
  //     alert('ログインに失敗しました。');
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login_id, password }),
    });

    const data = await res.json();
    console.log(data)

    if (res.status === 200) {
      setMessage('Login successful');
      localStorage.setItem('jwt', data.access_token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('id', data.id);
      if(data.role===1){
        router.push(`/admin/`);
      }
      else if(data.role===1){
        router.push(`/events/${data.id}`);
      }
      else{
        location.reload();
        setMessage('Login failed');
      }
    } else {
      setMessage("error");
    }
  };

    return (
      <main>
        <Header1 title={"Fignny Camp!"}/>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" />
          <form
          // onSubmit={handleLogin}
          onSubmit={handleSubmit}
          className="space-y-6" >
            <div className="flex flex-col items-center mt-2 relative ">
                <label htmlFor="input1" className="text-sm grid font-medium leading-6 text-gray-900">
                    ID
                </label>
                {/* <input
                    type="text" required maxLength={32} value={id}
                    id="name-with-label"
                    onChange={(e) => setId(e.target.value)}
                    className="block rounded-md border-0 w-80 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Your ID" /> */}
                  <input
                    name="input1" id="input1"
                    className="block rounded-md border-0 w-80 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text" value={login_id} onChange={(e) => setLoginId(e.target.value)} />
            </div>

            <div className="flex flex-col items-center mt-2 relative ">
                <label htmlFor="input2" className="text-sm grid font-medium leading-6 text-gray-900">
                    Password
                </label>
                {/* <input
                    type="password" required maxLength={256} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="name-with-label"
                    className="block rounded-md border-0 w-80 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Your password" /> */}
                <input
                  id="input2" name="input2"
                  className="block rounded-md border-0 w-80 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="flex flex-col items-center mt-4">
              <button
                type="submit"
                className="mt-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                Sign in
              </button>
              <p>{message}</p>
            </div>
          </form>
        <div className="flex mx-auto px-4 py-2 w-60 text-base rounded-full text-indigo-500 border border-indigo-500 undefined justify-center mt-10">
          <button className="mr-2 inline-block rounded-full border border-indigo-600 bg-indigo-100 p-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={() => setCount(count + 1)}>👍</button>
          <p className="text-sm grid font-semibold leading-6 text-gray-900 ml-2 mt-3">いいね！ {count}</p>
        </div>
        <div className="mt-4 text-center">
          <div className="mb-10 text-3xl font-semibold">Developer mode!</div>
          <Link href="/admin" className="font-bold text-2xl border border-indigo-500 m-10">Admin </Link>
          <Link href="/events/1" className="font-bold text-2xl border border-indigo-500 m-10">Student</Link>
        </div>
      </main>
    )
  }