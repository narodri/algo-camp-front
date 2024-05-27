'use client' // CSRの設定

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cancel from "@/components/Buttons/Cancel";
import Wide from "@/components/Forms/Wide";
// import Select_event2 from "@/components/Forms/Select/Select_event";
// import Select_level from "@/components/Forms/Select/Select_level";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Submit from "@/components/Buttons/Submit";

export default function Page(props:any) {
  const router = useRouter()
  const [question, setQuestion] = useState<any>({});
  const [event2, setEvents2] = useState<any>({});
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const questionResponse = await fetch("http://localhost:8000/questions/we/"+props.params.id);

              const questionData = await questionResponse.json();
              console.log(questionData);
              setQuestion(questionData);

              const event2sResponse = await fetch(`http://localhost:8000/events/${questionData.event_id}`);

              const event2sData = await event2sResponse.json();
              console.log(event2sData);
              setEvents2(event2sData);

              const eventsResponse = await fetch("http://localhost:8000/events/");
  
                const eventsData = await eventsResponse.json();
                console.log(eventsData);
                setEvents(eventsData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []);
  
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

        <form action="#" className="mx-auto mt-8 max-w-3xl space-y-4">
          <div>
            {/* <label htmlFor="text" className="sr-only">question</label> */}
            {/* <Select_event2 title={"対応イベント名"} /> */}
            <div className="mx-auto mb-0 mt-8 space-y-4">
            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                対応イベント名
            </label>
            <select
                // defaultValue={props.value}
                name={props.name}
                id="HeadlineAct"
                className="block rounded-md border-0 w-1/3 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                {/* <option value="">Please select</option> */}
                {events.map((event:any)=>{
                  return(
                  event.id === event2.id
                  ? <option selected value={event.id}>{event.title}</option>
                  : <option value={event.id}>{event.title}</option>
                )}
                )}
            </select>
        </div>
            <Input title={"問題名"} message={"Question Title"} value={question.title}/>
            {/* <Select_level title={"難易度"} message={"A ~ E"} value={question.level}/> */}
            <div className="mx-auto mb-0 mt-8 space-y-4">
            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                難易度
            </label>
            <select
                name={props.name}
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
            <Input title={"制限時間"} message={"Time Limit (sec)"} value={question.limit_millisec}/>
            <Wide title={"問題内容"} message={""} value={question.problem}/>
            <Input title={"制約"} message={"Constraints"} value={question.condition}/>
            <Input title={"入力フォーマット"} message={"Input Format"} value={question.in_format}/>
            <Input title={"出力フォーマット"} message={"Outpur Format"} value={question.out_format}/>
          </div>
          <div className="flex justify-evenly">
            <Cancel title={"キャンセル"} path={"/admin/questions/"}/>
            <Submit/>
          </div>
        </form>
      </div>
      )
  }