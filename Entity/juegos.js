const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "games", // Will use table name `category` as default behaviour.
    tableName: "juegos", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id_juegos: {
            primary: true,
            type: "int",
            generated: true,
        },
        titulo: {
            type: "varchar",
            length: 300
        },
        descripcion: {
            type: "varchar",
            length: 300
        },
        datecreate: {
            type: "timestamp",
            createDate: true,
            default: () => "CURRENT_TIMESTAMP"
        },
        tipo: {
            type: "varchar",
            length: 100,
        },
    },
    relations: {
        nivel: {
            target: "niveles",
            type: "many-to-one",
            joinColumn: { name: "id_nivel" },
            onDelete: "CASCADE",
        },
        progreso: {
            target: "Progresojuego",
            type: "one-to-many",
            inverseSide: "juegos",
            cascade: true,
        },
    },
})
