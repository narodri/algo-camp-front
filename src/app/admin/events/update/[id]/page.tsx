'use client' // CSRの設定

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Cancel from "@/components/Buttons/Cancel";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";
import Input_date from "@/components/Forms/Input_date";

export default function Page(props:any) {
    const router = useRouter()
    const [event, setEvent] = useState<any>({});
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [status, setStatus] = useState<any>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
              const token = localStorage.getItem("jwt");
                const c_id = localStorage.getItem("id");
                const c_role = localStorage.getItem("role");

                if (!token) {
                    alert("You have to login first.");
                    router.push(`/`);
                    return;
                }

                const response_for_check = await fetch(`http://localhost:8000/user_expired/${c_id}`);
                const check = await response_for_check.json();
                const expireTimestamp = new Date(check.access_expired).getTime() / 1000;
                const nowTimestamp = Date.now() / 1000;

                if (expireTimestamp < nowTimestamp) {
                    alert("Your token is expired! Please login again.");
                    router.push(`/`);
                    return;
                }
                const eventsResponse = await fetch("http://localhost:8000/events/"+props.params.id);
                const eventsData = await eventsResponse.json();
                setEvent(eventsData);
                console.log(eventsData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const title = e.target.title.value;
      const opened_at = new Date(e.target.opened_at.value).toISOString();
      const end_at = new Date(e.target.end_at.value).toISOString();
      const is_active = true;
      const option = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, opened_at, end_at, is_active})
      };
      try {
        const response = await fetch(`http://localhost:8000/events/update/${props.params.id}`, option);
        setStatus(response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // const result = await response.json();
        router.push('/admin/events');
      } catch (error: any) {
        alert(`HTTP ${status}, ${error.message}`);
        console.error('☹️エラー！');
        router.push(`/admin/users/`)

        if (error.message.includes("Failed to fetch")) {
          setErrorMessage("イベント名が既に存在します。別のイベント名にしてください。🧐");
        } else {
          setErrorMessage("エラーが発生しました。🤗🤗🤗🤗🤗🤗🤗🤗🤗🤗🤗");
        }
      }
    };

    return(
      <div className="mx-auto mt-0 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <h2 className="mt-12 mr-5 text-right">
            <Logout/>
          </h2>
          <h1 className="font-bold text-5xl mt-3 ml-3">
            イベントの編集
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div>
            <label htmlFor="text" className="sr-only" >Event</label>
            <Input title={"イベント名"} name={"title"} message={"Event Name"} value={event.title} required={true}/>
            <Input_date title={"開始"} name={"opened_at"} message={"Start at"} value={event.opened_at ? new Date(event.opened_at).toISOString().slice(0,16) : ""} required={true}/>
            <Input_date title={"終了"} name={"end_at"} message={"End at"} value={event.end_at ? new Date(event.end_at).toISOString().slice(0,16) : ""} required={true}/>

          </div>
          <div className="flex justify-evenly">
            <Cancel title={"キャンセル"} path={"/admin/events"}/>
            <Submit/>
          </div>
        </form>
      </div>
      )
  }