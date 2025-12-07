require("dotenv").config();
const express = require("express");
const app = express();
const DataSource = require("../utils/datasource");

app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.use("/api/auth", require("../routes/auth"));
app.use("/api/user", require("../routes/users"));
app.use("/api/cards", require("../routes/tarjetas"));
try {
  const juegos = require("../routes/juegos");
  console.log("RUTA CARGADA OK");
  app.use("/api/games", juegos);  
} catch (err) {
  console.error("ERROR AL CARGAR RUTA /games:", err);
}

app.use("/api/coleccion", require("../routes/coleccionusuarios"));

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
