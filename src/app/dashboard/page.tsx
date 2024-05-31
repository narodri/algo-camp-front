import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Page() {
    const [message, setMessage] = useState("");
        const router = useRouter();

        useEffect(()=>{
        const token = localStorage.getItem("jwt");
        if (!token) {
            router.push('/login');
        }
        else {
        fetch('http://127.0.0.1:8000/protected', {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.message) {
                setMessage(data.message);
            } else {
                setMessage('You are not authorized to view this page');
                localStorage.removeItem('jwt');
                router.push('/login');
            }
            });
        }
    }, []);
    return (
        <div>
        <h1>Dashboard</h1>
        <p>{message}</p>
        </div>
    );
    }