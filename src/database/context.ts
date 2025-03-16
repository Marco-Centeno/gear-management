import Database from '@tauri-apps/plugin-sql';

// Cargar la base de datos SQLite
const db = await Database.load('sqlite:test.db');

/**
 * Crea la tabla `users` si no existe.
 */
export async function setupDatabase() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
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
