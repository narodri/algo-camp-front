export const dynamic = 'force-dynamic' // defaults to auto

const events = [
    {id:1, title:'Christmas event', opened_at:'2024-04-01', end_at:"2024-05-01"},
    {id:2, title:'Calculation event', opened_at:'2024-04-02', end_at:"2024-05-02"},
    {id:3, title:'Mathematics event', opened_at:'2024-04-03', end_at:"2024-05-03"}
]

export async function GET() {
    return new Response(
        JSON.stringify(events),
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