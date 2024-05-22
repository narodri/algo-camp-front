export const dynamic = 'force-dynamic' // defaults to auto

const questions = [
    {id:1, title:'Maka a Christmas Tree', event_name:'Christmas event'},
    {id:2, title:'Sum of 1 to N', event_name:'Calculation event'},
    {id:3, title:'Euclidean Algorithm', event_name:'Mathematics event'},
    {id:4, title:'Find a max number', event_name:'Calculation event'}
]

export async function GET() {
    return new Response(
        JSON.stringify(questions),
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