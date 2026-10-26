import mysql from 'mysql2/promise';
import { schemaSql } from './schema.js';
import { seedData } from './seeds.js';

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'zhims_db',
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
};

export const pool = mysql.createPool(DB_CONFIG);

export async function initDatabase() {
  try {
    console.log(`[Z-HIMS DB] Connecting to XAMPP MySQL at ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}...`);
    const connection = await pool.getConnection();
    console.log('[Z-HIMS DB] Connected to XAMPP MySQL successfully!');
    
    // Execute schema statements
    console.log('[Z-HIMS DB] Initializing tables...');
    await connection.query(schemaSql);
    connection.release();

    // Run seeds
    await seedData(pool);
    console.log('[Z-HIMS DB] Database ready and operational.');
  } catch (error) {
    console.error('[Z-HIMS DB Error] Failed to initialize XAMPP database:', error);
    throw error;
  }
}
