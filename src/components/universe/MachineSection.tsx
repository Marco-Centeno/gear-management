
import { useState, useRef, useCallback, useEffect } from "react"
import { Plus } from "lucide-react"
import type { IMachine } from "../../utils/interface"
import "./MachineSection.css"
import { addMachine, getMachines, setupDatabase } from "../../database/context"
import { Today } from "../../utils/Extention"
import { Machine } from "../../utils/GearManagementModel"

export function MachineSection() {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [page, setPage] = useState(1)
  const [machines, setMachines] = useState<IMachine[]>([ new Machine(0,"","") ]);
  const [machine, setMachine] = useState<IMachine>( new Machine(0,"","") );
  
  const ITEMS_PER_PAGE = 1

  useEffect(() => {
    setupDatabase().then(() => loadMachines());
  }, []);

  async function loadMachines() {
    const data = await getMachines();
    setMachines(data as IMachine[]);
  }

  const observer = useRef<IntersectionObserver | null>(null)
  const lastMachineRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page * ITEMS_PER_PAGE < machines.length) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [machines.length, page],
  )

  
  

  const displayedMachines = machines.slice(0, page * ITEMS_PER_PAGE)

  const handleSubmit = async () => {
    if (machine.Name.trim() === "" || machine.Constant === "") {
      alert("Por favor, ingrese todos los valores.");
      return;
    }
    await addMachine(machine.Name, Number(machine.Constant), machine.UPDATED, machine.ACTIVE);
  };

  return (
    <div className="machine-section">
      <div className="section-header">
        <h2>Máquinas</h2>
        <button className="add-button" onClick={() => setShowForm(true)}>
          <Plus size={20} /> Agregar Máquina
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="machine-form">
            <h3>Nueva Máquina</h3>
            <div className="form-group">
              <label htmlFor="machine-name">Nombre</label>
              <input id="machine-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="machine-description">Descripción</label>
              <textarea
                id="machine-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
              <button type="submit">Guardar</button>
            </div>
          </form>
        </div>
      )}

      <div className="machines-list">
        {displayedMachines.length > 0 ? (
          displayedMachines.map((machine, index) => (
            <div
              key={machine.Name}
              className="machine-card"
              ref={index === displayedMachines.length - 1 ? lastMachineRef : null}
            >
              <h3>{machine.Name}</h3>
              <p>{machine.Constant}</p>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No hay máquinas disponibles. ¡Agrega una!</p>
          </div>
        )}
      </div>
    </div>
  )
}

