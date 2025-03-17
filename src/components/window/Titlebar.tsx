import { useState} from "react"
import  { getCurrentWindow } from "@tauri-apps/api/window";
import { Minimize, Maximize, X } from "lucide-react"; // Íconos para los botones
import "./Titlebar.css";

const Titlebar = () => {
     const appWindow = getCurrentWindow();

  return (
    <div className="draggable title-bar" >
      <div className="title-subline">
      </div>
      <div className="title-items">
        <button
          onClick={() => appWindow.minimize()}
          className="title-btn"
        >
          <Minimize size={16} />
        </button>
        <button
          onClick={() => appWindow.toggleMaximize()}
          className="title-btn"
        >
          <Maximize size={16} />
        </button>
        <button
          onClick={() => appWindow.close()}
          className="title-btn"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Titlebar;
