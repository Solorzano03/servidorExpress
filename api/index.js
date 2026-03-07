require("dotenv").config();
const express = require("express");
const app = express();
const DataSource = require("../utils/datasource");

app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static("public"));

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
