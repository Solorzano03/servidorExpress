require("dotenv").config();
const express = require("express");
const app = express();
const DataSource = require("../utils/datasource");

app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.send("api-warp");
});

app.use("/auth", require("../routes/auth"));
app.use("/user", require("../routes/users"));
app.use("/cards", require("../routes/tarjetas"));
app.use("/games", require("../routes/juegos"));  

// Inicializar BD SOLO UNA VEZ
let dbInitialized = false;

async function initDB() {
  if (dbInitialized) return;
  try {
    await DataSource.AppDataSource.initialize();
    console.log("Base de datos conectada");
    dbInitialized = true;
  } catch (err) {
    console.error("Error al conectar BD:", err);
  }
}

// Handler serverless para Vercel
module.exports = async (req, res) => {
  await initDB();   // 👈 aseguramos la conexión aquí
  return app(req, res);
};
