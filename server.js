const path = require("path");
const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const port = Number(process.env.APP_PORT || 4173);

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "ui_playwright_tests",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS greetings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name_input VARCHAR(255) NOT NULL,
      resolved_name VARCHAR(255) NOT NULL,
      greeting_text VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function waitForDatabase(maxAttempts = 20, delayMs = 1500) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await pool.query("SELECT 1");
      return;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw lastError || new Error("Database did not become ready in time");
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "demo-app")));

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok", db: "connected" });
  } catch (error) {
    res.status(500).json({ status: "error", db: "disconnected", message: error.message });
  }
});

app.post("/api/greet", async (req, res) => {
  const nameInput = (req.body?.name || "").toString().trim();
  const resolvedName = nameInput || "Guest";
  const greeting = `Hello, ${resolvedName}!`;

  try {
    const [result] = await pool.query(
      "INSERT INTO greetings (name_input, resolved_name, greeting_text) VALUES (?, ?, ?)",
      [nameInput, resolvedName, greeting]
    );

    res.status(201).json({
      id: result.insertId,
      greeting,
      resolvedName
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to save greeting", detail: error.message });
  }
});

app.get("/api/greetings/latest", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name_input, resolved_name, greeting_text, created_at FROM greetings ORDER BY id DESC LIMIT 1"
    );

    if (!rows.length) {
      return res.status(404).json({ message: "No greetings found" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch latest greeting", detail: error.message });
  }
});

async function startServer() {
  try {
    await waitForDatabase();
    await ensureSchema();
    app.listen(port, () => {
      console.log(`UI + API server running on http://127.0.0.1:${port}`);
    });
  } catch (error) {
    console.error("Could not start server:", error.message);
    process.exit(1);
  }
}

startServer();
