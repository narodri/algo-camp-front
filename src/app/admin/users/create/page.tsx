// 'use client' // CSRの設定

// import { useState } from "react"
import Link from "next/link";
import Cancel from "@/components/Buttons/Cancel";
import Create from "@/components/Buttons/Submit";
import Basic from "@/components/Forms/Basic";
import Wide from "@/components/Forms/Wide";
import Select from "@/components/Forms/Select";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";

export default function Page() {
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

        <form action="#" className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <div>
            <label htmlFor="text" className="sr-only">question</label>
            <Input title={"名前"} message={"User Name"}/>
            <Input title={"ログインID"} message={"Loing ID"}/>
            <Input title={"パスワード"} message={"User Password"}/>
            <Input title={"パスワード（確認）"} message={"User Password Confirmation"}/>
            <Select title={"種別"}/>
          </div>
          <div className="flex justify-evenly">
            <Cancel title={"キャンセル"}/>
            <Submit/>
          </div>
        </form>
      </div>
      )
  }