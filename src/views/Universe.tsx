import { useEffect, useState } from 'react'
import Input from '../components/ui-components/ui/input'
import { IMachine } from '../utils/interface';
import { addMachine, getMachines, setupDatabase } from '../database/context';
import Button from '../components/ui-components/ui/button';
import Alert from '../components/ui-components/ui/alert';
import { Today } from '../utils/Extention';
import "../components/universe/MachineSection.css"
import { Plus } from 'lucide-react';
import Card from '../components/ui-components/ui/card';

function Universe() {
  useEffect(() => {
      setupDatabase().then(() => loadMachines());
    }, []);
  
  const [showForm, setShowForm] = useState(false)
  const [machineList, setMachineList] = useState<IMachine[]>([]);
  const [machine, setMachine] = useState<IMachine>({
    MachinePK: null,
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
                  <Card image='data:image/jpeg;base64,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'>
                    <Alert variant='info'>{machine.Name} - {machine.Constant} - { machine.UPDATED } - {machine.ACTIVE}</Alert>
                  </Card>
                  
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