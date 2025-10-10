const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
  name: "dificullty", // Will use table name `category` as default behaviour.
  tableName: "niveles", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    id_nivel: {
      primary: true,
      type: "int",
      generated: true,
    },
    niveldedificultad: {
      type: "varchar",
      length: 300
    },
    descripcion: {
      type: "varchar",
      length: 300
    },
    puntos_min: {
      type: "varchar",
      length: 500,
      unique: true
    },
    puntos_max: {
      type: "varchar",
      length: 300
    },
  },
  relations: {
    juegos: {
      target: "juegos",
      type: "one-to-many",
      inverseSide: "nivel",
      cascade: true,
    },
  },
})



