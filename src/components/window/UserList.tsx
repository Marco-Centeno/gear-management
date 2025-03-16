import { useEffect, useState } from "react";
import { setupDatabase, getUsers, addUser, deleteUser } from "../../database/context";
import Alert from "../ui-components/ui/alert";
import Input from "../ui-components/ui/input";
import Button from "../ui-components/ui/button";
import Card  from "../ui-components/ui/card";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Cargar la base de datos y obtener usuarios al inicio
  useEffect(() => {
    setupDatabase().then(() => loadUsers());
  }, []);

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data as User[]);
  }

  async function handleAddUser() {
    if (name && email) {
      await addUser(name, email);
      loadUsers();
      setName("");
      setEmail("");
    }
  }

  async function handleDeleteUser(id: number) {
    await deleteUser(id);
    loadUsers();
  }

  return (
    <div>
    <Card title="Agregar Usuario" description="Llena el formulario provar la base de datos">
        <Input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <br />
        <Input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <Button variant="primary" onClick={handleAddUser}>Agregar</Button>
    </Card>
      <br />
      <hr />
      <br />
        <Alert variant="primary">
            <h2>Usuarios</h2>
        </Alert>
      <ul>
        {users.map((user) => (
          <Card key={user.id}>
            {user.name} - {user.email}{" "}
            <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>🗑️</Button>
          </Card>
        ))}
      </ul>      
    </div>
  );
}
