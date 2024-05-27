'use client' // CSRの設定

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Logout from "@/components/Buttons/Logout";
import Label from "@/components/Table/Label";
import Row from "@/components/Table/Row";

export default function Page(props:any) {
    const router = useRouter()
    const [events, setEvents] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsResponse, usersResponse] = await Promise.all([
                    fetch("http://localhost:8000/events_active"),
                    fetch("http://localhost:8000/users/"+props.params.id)
                ]);

                const [eventsData, usersData] = await Promise.all([
                    eventsResponse.json(),
                    usersResponse.json()
                ]);

                setEvents(eventsData);
                console.log(events)
                setUser(usersData);
                console.log(user)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleParticipateClick = (eventId: string) => {
        if (user) {
            router.push(`/events/${user.id}/read_event/${eventId}`);
        } else {
            console.error('User data not loaded yet.');
        }
    };

    return (
        <div className="mt-10 space-x-16">
            <div className="container max-w-3xl px-4 mt-24 mx-auto sm:px-8">
                <div>
                    <h2 className="mt-12 mr-10 text-right">
                        <Logout />
                    </h2>
                    <h1 className="font-bold text-5xl mt-3 ml-3">イベント一覧</h1>
                    <h2 className="font-normal text-2xl mt-10 ml-5">Welcome back, {user ? user.name : ''}!</h2>
                </div>

                <div className="py-8">
                    <div className="px-4 py-4 mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                            <table className="min-w-full leading-normal text-center">
                                <thead>
                                    <tr>
                                        <Label title={"イベント名"} />
                                        <Label title={"開始"} />
                                        <Label title={"終了"} />
                                        <Label title={""} />
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event: any) => (
                                        <tr key={event.id}>
                                            <Row title={event.title} />
                                            <Row title={event.opened_at} />
                                            <Row title={event.end_at} />
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleParticipateClick(event.id)}
                                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full"
                                                    >
                                                        参加
                                                    </button>
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}