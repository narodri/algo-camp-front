export async function PUT(req:any) {
//     // const url = `http://localhost:8000/users/update/${req.id}`;
//     // const res = await fetch(url);
//     // const user = await res.json();
//     // return Response.json({user});
const option = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    }}
    const { id } = req.query;
    const url = `http://localhost:8000/users/update1/${id}`;
    const { is_active } = req.body;  // 클라이언트가 보낸 is_active 값을 가져옴
    const response = await fetch(url, option);
    return Response.json({response});
//     // const res = await fetch(url);
//     // const user = await res.json();
//     // console.log(user)
//     // 여기서 해당 id를 가진 사용자를 찾아서 is_active 값을 업데이트해야 함
//     // 이 부분을 담당하는 로직을 추가하세요.
//     // 예를 들어, mongoose나 sequelize 같은 ORM을 사용하는 경우 해당 사용자를 찾아서 업데이트하는 코드를 추가해야 함
//     return Response.json({ message: "User updated successfully!" });
}