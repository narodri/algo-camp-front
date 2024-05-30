'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cancel from "@/components/Buttons/Cancel";
import Select_event from "@/components/Forms/Select/Select_event";
import Select_level from "@/components/Forms/Select/Select_level";
import Logout from "@/components/Buttons/Logout";
import Input from "@/components/Forms/Input";
import Input_flex from "@/components/Forms/Input_flex";
import Submit from "@/components/Buttons/Submit";


export default async function Page(props:any) {
    const router = useRouter();
    const [status, setStatus] = useState<any>("");

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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event_id, title, level, limit_millisec, limit_memory, problem, condition, in_format, out_format, in_sample_1, out_sample_1, in_sample_2, out_sample_2, in_test_1, out_test_1, in_test_2, out_test_2, in_test_3, out_test_3, in_test_4, out_test_4, in_test_5, out_test_5, is_active})
    }
    try {
      const response = await fetch('http://localhost:8000/questions/create', option);
      setStatus(response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // const result = await response.json();
      router.push('/admin/questions');
    }
    catch (error: any) {
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
            問題の新規作成
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 max-w-3xl space-y-4">
          <div>
            <label htmlFor="text" className="sr-only">question</label>
            <Select_event title={"対応イベント名"} name={"event_id"} required={true}/>
            <Input title={"問題名"} name={"title"} message={"Question Title"} required={true}/>
            <Select_level title={"難易度"} name={"level"} message={"A ~ D"} required={true}/>
            <Input title={"制限時間"} name={"limit_millisec"} message={"Time Limit (sec)"} required={true} value={"2000"} pattern={"[0-9]*"}/>
            <Input title={"制限メモリ"} name={"limit_memory"} message={"Memory Limit (bytes)"} required={true} value={"2000000"} pattern={"[0-9]*"}/>
            <Input_flex title={"問題内容"} name={"problem"} message={""} required={true}/>
            <Input_flex title={"制約"} name={"condition"} message={"Constraints"} />
            <Input_flex title={"入力フォーマット"} name={"in_format"} message={"Input Format"} />
            <Input_flex title={"出力フォーマット"} name={"out_format"} message={"Outpur Format"} />
            <Input_flex title={"入力例１"} name={"in_sample_1"} message={"Input Sample 1"} />
            <Input_flex title={"出力例１"} name={"out_sample_1"} message={"Output Sample 1"} />
            <Input_flex title={"入力例２"} name={"in_sample_2"} message={"Input Sample 2"} />
            <Input_flex title={"出力例２"} name={"out_sample_2"} message={"Output Sample 2"} />
            <Input_flex title={"テスト入力値１"} name={"in_test_1"} message={"Test Case : input 1"}/>
            <Input_flex title={"テスト出力値１"} name={"out_test_1"} message={"Test Case : output 1"} />
            <Input_flex title={"テスト入力値２"} name={"in_test_2"} message={"Test Case : input 2"} />
            <Input_flex title={"テスト出力値２"} name={"out_test_2"} message={"Test Case : output 2"}/>
            <Input_flex title={"テスト入力値３"} name={"in_test_3"} message={"Test Case : input 3"} />
            <Input_flex title={"テスト出力値３"} name={"out_test_3"} message={"Test Case : output 3"} />
            <Input_flex title={"テスト入力値４"} name={"in_test_4"} message={"Test Case : input 4"} />
            <Input_flex title={"テスト出力値４"} name={"out_test_4"} message={"Test Case : output 4"}/>
            <Input_flex title={"テスト入力値５"} name={"in_test_5"} message={"Test Case : input 5"} />
            <Input_flex title={"テスト出力値５"} name={"out_test_5"} message={"Test Case : output 5"} />
          </div>
          <div className="flex justify-evenly">
            <Cancel title={"キャンセル"} path={"/admin/questions/"}/>
            <Submit/>
          </div>
        </form>
      </div>
      )
  }