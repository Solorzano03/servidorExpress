require('dotenv').config()
require("reflect-metadata");
const { DataSource } = require('typeorm')

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  logging: false,
  synchronize: false,
  entities: [
    require('../Entity/users'),
    require('../Entity/juegos'),
   
    require('../Entity/coleccionusuarios'),
    require('../Entity/tarjetas'),
    ],
  //dropSchema: true, para eliminar esquema total cuando realice cambios en la api 
});
module.exports = { AppDataSource };
