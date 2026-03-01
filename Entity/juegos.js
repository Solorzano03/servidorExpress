const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "games",
  tableName: "juegos",
  columns: {
    id_juegos: {
      primary: true,
      type: "int",
      generated: true,
    },
    titulo: { type: "varchar", length: 300 },
    descripcion: { type: "varchar", length: 300 },
    datecreate: {
      type: "timestamp",
      createDate: true,
      default: () => "CURRENT_TIMESTAMP",
    },
    tipo: { type: "varchar", length: 100 },
    numero_aciertos: { type: "real", nullable: false },
    total_preguntas: { type: "int", nullable: false },
    puntaje: { type: "int", nullable: false },
  },
  relations: {
    usuario: {
      target: "Users",
      type: "many-to-one",
      inverseSide: "juegos", // Apunta a la propiedad en Users
      joinColumn: { name: "id_usuarios" },
      onDelete: "CASCADE",
    },
    // NUEVA RELACIÓN: Un juego tiene muchas tarjetas
    tarjetas: {
      target: "tarjetas",
      type: "one-to-many",
      inverseSide: "juego", // Apunta a la propiedad en tarjetas
      cascade: true,
    },
  },
});