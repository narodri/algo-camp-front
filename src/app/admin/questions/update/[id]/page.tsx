'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cancel from "@/components/Buttons/Cancel";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";
import Input_flex from "@/components/Forms/Input_flex";

export default function Page(props:any) {
  const router = useRouter()
  const [question, setQuestion] = useState<any>({});
  const [events, setEvents] = useState<any>([]);
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
              const questionResponse = await fetch("http://localhost:8000/questions/we/"+props.params.id);

              const questionData = await questionResponse.json();
              console.log(questionData);
              setQuestion(questionData);

              const eventsResponse = await fetch("http://localhost:8000/events/");
              const eventsData = await eventsResponse.json();
              console.log(eventsData);
              setEvents(eventsData);
          } catch (error: any) {
            alert(`HTTP ${status}, ${error.message}`);
            console.error('☹️エラー！');
            router.push(`/admin/users/`)
          }
      };

      fetchData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const event_id = e.target.event_id.value;
    const title = e.target.title.value;
    const level = e.target.level.value;
    const limit_millisec = e.target.limit_millisec.value;
    const limit_memory = e.target.limit_memory.value;
    const problem = e.target.problem.value;
    const condition = e.target.condition.value;
    const in_format = e.target.in_format.value;
    const out_format = e.target.out_format.value;
    const in_sample_1 = e.target.in_sample_1.value;
    const out_sample_1 = e.target.out_sample_1.value;
    const in_sample_2 = e.target.in_sample_2.value;
    const out_sample_2 = e.target.in_sample_2.value;
    const in_test_1 = e.target.in_test_1.value;
    const out_test_1 = e.target.out_test_1.value;
    const in_test_2 = e.target.in_test_2.value;
    const out_test_2 = e.target.out_test_2.value;
    const in_test_3 = e.target.in_test_3.value;
    const out_test_3 = e.target.out_test_3.value;
    const in_test_4 = e.target.in_test_4.value;
    const out_test_4 = e.target.out_test_4.value;
    const in_test_5 = e.target.in_test_5.value;
    const out_test_5 = e.target.out_test_5.value;
    const is_active = true;
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event_id, title, level, limit_millisec, limit_memory, problem, condition, in_format, out_format, in_sample_1, out_sample_1, in_sample_2, out_sample_2, in_test_1, out_test_1, in_test_2, out_test_2, in_test_3, out_test_3, in_test_4, out_test_4, in_test_5, out_test_5, is_active})
    };
    try {
      const response = await fetch(`http://localhost:8000/questions/update/${props.params.id}`, option);
      setStatus(response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("Server response:", response);
      // const result = await response.json();
      router.push('/admin/questions');
    } catch (error: any) {
      alert(`HTTP ${status}, ${error.message}`);
      console.error('☹️エラー！');
      router.push(`/admin/users/`)
    }
  };

    return(
      <div className="mx-auto mt-0 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
          <h2 className="mt-12 mr-5 text-right">
            <Logout/>
          </h2>
          <h1 className="font-bold text-5xl mt-3 ml-3">
            問題の編集
          </h1>
        </div>

        <form onSubmit={handleSubmit} action="#" className="mx-auto mt-8 max-w-3xl space-y-4">
          <div>
            <div className="mx-auto mb-0 mt-8 space-y-4">
            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                対応イベント名
            </label>
            <select
                // defaultValue={props.value}
                name={"event_id"}
                id="HeadlineAct"
                className="block rounded-md border-0 w-1/3 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="">Please select</option>
                {events.map((event:any)=>{
                  return(
                  event.id === question.event.id
                  ? <option selected value={event.id}>{event.title}</option>
                  : <option value={event.id}>{event.title}</option>
                )}
                )}
            </select>
        </div>
            <Input title={"問題名"} name={"title"} message={"Question Title"} value={question.title}/>
            {/* <Select_level title={"難易度"} message={"A ~ E"} value={question.level}/> */}
            <div className="mx-auto mb-0 mt-8 space-y-4">
              <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                  難易度
              </label>
            <select
                name={"level"}
                id="HeadlineAct"
                defaultValue={props.value}
                className="block rounded-md border-0 w-1/3 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                {[0, 1, 2, 3, 4].map((number) => (
                <option value={number} selected={question.level === number}>
                  {String.fromCharCode(65 + number)}
                </option>
              ))}
            </select>
        </div>
            <Input title={"制限時間"} name={"limit_millisec"} message={"Time Limit (sec)"} value={question.limit_millisec} required={true} pattern={"[0-9]*"}/>
            <Input title={"制限メモリ"} name={"limit_memory"} message={"Memory Limit (byte)"} value={question.limit_memory} required={true} pattern={"[0-9]*"}/>
            <Input_flex title={"問題内容"} name={"problem"} message={""} value={question.problem}/>
            <Input_flex title={"制約"} name={"condition"} message={"Constraints"} value={question.condition}/>
            <Input_flex title={"入力フォーマット"} name={"in_format"} message={"Input Format"} value={question.in_format}/>
            <Input_flex title={"出力フォーマット"} name={"out_format"} message={"Outpur Format"} value={question.out_format}/>
            <Input_flex title={"入力例１"} name={"in_sample_1"} message={"Input Sample 1"}value={question.in_sample_1}/>
            <Input_flex title={"出力例１"} name={"out_sample_1"} message={"Output Sample 1"} value={question.out_sample_1}/>
            <Input_flex title={"入力例２"} name={"in_sample_2"} message={"Input Sample 2"}value={question.in_sample_2}/>
            <Input_flex title={"出力例２"} name={"out_sample_2"} message={"Output Sample 2"} value={question.out_sample_2}/>
            <Input_flex title={"テスト入力値１"} name={"in_test_1"} message={"Test Case : input 1"} value={question.in_test_1}/>
            <Input_flex title={"テスト出力値１"} name={"out_test_1"} message={"Test Case : output 1"} value={question.out_test_1}/>
            <Input_flex title={"テスト入力値２"} name={"in_test_2"} message={"Test Case : input 2"} value={question.in_test_2}/>
            <Input_flex title={"テスト出力値２"} name={"out_test_2"} message={"Test Case : output 2"} value={question.out_test_2}/>
            <Input_flex title={"テスト入力値３"} name={"in_test_3"} message={"Test Case : input 3"} value={question.in_test_3}/>
            <Input_flex title={"テスト出力値３"} name={"out_test_3"} message={"Test Case : output 3"} value={question.out_test_3}/>
            <Input_flex title={"テスト入力値４"} name={"in_test_4"} message={"Test Case : input 4"} value={question.in_test_4}/>
            <Input_flex title={"テスト出力値４"} name={"out_test_4"} message={"Test Case : output 4"} value={question.out_test_4}/>
            <Input_flex title={"テスト入力値５"} name={"in_test_5"} message={"Test Case : input 5"} value={question.in_test_5}/>
            <Input_flex title={"テスト出力値５"} name={"out_test_5"} message={"Test Case : output 5"} value={question.out_test_5}/>
          </div>
          <div className="flex justify-evenly">
            <Cancel title={"キャンセル"} path={"/admin/questions/"}/>
            <Submit/>
          </div>
        </form>
      </div>
      )
  }