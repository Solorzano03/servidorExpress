const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "games", // Will use table name `category` as default behaviour.
    tableName: "juegos", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
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
    },
})
