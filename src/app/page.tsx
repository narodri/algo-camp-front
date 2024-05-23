'use client' // CSRの設定

import { useEffect, useState } from "react"
import Header1 from "@/components/Headers/Header1";
import Link from "next/link";
import Basic from "@/components/Forms/Basic";
import Password from "@/components/Forms/Password";
import Head from "next/head";

export default function Page() {
  const [count, setCount] = useState(0);


    return (
      <main>
        <Header1 title={"Fignny Camp!"}/>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" />
          <form className="space-y-6" action="#" method="POST">
            <Basic title={"ID"} message={"Your ID"}/>
            <Password title={"Password"} message={"Your Password"}/>
            <div className="flex flex-col items-center mt-4">
              <button
                type="submit"
                className="mt-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                Sign in
              </button>
            </div>
          </form>
        <div className="flex mx-auto px-4 py-2 w-60 text-base rounded-full text-indigo-500 border border-indigo-500 undefined justify-center mt-10">
          <button className="mr-2 inline-block rounded-full border border-indigo-600 bg-indigo-100 p-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={() => setCount(count + 1)}>👍</button>
          <p className="text-sm grid font-semibold leading-6 text-gray-900 ml-2 mt-3">いいね！ {count}</p>
        </div>
        <div className="mt-10 text-center">
          <div className="mb-10 text-3xl font-semibold">Developer mode!</div>
          <Link href="/admin" className="font-bold text-2xl border border-indigo-500 m-10">Admin </Link>
          <Link href="/events" className="font-bold text-2xl border border-indigo-500 m-10">Student</Link>
        </div>
      </main>
    )
  }