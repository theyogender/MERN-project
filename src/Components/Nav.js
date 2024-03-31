import React from "react"
import { Link, useNavigate } from "react-router-dom"

// import App from "../App"
export default function Nav() {

  const auth = localStorage.getItem('user')

  let navigate = useNavigate()
  function logout() {
    let y = prompt("Enter 1 for logout")
    if (y == 1) {
      localStorage.clear()
      navigate('/Signup')
    }

    // console.warn("Hello!")
  }

  return (



    <div>
      <ul className="nav-ul">
        {auth ? <>
          <li><Link to="/Home"> Home</Link></li>
          <li><Link to='/Prodt'>Products</Link></li>
          <li><Link to='/Add-Product'>Add-Product</Link></li>

          <li><Link to='/Contect'>Contect</Link></li>

          <li><Link onClick={logout} to='/Signup'>Logout({JSON.parse(auth).Name})</Link></li>
        </>
          :
          <>
            <li><Link to='/login'>login</Link></li>
            <li><Link to='/Signup'>Signup</Link></li>
          </>}
      </ul>
    </div>






  )
}

