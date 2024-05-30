"use client"

import { useRouter } from 'next/navigation'

export default function Logout(){
    const router=useRouter()
    return(
        <button
            type="button" onClick={()=>{
                if (window.confirm("本当にログアウトしますか?")) {
                    // ログアウト処理
                    router.push("/");
                    }
                    // location.reload();
            }}
            className="px-6 py-2 rounded-full focus:outline-none transition ease-in duration-200 hover:bg-gray-800 hover:text-white border-2 border-gray-900 ">
            ログアウト
        </button>
    )
}
