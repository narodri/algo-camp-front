import Password from "@/components/Forms/Password";

export const dynamic = 'force-dynamic' // defaults to auto


// const users = [
//     {id:1, name:'ha', role:0, password:"jaehyun", created_at:"2024-04-01"},
//     {id:2, name:'ikuta', role:1, password:"lila", created_at:"2024-04-02"},
//     {id:3, name:'hinata', role:0, password:"syoyo", created_at:"2024-04-03"}
// ]

export async function GET() {
    const response = await fetch("http://localhost:8000/users/")
    const users = await response.json();
    return new Response(
        // const response = await fetch("http://localhost:8000/users/")
        // const users = await response.json();
        JSON.stringify(users),
        {
            headers: {'Content-Type': 'application/json'}
        }
    )
}

export async function POST(request: Request) {
    const user = await request.json();
    const newuser = {
        name: user.name,
        role: user.role,
        Password: user.password,
        created_at: user.created_at,
        logined_at: user.logined_at
    };
    user.push(newuser);
    return new Response(JSON.stringify(newuser), {
        headers:{
            'Content-Type': 'application/json'
        },
        status: 201,
    });
}

export async function PUT(request: Request) {

}

export async function DELETE(request: Request) {

}