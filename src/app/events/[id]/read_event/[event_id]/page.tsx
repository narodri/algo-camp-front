'use client'

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Row from "@/components/Table/Row";
import Logout from "@/components/Buttons/Logout";
import Label from "@/components/Table/Label";

export default function Page(props:Params) {
    // const router = useRouter()
    // const [event, setEvent] = useState<any>({});
    // const [question, setQuestion] = useState<any>({});

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const eventResponse = await fetch("http://localhost:8000/events/wq/"+props.params.event_id);
    //             const eventData = await eventResponse.json();
    //             const questionResponse = await fetch(`http://localhost:8000/questions/${eventData.question[0].id}`);
    //             const questionData = await questionResponse.json();

    //             setEvent(eventData);
    //             console.log(event)
    //             setQuestion(questionData);
    //             console.log(question)
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const router = useRouter()
    const [event, setEvent] = useState<any>({});
    const [question1, setQuestion1] = useState<any>({});
    const [question2, setQuestion2] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventResponse = await fetch("http://localhost:8000/events/wq/"+props.params.event_id);
                const eventData = await eventResponse.json();
                setEvent(eventData);
                const questionResponse1 = await fetch(`http://localhost:8000/questions/${eventData.question[0].id}`);
                const questionData1 = await questionResponse1.json();
                setQuestion1(questionData1);
                if(eventData.question[1]){
                    const questionResponse2 = await fetch(`http://localhost:8000/questions/${eventData.question[1].id}`);
                    const questionData2 = await questionResponse2.json();
                    setQuestion2(questionData2);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return(
    <div className="mt-10 space-x-16">
        <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-8">
            <div>
                <h2 className="mt-12 mr-10 text-right">
                    <button
                        type="button" onClick={()=>{router.back()}}
                        className="px-6 py-2 mr-8 rounded-full focus:outline-none transition ease-in duration-200 hover:bg-gray-800 hover:text-white border-2 border-gray-900">
                        戻る
                    </button>
                    <Logout/>
                </h2>
                <h1 className="font-bold text-5xl mt-3 ml-3">
                    問題一覧
                </h1>
                <h3 className="text-xl mt-14 ml-3">
                    参加しているイベント : {event.title}
                </h3>
            </div>

            <div className="py-8">
                <div className="px-4 py-4 mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                    {Object.keys(question1).length === 0 ? (
                            <p className="text-center text-xl mt-4 mb-4">問題が存在しません 😯</p>
                        ) : (
                        <table className="min-w-full leading-normal text-center">
                            <thead>
                                <tr>
                                    <Label title="難易度"/>
                                    <Label title="問題名"/>
                                    <Label title="実行制限時間"/>
                                    <Label title="メモリ制限"/>
                                    <Label title=""/>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <Row title={question.level}/> */}
                                    {
                                    [0, 1, 2, 3, 4].map((number) => (
                                            question1.level === number
                                            ? <Row title={String.fromCharCode(65 + number)}/>
                                            : <></>
                                            ))
                                    }
                                    <Row title={question1.title}/>
                                    <Row title={question1.limit_millisec}/>
                                    <Row title={question1.limit_memory}/>
                                    <td className="px-2 py-5 text-sm bg-white border-b border-gray-200">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                        <button
                                            type="submit"
                                            onClick={()=>router.push(`/events/${props.params.id}/read_event/${props.params.event_id}/${question1.id}`)}
                                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
                                            解答する
                                        </button>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                            {
                                question2.id
                                ?
                                        <tbody>
                                            <tr>
                                                {/* <Row title={question.level}/> */}
                                                {
                                                [0, 1, 2, 3, 4].map((number) => (
                                                        question2.level === number
                                                        ? <Row title={String.fromCharCode(65 + number)}/>
                                                        : <></>
                                                        ))
                                                }
                                                <Row title={question2.title}/>
                                                <Row title={question2.limit_millisec}/>
                                                <Row title={question2.limit_memory}/>
                                                <td className="px-2 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                    <button
                                                        type="submit"
                                                        onClick={()=>router.push(`/events/${props.params.id}/read_event/${props.params.event_id}/${question2.id}`)}
                                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
                                                        解答する
                                                    </button>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                : <></>
                            }
                        </table>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}