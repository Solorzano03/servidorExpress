require ('dotenv').config()
require("reflect-metadata");
const { DataSource }= require ('typeorm')

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  logging:true,
  synchronize: true,
  entities: [require ('../Entity/users'), require ('../Entity/juegos'), require('../Entity/niveles'), require('../Entity/coleccionusuarios'), require('../Entity/tarjetas'), require ('../Entity/Progresojuego')],
});
module.exports = { AppDataSource };