const express = require("express");
const DataSource = require("./utils/datasource");
const app = express();
const port = 3000;
const usuarios = require("./routes/users");
const tarjetas = require("./routes/tarjetas");

const juegos = require("./routes/juegos");
const coleccionuser = require("./routes/coleccionusuarios");

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", usuarios);
app.use("/api/cards", tarjetas);
app.use("/api/games", juegos);
app.use("/api/coleccion", coleccionuser);

app.listen(port, () => {
  console.log(`Server on Port http:localhost:${port}`);
});
DataSource.AppDataSource.initialize().then(() =>
  console.log("base de datos conectada")
);
