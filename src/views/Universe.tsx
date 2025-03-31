import { useEffect, useState } from 'react'
import Input from '../components/ui-components/ui/input'
import { IMachine } from '../utils/interface';
import { addMachine, getMachines, setupDatabase } from '../database/context';
import Button from '../components/ui-components/ui/button';
import Alert from '../components/ui-components/ui/alert';
import { Today } from '../utils/Extention';
import "../components/universe/MachineSection.css"
import { Plus } from 'lucide-react';

function Universe() {
  useEffect(() => {
      setupDatabase().then(() => loadMachines());
    }, []);
  
  const [showForm, setShowForm] = useState(false)
  const [machineList, setMachineList] = useState<IMachine[]>([]);
  const [machine, setMachine] = useState<IMachine>({
    Name: "",
    Constant: "",
    UPDATED: Today,
    ACTIVE: 1
  });

  const handleMachine = async () => {
    if (machine.Name.trim() === "" || machine.Constant === "") {
      alert("Por favor, ingrese todos los valores.");
      return;
    }
    await addMachine(machine.Name, Number(machine.Constant), machine.UPDATED, machine.ACTIVE);
  };

  async function loadMachines() {
      const data = await getMachines();
      setMachineList(data as IMachine[]);
  };

  return (
    <section className='universe'>
        <div>
        <div className="section-header">
        <h2>Máquinas</h2>
          <button className="add-button" onClick={() => setShowForm(true)}>
            <Plus size={20} /> Agregar Máquina
          </button>
        </div> 
            <section>
              {
                machineList.map((machine) => (
                  <Alert variant='info'>{machine.Name} - {machine.Constant} - { machine.UPDATED } - {machine.ACTIVE}</Alert>
                ))
              }
            </section>         
        </div>
        <div>
         
        </div>

        {showForm && (
        <div className="form-container">
          <form className="machine-form">
              <h3>Nueva Máquina</h3>
              <div className="form-group">
                <label>Name</label>
                <Input 
                  onChange={(e) => setMachine({ ...machine, Name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Constant</label>
                <Input type="number" value={machine.Constant} 
                  onChange={(e) => setMachine({ ...machine, Constant: e.target.value ? Number(e.target.value) : ""})} />
              </div>
            <div className="form-actions">
              <Button variant="danger" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button variant="primary" onClick={handleMachine}>Guardar</Button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}

export default Universe