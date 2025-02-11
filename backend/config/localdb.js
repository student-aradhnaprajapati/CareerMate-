// db.js
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',     // Your PostgreSQL username
  host: 'localhost',         // PostgreSQL is hosted locally
  database: 'SerialBackend', // Name of the database
  password: '123', // Your PostgreSQL password
  port: 5432,                // Default PostgreSQL port
});
const testConnection = async () => {
    try {
      const res = await pool.query('SELECT NOW()');
      console.log('Connection successful:', res.rows[0]);
    } catch (err) {
      console.error('Error connecting to the database:', err);
    }
  };
  testConnection();
export default pool;
