"use client"

import { useRouter } from 'next/navigation'  // Usage: App router
// import { useEffect, useState } from "react"

export default function Delete_user(props: any) {
    const router = useRouter();

    const deactivateUser = async () => {
        const option = {
        method: 'PUT',
        headers: {}
        //     'Content-Type': 'application/json'
        // }
        // JSON.stringify({ is_active :false})
        };
        try {
            const response = await fetch(`http://localhost:8000/users/update1/${props.id}`, option);
            // const response = await fetch(`/api/users/update1/${props.id}`, option);
            console.log("Server response:", response);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("User deactivated successfully!");
            router.push(`/admin/users/`)
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <button
        type="button"
            onClick={() => {
                // deactivateUser()
                if (window.confirm("本当に削除しますか?")) {
                deactivateUser();
                }
            }}
            className="px-6 py-2 bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
        削除
        </button>
    );
    }