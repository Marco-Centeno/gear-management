import { useEffect, useState } from "react";
import { setupDatabase, getMachines, addMachine, deleteMachine } from "../../database/context";
import Alert from "../ui-components/ui/alert";
import Input from "../ui-components/ui/input";
import Button from "../ui-components/ui/button";
import Card from "../ui-components/ui/card";
import { IMachine } from "../../utils/interface";

export default function MachineList() {
  const [machines, setMachines] = useState<IMachine[]>([]);
  const [name, setName] = useState("");
  const [constant, setConstant] = useState("");
  const [active, setActive] = useState(true);

  // Cargar la base de datos y obtener máquinas al inicio
  useEffect(() => {
    setupDatabase().then(() => loadMachines());
  }, []);

  async function loadMachines() {
    const data = await getMachines();
    setMachines(data as IMachine[]);
  }

  async function handleAddMachine() {
    if (name && constant) {
      const updatedAt = new Date().toISOString(); // Fecha en formato ISO (YYYY-MM-DDTHH:MM:SS.sssZ)
      const activeValue = active ? 1 : 0; // Convierte booleano a número
  
      await addMachine(name, parseFloat(constant), updatedAt, activeValue);
      loadMachines();
      setName("");
      setConstant("");
      setActive(true);
    }
  }

  async function handleDeleteMachine(id: number) {
    await deleteMachine(id);
    loadMachines();
  }

  return (
    <div>
      <Card title="Agregar Máquina" description="Llena el formulario para agregar una máquina">
        <Input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Constante"
          value={constant}
          onChange={(e) => setConstant(e.target.value)}
        />
        <Button variant="primary" onClick={handleAddMachine}>Agregar</Button>
      </Card>
      <br />
      <hr />
      <br />
      <Alert variant="primary">
        <h2>Máquinas</h2>
      </Alert>
      <ul>
      <ul>
      {machines.map((machine) => (
        <Card key={machine.MachinePK}>
          <strong>{machine.Name}</strong> - Constante: {machine.Constant}
          <Button variant="default" onClick={() => handleDeleteMachine(machine.MachinePK)}>🗑️</Button>  {/* Botón de eliminar */}
        </Card>
      ))}
    </ul>

</ul>
 
    </div>
  );
}
