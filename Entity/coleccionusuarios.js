const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Colecciones", // Will use table name `category` as default behaviour.
    tableName: "coleccion", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        fechaObtenida: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP" // Postgres guarda la hora de creación automáticamente
        }

    },
})