"use client"

import Logout from "@/components/Buttons/Logout";
import New from "@/components/Buttons/New";
import Back from "@/components/Buttons/Back";

export default function Header2(props:any){
    return(
        <div>
            <h2 className="mt-12 mr-10 text-right">
                <Back title="戻る" path="/admin/"/>
                <Logout/>
            </h2>
            <h1 className="font-bold text-5xl mt-10 ml-3">
                {props.title}
            </h1>
            <h2 className="text-right mt-4 mr-10"><New path={props.path}/></h2>
        </div>
    )
}
