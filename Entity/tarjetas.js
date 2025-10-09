const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "tarjetas", // Will use table name `category` as default behaviour.
    tableName: "tarjetasconcept", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        nombreTarjeta: {
            type: "varchar",
            length: 300
        },
        descripcion: {
            type: "varchar",
            length: 300

        }

    },
})