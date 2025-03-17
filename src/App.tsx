import Titlebar from "./components/window/Titlebar";
import UserList from "./components/window/UserList";
import "./App.css";
import GearCalculator from "./components/gear-calculator/GearCalculator";
import { HashRouter  as Router, Route, Routes } from "react-router";
import { Calculator, Cog, HardDrive, User } from "lucide-react";
//import { DashboardLayout } from "./components/ui-components/dashboard-layout";
//import { invoke } from "@tauri-apps/api/core";

function App() {
  /*
  const [name, setName] = useState("");
  const [greetMsg, setGreetMsg] = useState("");
  async function greet() {
    // Sumary: El ejemplo sirve para vincular funciones en el backend de rust con el frontend. 
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }*/

  
    
  return (
    <Router basename="/">
    <section className="main-app dark">
      <Titlebar />
      <div className="container parent">
        <div className="menu">
          <section className="menu-content">
            <center>
              <strong>
                Opciones 
              </strong>
            </center><br />
            <hr />
            <a href="/#/gear-calculator">
              <Calculator/> Calculator
            </a>
            <a href="/#/gear-universe">
              <Cog/> Universo
            </a>
            <a href="/#/user-list">
              <HardDrive/> Gestior de datos
            </a>
            <a href="/#/user-list">
              <User/> DB Test
            </a>
          </section>
          
        </div>
        <section className="content">
         
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/gear-calculator" element={<GearCalculator />} />
              <Route path="/gear-universe" element={<p>Universo</p>} />
              <Route path="/gear-calculator" element={<GearCalculator />} />
              
            </Routes>
        
        </section>
          
      </div>
    </section> 
    </Router>
  );
}

export default App;
