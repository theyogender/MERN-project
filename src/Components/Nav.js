import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
// import App from "../App"
export default function Nav() {



  return (
    <BrowserRouter>

      
      <div>
       <ul className="nav-ul">
        <li><Link to="/Home"> Home</Link></li>
        <li><Link to='/About'>About</Link></li>
        <li><Link to='/logout'>logout</Link></li>
       </ul>
    </div>

    <Routes>
        <Route path="/Home" element={<h1>Home Page</h1>} />
        <Route path="/About" element={<h1>About Page</h1>} />
        <Route path="/logout" element={<h1>Logout Page</h1>} />
      </Routes>

    </BrowserRouter>
      
  )
}

