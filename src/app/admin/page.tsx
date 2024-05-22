// 'use client' // CSRの設定

// import { useState } from "react"
import Link from "next/link";
import Header from "@/components/Header";
import Logout from "@/components/Buttons/Logout";
import Menu from "@/components/Buttons/Menu";

export default function Page() {

    return(
        <body>
          <div className="bg-white">
            <div className="flex h-screen flex-col items-center justify-center">
              <div className="max-h-auto mx-auto max-w-xl">
                <div className="mb-8 space-y-3">
                  <h1 className="text-4xl text-center tracking-tight text-gray-900 sm:text-6xl">
                    <Header name={"管 理 者 画 面"}/>
                  </h1>
                  <div className="text-center">
                    <Menu name="ユーザ管理" path="/admin/users" />
                    <Menu name="問題管理" path="/admin/questions" />
                    <Menu name="イベント管理" path="/admin/events" />
                    <div className="mt-14">
                      <Logout />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
    )
  }