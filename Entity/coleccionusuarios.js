const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Colecciones", // Will use table name `category` as default behaviour.
    tableName: "coleccion", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id_coleccion: {
            primary: true,
            type: "int",
            generated: true,
        },
        fechaObtenida: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP" // Postgres guarda la hora de creación automáticamente
        }

    },
    relations: {
        usuario: {
            target: "Users",
            type: "many-to-one",
            joinColumn: { name: "id_usuarios" },
            onDelete: "CASCADE",
        },
        tarjeta: {
            target: "tarjetas",
            type: "many-to-one",
            joinColumn: { name: "id_tarjetas" },
            onDelete: "CASCADE",
        },
    },
});