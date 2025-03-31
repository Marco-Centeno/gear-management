import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Plus } from "lucide-react"
import type { IMachine, IUniverse } from "../../utils/interface"
import "./UniverseSection.css"
interface UniverseSectionProps {
  universes: IUniverse[]
  machines: IMachine[]
  addUniverse: (universe: IUniverse) => void
}

export function UniverseSection({ universes, machines, addUniverse }: UniverseSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [machineId, setMachineId] = useState("")
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState<string>("all")
  const ITEMS_PER_PAGE = 10

  const observer = useRef<IntersectionObserver | null>(null)
  const lastUniverseRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page * ITEMS_PER_PAGE < filteredUniverses.length) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [universes.length, page, filter],
  )

  const filteredUniverses = filter === "all" ? universes : universes.filter((universe) => universe.machineId === filter)

  const displayedUniverses = filteredUniverses.slice(0, page * ITEMS_PER_PAGE)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && machineId) {
      addUniverse({ id: "", name, description, machineId })
      setName("")
      setDescription("")
      setMachineId("")
      setShowForm(false)
    }
  }

  const getMachineName = (id: string) => {
    const machine = machines.find((m) => m.id === id)
    return machine ? machine.name : "Desconocida"
  }

  return (
    <div className="universe-section">
      <div className="section-header">
        <h2>Universos</h2>
        <button className="add-button" onClick={() => setShowForm(true)} disabled={machines.length === 0}>
          <Plus size={20} /> Agregar Universo
        </button>
      </div>

      {machines.length === 0 && (
        <div className="notice">
          <p>Debes crear al menos una máquina antes de agregar universos.</p>
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="universe-form">
            <h3>Nuevo Universo</h3>
            <div className="form-group">
              <label htmlFor="universe-name">Nombre</label>
              <input id="universe-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="universe-description">Descripción</label>
              <textarea
                id="universe-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label htmlFor="machine-select">Máquina Asociada</label>
              <select id="machine-select" value={machineId} onChange={(e) => setMachineId(e.target.value)} required>
                <option value="">Selecciona una máquina</option>
                {machines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name}
                  </option>
                ))}
              </select>
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

      <div className="filter-container">
        <label htmlFor="machine-filter">Filtrar por máquina:</label>
        <select
          id="machine-filter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
            setPage(1) // Reset page when filter changes
          }}
        >
          <option value="all">Todas las máquinas</option>
          {machines.map((machine) => (
            <option key={machine.id} value={machine.id}>
              {machine.name}
            </option>
          ))}
        </select>
      </div>

      <div className="universes-list">
        {displayedUniverses.length > 0 ? (
          displayedUniverses.map((universe, index) => (
            <div
              key={universe.id}
              className="universe-card"
              ref={index === displayedUniverses.length - 1 ? lastUniverseRef : null}
            >
              <h3>{universe.name}</h3>
              <p>{universe.description}</p>
              <div className="machine-badge">Máquina: {getMachineName(universe.machineId)}</div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No hay universos disponibles con el filtro actual.</p>
          </div>
        )}
      </div>
    </div>
  )
}

