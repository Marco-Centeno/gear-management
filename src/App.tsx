import Titlebar from "./components/window/Titlebar";
import UserList from "./components/window/UserList";
import "./App.css";
import { DashboardLayout } from "./components/ui-components/dashboard-layout";
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
    <section className="main-app dark">
      <Titlebar />
      <div className="container">
        <DashboardLayout>
          <UserList /> 
        </DashboardLayout>
         
      </div>
    </section> 
  );
}

export default App;
