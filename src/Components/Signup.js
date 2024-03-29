import { useState } from "react"
export default function Signup(){
    const [name,Setname]=useState('')
    const [Number,Setnumber]=useState('')
    const [fname,Sfname]=useState('')
    const Submit=()=>{
        alert(name,Number,fname)

    }
    return(
        <div>
            <input type="text" placeholder="Enter your name " value={name} onChange={(e)=>{Setname(e.target.value)}} className="SignUp" required/>
            <input type="Number" placeholder="Enter your Number " value={Number} onChange={(e)=>{Setnumber(e.target.value)}} className="SignUp" required/>
            <input type="text" placeholder="Enter your Father name " value={fname} onChange={(e)=>{Sfname(e.target.value)}}className="SignUp" required/>
            <button onClick={Submit} className="button">SignUp</button>
        </div>
    )
}