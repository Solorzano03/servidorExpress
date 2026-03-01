const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "tarjetas",
  tableName: "tarjetasconcept",
  columns: {
    id_tarjetas: {
      primary: true,
      type: "int",
      generated: true,
    },
    nombreTarjeta: { type: "varchar", length: 300 },
    descripcion: { type: "varchar", length: 300 },
    categoria: { type: "varchar", length: 100 },
    urlSrpite: { type: "varchar", length: 255 },
  },
  relations: {
    // NUEVA RELACIÓN: Muchas tarjetas pertenecen a un juego
    juego: {
      target: "games",
      type: "many-to-one",
      inverseSide: "tarjetas",
      joinColumn: { name: "id_juego" }, // Crea la FK id_juego en la tabla tarjetasconcept
      onDelete: "CASCADE",
    },
  },
});