const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Progresos", // Will use table name `category` as default behaviour.
    tableName: "Progresojuego", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id_progresojuego: {
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
        juego: {
            target: "games",
            type: "many-to-one",
            joinColumn: { name: "id_juegos" },
            onDelete: "CASCADE",
        },
    },
})