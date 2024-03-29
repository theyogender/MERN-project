import logo from './logo.svg';
import './App.css';
import Nav from './Components/Nav';
import Foot from './Components/Foot';
import Signup from './Components/Signup';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      
      <Nav />
      <Signup/>
      <Foot />
    </div>
  );
}

export default App;
