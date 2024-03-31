import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
export default function Prodt(){
    
    const[Product,SetProduct]=useState([])
    useEffect(()=>{
        getProduct()
    },[])

    const getProduct=async()=>{
    let collection=await fetch('http://127.0.0.1:4500/Product',
    {
        headers:{ authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}
    }
    )
    collection=await collection.json()
    
        SetProduct(collection)
     
    
    } 
    // console.warn(Product)
    
    const  Delete=async (id)=>{

        let a=prompt('Enter 1 to delete')
        if(a==1){
        let result= await fetch(`http://127.0.0.1:4500/delete/${id}`,
        {
            method:'delete',
            headers:{ authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}
        })

        result=result.json()
        // console.warn(result);
        if(result)
        {
          alert('Deleted Successfully!')
          getProduct()
        //   console.warn(result);
        }
        else{
            alert(' Not Deleted ')
        }
    }
    }

    const Search=async (e)=>{
     let key=e.target.value
     if(key)
     {
     let data=await fetch(`http://127.0.0.1:4500/Search/${key}`,
     {
        headers:{ authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}
     }
     )
     data= await data.json()
     SetProduct(data)
     }
     else
     {
        getProduct()
     }

    }
    
    return(
         <>
          <div >
                <h1 style={{ "text-align": "center" }}>Product List</h1>
            </div>
         <div className="Product-list">
            <input type="text" placeholder="Search Product" className="Search" onChange={Search}/>
         <ul>
            <li>S.no</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Operation</li>
         </ul>
         {
           Product.length>0 ? Product.map((item,index)=>
                <ul key={item._id}>
                <li>{index}</li>
                <li>{item.Name}</li>
                <li>{item.Price}</li>
                <li>{item.Category}</li>
                <li> <button onClick={()=>Delete(item._id)}>delete</button>
                   <Link to={'/update/'+item._id}><button >Update</button></Link>
                </li>
             </ul>
            )
            :<h1>Product Not Found</h1>
         }
         </div>
         </>
    )
}