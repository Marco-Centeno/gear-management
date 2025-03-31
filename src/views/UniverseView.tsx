import { useState } from "react"
import Universe from "./Universe"
import "../App.css";

function UniverseView() {
  const [activeTab, setActiveTab] = useState<"machines" | "universes">("machines")
  return (
    <>
        <div className="tabs">
        <button className={`tab ${activeTab === "machines" ? "active" : ""}`} onClick={() => setActiveTab("machines")}>
          Máquinas
        </button>
        <button
          className={`tab ${activeTab === "universes" ? "active" : ""}`}
          onClick={() => setActiveTab("universes")}
        >
          Universos
        </button>
      </div>

      <div className="content">
        {activeTab === "machines" ? (
          <Universe />
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default UniverseView