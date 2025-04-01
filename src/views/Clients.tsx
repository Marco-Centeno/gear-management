import { useEffect, useState } from 'react';
import Input from '../components/ui-components/ui/input';
import { iClients } from '../utils/interface';
import { addClient, getClients, deleteClient, setupDatabase } from '../database/context';
import Button from '../components/ui-components/ui/button';
import Alert from '../components/ui-components/ui/alert';
import { Today } from '../utils/Extention';
import { Plus } from 'lucide-react';
import "./Clients.css";
import "../components/universe/MachineSection.css"


function ClientManager() {
  useEffect(() => {
    setupDatabase().then(() => loadClients());
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [clientList, setClientList] = useState<iClients[]>([]);
  const [client, setClient] = useState<Omit<iClients, "ClientPK">>({ 
    Name: "",
    Description: "",
    ContactRef: "",
    Direction: "",
    UPDATED: Today,
    ACTIVE: 1
  });

  const handleClient = async () => {
    if (
      client.Name.trim() === "" || 
      client.Description.trim() === "" || 
      client.ContactRef.trim() === "" || 
      client.Direction.trim() === ""
    ) {
      alert("Por favor, ingrese todos los valores.");
      return;
    }

    await addClient(
      client.Name, 
      client.Description, 
      client.ContactRef, 
      client.Direction, 
      client.UPDATED, 
      client.ACTIVE
    );

    loadClients(); // Recargar la lista de clientes
    setClient({ Name: "", Description: "", ContactRef: "", Direction: "", UPDATED: Today, ACTIVE: 1 });
    setShowForm(false);
  };

  async function loadClients() {
    const data = await getClients();
    setClientList(data as iClients[]);
  }

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      await deleteClient(id);
      loadClients(); // Recargar lista después de eliminar
    }
  };

  return (
    <section className="client-manager">
      <div className="section-header">
        <h2>Clientes</h2>
        <button className="add-button" onClick={() => setShowForm(true)}>
          <Plus size={20} /> Agregar Cliente
        </button>
      </div>
      <hr />

      {showForm && (
        <div className="form-container">
          <form className="machine-form">
            <h3>Nuevo Cliente</h3>
            <div className="form-group">
              <label>Nombre</label>
              <Input 
                value={client.Name}
                onChange={(e) => setClient({ ...client, Name: e.target.value })} 
              />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <Input 
                value={client.Description}
                onChange={(e) => setClient({ ...client, Description: e.target.value })} 
              />
            </div>
            <div className="form-group">
              <label>Contacto</label>
              <Input 
                value={client.ContactRef}
                onChange={(e) => setClient({ ...client, ContactRef: e.target.value })} 
              />
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <Input 
                value={client.Direction}
                onChange={(e) => setClient({ ...client, Direction: e.target.value })} 
              />
            </div>
            <div className="form-actions">
              <Button variant="danger" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button variant="primary" onClick={handleClient}>Guardar</Button>
            </div>
          </form>
        </div>
      )}

      {/* Historial de clientes */}
      <section>
        {clientList.map((client) => (
          <Alert variant="info" key={client.ClientPK}>
            {client.Name} - {client.Description} - {client.ContactRef} - {client.Direction} - {client.UPDATED}
            <Button variant="danger" onClick={() => handleDelete(client.ClientPK)}>🗑️</Button>
          </Alert>
        ))}
      </section>        
    </section>
  );
}

export default ClientManager;
