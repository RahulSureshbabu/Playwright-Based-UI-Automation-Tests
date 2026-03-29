const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "ui_playwright_tests",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

async function clearGreetings() {
  await pool.query("DELETE FROM greetings");
}

async function getLatestGreeting() {
  const [rows] = await pool.query(
    "SELECT id, name_input, resolved_name, greeting_text FROM greetings ORDER BY id DESC LIMIT 1"
  );
  return rows[0] || null;
}

async function closePool() {
  await pool.end();
}

module.exports = {
  clearGreetings,
  getLatestGreeting,
  closePool
};
