import { Outlet,Navigate } from "react-router-dom"
export default function PrivateComp(){

    const auth=localStorage.getItem('user')
    return(
       auth? <Outlet/>:<Navigate to='Signup'/>
    )
}