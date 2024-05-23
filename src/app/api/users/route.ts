export const dynamic = 'force-dynamic' // defaults to auto


// const users = [
//     {id:1, name:'ha', role:0, password:"jaehyun", created_at:"2024-04-01"},
//     {id:2, name:'ikuta', role:1, password:"lila", created_at:"2024-04-02"},
//     {id:3, name:'hinata', role:0, password:"syoyo", created_at:"2024-04-03"}
// ]

export async function GET() {
    const response = await fetch("http://localhost:8000/users");
    const json = await response.json();
    // const users1 = [JSON.stringify(json)];
    // const users = JSON.parse(users1[0]);
    // const users = [JSON.stringify(json)];
    return new Response(
        JSON.stringify(json),
        {
            headers: {'Content-Type':'application/json'}
        }
    )
}

export async function POST(request: Request) {
    // const response = await fetch("http://localhost:8000/users/1");
    // const json = await response.json();
    // const users = [JSON.stringify(json)];

    // const {id, name, role, password, created_at} = await request.json();
    // const newUser = {id, name, role, password, created_at};
    // users.push(newUser);
    // return new Response(JSON.stringify(newUser), {
    //     headers: {'Content-Type':'application/json'}
    // })
}

export async function PUT(request: Request) {

}

export async function DELETE(request: Request) {

}