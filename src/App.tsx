import Titlebar from "./components/window/Titlebar";
import UserList from "./components/window/UserList";
import "./App.css";
import GearCalculator from "./components/gear-calculator/GearCalculator";
import { HashRouter  as Router, Route, Routes } from "react-router";
import NavBar from "./components/window/NavBar";
import Universe from "./views/Universe";
import Clients from "./views/Clients";
import UniverseView from "./views/UniverseView";
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
          <NavBar />
        </div>
        <section className="content">
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/gear-calculator" element={<GearCalculator />} />
              <Route path="/gear-universe" element={<Universe />} />
              <Route path="/gear-calculator" element={<GearCalculator />} />
              <Route path="/client-manager" element={<Clients />} />
              <Route path="/universe" element={<UniverseView />} />
            </Routes>
        </section>
      </div>
    </section> 
    </Router>
  );
}

export default App;
