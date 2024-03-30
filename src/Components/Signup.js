import { useState ,useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function Signup(){
    const [Name,Setname]=useState(null)
    const [Number,Setnumber]=useState(null)
    const [Password,Spassword]=useState(null)
    let navigate=useNavigate()
    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth)
        {
           navigate('/')
        }
    })


    const Submit=async()=>{
        // console.log(name,Number,fname);

        try{
        let data=await fetch('http://127.0.0.1:4500/Signup',{
            method:'POST',
            body :JSON.stringify({Name,Number,Password}),
            headers: { 'Content-Type': 'application/json' }

        });
        data =await data.json();
        // data =await JSON.stringify(data)
        console.warn(data);
        
        if(data.Number)
        {
        //  alert("Responce Sended")
        navigate('/')
        localStorage.setItem('user',JSON.stringify(data))
        } 
        else{
            alert('Enter all details')
        }
       }
       catch(error){
        console.error('There was a problem with your fetch operation:', error);
       }


    }
    return(
        <div>
            <input type="text" placeholder="Enter your Name " onChange={(e)=>{Setname(e.target.value)}} className="SignUp" required/>
            <input type="Number" placeholder="Enter your Number "  onChange={(e)=>{Setnumber(e.target.value)}} className="SignUp" required/>
            <input type="password" placeholder="Enter Password "  onChange={(e)=>{Spassword(e.target.value)}}className="SignUp" required/>
            <button onClick={Submit} className="button">SignUp</button>
        </div>
    )
}