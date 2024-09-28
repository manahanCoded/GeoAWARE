"use client"
import Login from "@/app/authentication/pages/login"
import Register from "@/app/authentication/pages/register"

import { useRecoilValue} from "recoil"
import authScreenAtom from "@/atoms/authAtom"

function Authentication(){
    const authScreenState = useRecoilValue(authScreenAtom)

    
    return(
        <div className="relative bg-white z-[1000]">
        {authScreenState === "login" ? <Login /> : <Register />}
        </div>
    )
}

export default Authentication