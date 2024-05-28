

export async function PUT(req:Request) {
    const url = `http://localhost:8000/users/update1/23`;
    const res = await fetch(url
        , {
        method: 'PUT',
        mode: 'cors',
        // // headers: {
        // //     'Content-Type': 'application/json'
        // }
    }
);
    const user = await res.json();
    console.log(user);
    return Response.json({user}, {status: 200});
}