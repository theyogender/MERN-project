import logo from './logo.svg';
import './App.css';
import Nav from './Components/Nav';
import Foot from './Components/Foot';
import Signup from './Components/Signup';
import Login from './Components/Login';
import PrivateComp from './Components/PrivateComp';
import AddP from './Components/AddP';
import UpdateP from './Components/UpdateP';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Prodt from './Components/Prodt';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      {/* <Signup/> */}


      <Routes>
       <Route  element={<PrivateComp/>}>
        <Route path="/Home" element={<h1>Home Page</h1>} />
        <Route path="/Prodt" element={<Prodt/>} />
        <Route path="/Add-Product" element={<AddP/>} />
        <Route path="/Update/:id" element={<UpdateP/>} />
        <Route path="/Contect" element={<h1>Contect Page</h1>} />
        </Route>
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/login"  element={<Login/>} />
        
      </Routes>

      <Foot />

      </BrowserRouter>
     
     
    </div>
  );
}

export default App;


// eval "$(ssh-agent -s)"
// ssh-add -l