import { useState ,useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function Login(){
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
        let result=await fetch('http://127.0.0.1:4500/login',{
            method:'POST',
            body :JSON.stringify({Number,Password}),
            headers: { 'Content-Type': 'application/json' }

        });
        result =await result.json();
        // data =await JSON.stringify(data)
        console.warn(result);
        
        if(result.auth)
        {
        //  alert("Responce Sended")
        localStorage.setItem('user',JSON.stringify(result.data))
        localStorage.setItem('token',JSON.stringify(result.auth))
        navigate('/')
        } 
        else{
            alert("Enter Valid Number and password")
        }
       }
       catch(error){
        console.error('There was a problem with your fetch operation:', error);
       }


    }
    return(
        <div>
            <input type="Number" placeholder="Enter your Number " onChange={(e)=>{Setnumber(e.target.value)}} className="SignUp" required/>
          
            <input type="password" placeholder="Enter Password "  onChange={(e)=>{Spassword(e.target.value)}}className="SignUp" required/>
            <button onClick={Submit} className="button">Login</button>
        </div>
    )
}