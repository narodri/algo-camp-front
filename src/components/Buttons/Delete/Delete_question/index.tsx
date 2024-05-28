"use client"

import { useRouter } from 'next/navigation'

export default function Delete_question(props: any) {
    const router = useRouter();

    const deactivateQuestion = async () => {
        try {
            const response = await fetch(`http://localhost:8000/questions/${props.id}`,
                {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: "cors"
                // JSON.stringify({ is_active :false})
                }
                );
            console.log("Server response:", response);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("Question deactivated successfully!");
            router.push(`/admin/questions/`)
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <button
        type="submit"
            onClick={() => {
                if (window.confirm("本当に削除しますか?")) {
                deactivateQuestion();
                };
                location.reload();
                // router.push(`/admin/questions/`);
            }}
            className="px-6 py-2 bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
        削除
        </button>
    );
    }