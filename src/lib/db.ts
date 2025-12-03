import Database from 'better-sqlite3';
import { join } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';

export interface ContactMessage {
  id?: number;
  minecraft_username: string;
  email?: string;
  subject: string;
  message: string;
  created_at?: string;
}

let db: Database.Database | null = null;

function getDb() {
  if (db) return db;

  // Ensure data directory exists
  const dataDir = join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = join(dataDir, 'contacts.db');
  db = new Database(dbPath);

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

  return db;
}

export const contactDb = {
  insert: (data: Omit<ContactMessage, 'id' | 'created_at'>) => {
    const database = getDb();
    const stmt = database.prepare(`
      INSERT INTO contacts (minecraft_username, email, subject, message)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(data.minecraft_username, data.email || null, data.subject, data.message);
    return result.lastInsertRowid;
  },

  getAll: () => {
    const database = getDb();
    const stmt = database.prepare('SELECT * FROM contacts ORDER BY created_at DESC');
    return stmt.all() as ContactMessage[];
  },

  getById: (id: number) => {
    const database = getDb();
    const stmt = database.prepare('SELECT * FROM contacts WHERE id = ?');
    return stmt.get(id) as ContactMessage | undefined;
  },

  delete: (id: number) => {
    const database = getDb();
    const stmt = database.prepare('DELETE FROM contacts WHERE id = ?');
    return stmt.run(id);
  }
};

export default getDb;
