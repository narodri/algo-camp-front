export const dynamic = 'force-dynamic' // defaults to auto

const users = [
    {id:1, name:'ha', role:0, password:"jaehyun", created_at:"2024-04-01"},
    {id:2, name:'ikuta', role:1, password:"lila", created_at:"2024-04-02"},
    {id:3, name:'hinata', role:0, password:"syoyo", created_at:"2024-04-03"}
]

export async function GET() {
    return new Response(
        JSON.stringify(users),
        {
            headers: {'Content-Type':'application/json'}
        }
    )
}

export async function POST(request: Request) {

}

export async function PUT(request: Request) {

}

export async function DELETE(request: Request) {

}