import { useState ,useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function AddP(){
    const [Name,SetName]=useState(null)
    const [Price,SetPrice]=useState(null)
    const [Category,SCategory]=useState(null)
    let navigate=useNavigate()
   


    const Submit=async()=>{
        // console.log(name,Number,fname);

        try{
        let data=await fetch('http://127.0.0.1:4500/Add-Product',{
            method:'POST',
            body :JSON.stringify({Name,Price,Category}),
            headers: { 'Content-Type': 'application/json' ,
              authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
             
        }

        });
        data =await data.json();
        // data =await JSON.stringify(data)
        // console.warn(data);
        
        if(data.Name)
        {
         alert("Product Added Succesfully")
        navigate('/Prodt')
        // localStorage.setItem('user',JSON.stringify(data.result))
        // localStorage.setItem('token',JSON.stringify(data.auth))
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
            <input type="text" placeholder="Enter Product Name " onChange={(e)=>{SetName(e.target.value)}} className="SignUp" required/>
            <input type="Number" placeholder="Enter Product Price"  onChange={(e)=>{SetPrice(e.target.value)}} className="SignUp" required/>
            <input type="text" placeholder="Enter Product Category "  onChange={(e)=>{SCategory(e.target.value)}}className="SignUp" required/>
            <button onClick={Submit} className="button">Add-Product</button>
        </div>
    )
}