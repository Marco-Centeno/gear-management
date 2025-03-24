import { useEffect, useState } from 'react'
import Input from '../components/ui-components/ui/input'
import { Machine } from '../utils/interface';
import { addMachine, getMachines, setupDatabase } from '../database/context';
import Button from '../components/ui-components/ui/button';
import Alert from '../components/ui-components/ui/alert';

function Universe() {
  const today = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  useEffect(() => {
      setupDatabase().then(() => loadMachines());
    }, []);

  const [machineList, setMachineList] = useState<Machine[]>([]);
  const [machine, setMachine] = useState<Machine>({
    Name: "",
    Constant: "",
    UPDATED: today,
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
      setMachineList(data as Machine[]);
    }

  return (
    <section className='universe'>
        <div>
            <p>Maquinas</p>
            <hr />

            <section>
              <div>
                <label>Name</label>
                <Input 
                  onChange={(e) => setMachine({ ...machine, Name: e.target.value})} />
              </div>
              <div>
              <label>Constant</label>
                <Input type="number" value={machine.Constant} 
                  onChange={(e) => setMachine({ ...machine, Constant: e.target.value ? Number(e.target.value) : ""})} />
              </div>
              <Button variant="primary" onClick={handleMachine}>Guardar</Button>
            </section>   
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
    </section>
  )
}

export default Universe