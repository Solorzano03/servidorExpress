const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
  name: "Users", // Will use table name `category` as default behaviour.
  tableName: "usuarios", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 300
    },
    lastname: {
      type: "varchar",
      length: 300
    },
    email: {
      type: "varchar",
      length: 500,
      unique: true
    },
    password: {
      type: "varchar",
      length: 300
    },
  },
})