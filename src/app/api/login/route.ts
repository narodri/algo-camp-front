import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {

    const jsonReq = await req.json()
    const {login_id, password} = jsonReq
    try{
        const data = {
            "login_id":login_id,
            "password":password
        };
        const url = "http://127.0.0.1:8000/token";

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'ログイン失敗しました〜' }, { status: 200 });
        }

        const jwt = await res.json();
        return NextResponse.json(jwt);

    } catch (error) {
        console.error('Error processing authentication:', error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }

}