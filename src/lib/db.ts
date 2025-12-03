import Database from 'better-sqlite3';
import { join } from 'node:path';

const dbPath = join(process.cwd(), 'data', 'contacts.db');
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    minecraft_username TEXT NOT NULL,
    email TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface ContactMessage {
  id?: number;
  minecraft_username: string;
  email?: string;
  subject: string;
  message: string;
  created_at?: string;
}

export const contactDb = {
  insert: (data: Omit<ContactMessage, 'id' | 'created_at'>) => {
    const stmt = db.prepare(`
      INSERT INTO contacts (minecraft_username, email, subject, message)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(data.minecraft_username, data.email || null, data.subject, data.message);
    return result.lastInsertRowid;
  },

  getAll: () => {
    const stmt = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC');
    return stmt.all() as ContactMessage[];
  },

  getById: (id: number) => {
    const stmt = db.prepare('SELECT * FROM contacts WHERE id = ?');
    return stmt.get(id) as ContactMessage | undefined;
  },

  delete: (id: number) => {
    const stmt = db.prepare('DELETE FROM contacts WHERE id = ?');
    return stmt.run(id);
  }
};

export default db;
