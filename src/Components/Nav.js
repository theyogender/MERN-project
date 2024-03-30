import React from "react"
import { Link,useNavigate} from "react-router-dom"

// import App from "../App"
export default function Nav() {

   const auth=localStorage.getItem('user')

   let navigate=useNavigate()
   function logout(){
    let y=prompt("Enter 1 for logout")
    if (y==1)
    {
      localStorage.clear()
      navigate('/Signup')
    }
    
    // console.warn("Hello!")
  }

  return (
    

      
      <div>
       <ul className="nav-ul">
        <li><Link to="/Home"> Home</Link></li>
        <li><Link to='/About'>About</Link></li>
        
        <li><Link to='/Contect'>Contect</Link></li>
         { auth ?<li><Link onClick={logout} to='/Signup'>Logout</Link></li>:
            <><li><Link to='/login'>login</Link></li>
            <li><Link to='/Signup'>Signup</Link></li>
            </>}
       </ul>
    </div>
    
    
      

    
      
  )
}

