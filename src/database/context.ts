import Database from '@tauri-apps/plugin-sql';

// Cargar la base de datos SQLite
const db = await Database.load('sqlite:test.db');

/**
 * Crea las tablas si no existen.
 */
export async function setupDatabase() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Machine (
      MachinePK INTEGER PRIMARY KEY AUTOINCREMENT,
      Name NVARCHAR(50),
      Constant DOUBLE,
      UPDATED DATETIME NOT NULL,
      ACTIVE BIT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Universe (
      UniversePK INTEGER PRIMARY KEY AUTOINCREMENT,
      GearTooth NVARCHAR(50),
      MachineFK INTEGER,
      ACTIVE BIT NOT NULL,
      FOREIGN KEY (MachineFK) REFERENCES Machine(MachinePK)
    );

    CREATE TABLE IF NOT EXISTS Client (
      ClientPK INTEGER PRIMARY KEY AUTOINCREMENT,
      Name NVARCHAR(50),
      Description NVARCHAR(500),
      ContactRef NVARCHAR(200),
      Direction NVARCHAR(200),
      UPDATED DATETIME NOT NULL,
      ACTIVE BIT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS GearHistory (
      GearHistoryPK INTEGER PRIMARY KEY AUTOINCREMENT,
      MachineFK INTEGER,
      UniverseFK INTEGER,
      ClientFK INTEGER,
      Result DOUBLE,
      GearTooth INTEGER,
      Campo TEXT,
      UPDATED DATETIME NOT NULL,
      ACTIVE BIT NOT NULL,
      FOREIGN KEY (MachineFK) REFERENCES Machine(MachinePK),
      FOREIGN KEY (UniverseFK) REFERENCES Universe(UniversePK),
      FOREIGN KEY (ClientFK) REFERENCES Client(ClientPK)
    );
  `);
}

/**
 * Inserta un nuevo usuario en la base de datos.
 */
export async function addUser(name: string, email: string) {
  await db.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
}

/**
 * Obtiene todos los usuarios de la base de datos.
 */
export async function getUsers() {
  return await db.select('SELECT * FROM users');
}

/**
 * Actualiza un usuario por ID.
 */
export async function updateUser(id: number, newName: string) {
  await db.execute('UPDATE users SET name = ? WHERE id = ?', [newName, id]);
}

/**
 * Elimina un usuario por ID.
 */
export async function deleteUser(id: number) {
  await db.execute('DELETE FROM users WHERE id = ?', [id]);
}

/**                                **\
|* Base de datos para las maquinas. *|
\*                                  */

/**
 * Inserta una nueva maquina en la base de datos.
 */
export async function addMachine(name: string, constant: number, updated: string, active: number) {
  await db.execute('INSERT INTO Machine (Name, Constant, UPDATED, ACTIVE) VALUES (?, ?, ?, ?)', [name, constant, updated, active]);
}
/**
 * Selecciona todas las maquinas de la base de datos.
 */
export async function getMachines() {
  return await db.select('SELECT * FROM Machine');
}
/**
 * Actualiza una maquina por ID.
 */
export async function updateMachine(id: number, name: string, constant: number) {
  await db.execute('UPDATE Machine SET Name = ?, Constant = ? WHERE MachinePK = ?', [name, constant, id]);
}
/**
 * Elimina una maquina por ID.
 */
export async function deleteMachine(id: number) {
  await db.execute('DELETE FROM Machine WHERE MachinePK = ?', [id]);
}

/**                                **\
|* Base de datos para los universos.*|
\*                                  */

/**
 * Agrega un nuevo universo a la base de datos.
 */
export async function addUniverse(gearTooth: string, machineFK: number, active: number) {
  await db.execute('INSERT INTO Universe (GearTooth, MachineFK, ACTIVE) VALUES (?, ?, ?)', [gearTooth, machineFK, active]);
}
/**
 * Selecciona todos los universos de la base de datos.
 */
export async function getUniverses() {
  return await db.select('SELECT * FROM Universe');
}
/**
 * Actualiza un universo por ID.
 */
export async function updateUniverse(id: number, gearTooth: string) {
  await db.execute('UPDATE Universe SET GearTooth = ? WHERE UniversePK = ?', [gearTooth, id]);
}
/**
 * Elimina un universo por ID.
 */
export async function deleteUniverse(id: number) {
  await db.execute('DELETE FROM Universe WHERE UniversePK = ?', [id]);
}

/**                                **\
| * Base de datos para los clientes.*|
\*                                  */

/**
 * Agrega un nuevo cliente a la base de datos.
 */
export async function addClient(name: string, description: string, contactRef: string, direction: string, updated: string, active: number) {
  await db.execute('INSERT INTO Client (Name, Description, ContactRef, Direction, UPDATED, ACTIVE) VALUES (?, ?, ?, ?, ?, ?)', [name, description, contactRef, direction, updated, active]);
}
/**
 * Selecciona todos los clientes de la base de datos.
 */
export async function getClients() {
  return await db.select('SELECT * FROM Client');
}
/**
 * Actualiza un cliente por ID.
 */
export async function updateClient(id: number, name: string, description: string, contactRef: string, direction: string) {
  await db.execute('UPDATE Client SET Name = ?, Description = ?, ContactRef = ?, Direction = ? WHERE ClientPK = ?', [name, description, contactRef, direction, id]);
}
/**
 * Elimina un cliente por ID.
 */
export async function deleteClient(id: number) {
  await db.execute('DELETE FROM Client WHERE ClientPK = ?', [id]);
}

/**                                **\
| * Base de datos para el historial.*|
\*                                  */

/**
 * Registra un nuevo historial de combinaciones en la base de datos.
 */
export async function addGearHistory(machineFK: number, universeFK: number, clientFK: number, result: number, gearTooth: number, updated: string, active: number) {
  await db.execute('INSERT INTO GearHistory (MachineFK, UniverseFK, ClientFK, Result, GearTooth, UPDATED, ACTIVE) VALUES (?, ?, ?, ?, ?, ?, ?)', [machineFK, universeFK, clientFK, result, gearTooth, updated, active]);
}
/**
 * Selecciona todos los historiales de combinaciones de la base de datos.
 */
export async function getGearHistories() {
  return await db.select('SELECT * FROM GearHistory');
}
/**
 * Elimina historial por ID.
 */
export async function deleteGearHistory(id: number) {
  await db.execute('DELETE FROM GearHistory WHERE GearHistoryPK = ?', [id]);
}
