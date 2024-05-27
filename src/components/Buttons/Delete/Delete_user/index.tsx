"use client"

import { useRouter } from 'next/navigation'  // Usage: App router
import { useEffect, useState } from "react"
export default function Delete_user(props: any) {
    const router = useRouter();

    const deactivateUser = async () => {
        const name = "test";
        const login_id = "test";
        const password = "test";
        const role = 0;
        const is_active = false;
        const option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, login_id, password, role, is_active})
        };
        try {
            const response = await fetch(`http://localhost:8000/users/update/${props.id}`, option);
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

//     index.tsx:22 
        
        
//        PUT http://localhost:8000/users/update/23 404 (Not Found)
// deactivateUser @ index.tsx:22
// onClick @ index.tsx:39
// callCallback @ react-dom.development.js:20565
// invokeGuardedCallbackImpl @ react-dom.development.js:20614
// invokeGuardedCallback @ react-dom.development.js:20689
// invokeGuardedCallbackAndCatchFirstError @ react-dom.development.js:20703
// executeDispatch @ react-dom.development.js:32128
// processDispatchQueueItemsInOrder @ react-dom.development.js:32160
// processDispatchQueue @ react-dom.development.js:32173
// dispatchEventsForPlugins @ react-dom.development.js:32184
// eval @ react-dom.development.js:32374
// batchedUpdates$1 @ react-dom.development.js:24953
// batchedUpdates @ react-dom.development.js:28844
// dispatchEventForPluginEventSystem @ react-dom.development.js:32373
// dispatchEvent @ react-dom.development.js:30141
// dispatchDiscreteEvent @ react-dom.development.js:30112
// Show 14 more frames
// Show less
// index.tsx:23 Server response: Response {type: 'cors', url: 'http://localhost:8000/users/update/23', redirected: false, status: 404, ok: false, …}
// index.tsx:30 There was an error! Error: Network response was not ok
//     at deactivateUser (index.tsx:25:23)