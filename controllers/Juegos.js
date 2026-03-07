const { AppDataSource } = require('../utils/datasource');
const { ILike } = require('typeorm');
const Juegos = require('../Entity/juegos')

const repository = AppDataSource.getRepository(Juegos);

const createjuego = async (req, res) => {
  try {
    const { usuarioId, titulo, tipo, ...data } = req.body;
    console.log("Lo que se envía",req.body)

    // 1. Buscamos de forma más explícita
    let existing = await repository.findOne({
      where: {
        usuario: { id_usuarios: usuarioId },
        tipo: tipo.trim()
      },
      // Cargamos la relación para asegurar que el objeto esté completo
      relations: ["usuario"]
    });

    console.log("Lo que es la consulta", existing)

    if (existing) {
      // 2. Actualizamos
      repository.merge(existing, data); // merge es más seguro que Object.assign en TypeORM
      const updatedGame = await repository.save(existing);

      return res.status(200).json({
        status: "ok",
        message: "Juego actualizado correctamente",
        data: updatedGame,
      });
    } else {
      // 3. Creamos
      const newGame = repository.create({
        usuario: { id_usuarios: usuarioId },
        titulo: titulo.trim(),
        tipo: tipo.trim(),
        ...data,
      });

      const savedGame = await repository.save(newGame);

      return res.status(201).json({
        status: "ok",
        message: "Juego creado correctamente",
        data: savedGame,
      });
    }
  } catch (error) {
    if (error.code === '23505' || error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ status: "fail", message: "El juego ya está siendo procesado" });
    }
    console.log(error);
    return res.status(500).json({
      status: "fail",
      errors: { message: "Ha ocurrido un error interno en el servidor" }
    });
  }
};

const getJuegos = async (req, res) => {
  try {
    const { user, type, search } = req.query;
    let whereClause = {};

    if (user) {
      whereClause.usuario = { id_usuarios: parseInt(user) };
    }

    if (type) {
      whereClause.tipo = ILike(`${type}%`);
    }

    if (search) {
      whereClause.titulo = ILike(`%${search}%`);
    }

    const games = await repository.find({ where: whereClause });

    return res.status(200).json({ status: 'ok', data: games });
  } catch (er) {
    console.error(er);
    return res.status(500).json({
      status: 'fail',
      errors: { message: 'Ha ocurrido un error interno en el servidor' }
    });
  }
};

const getjuego = async (req, res) => {
  try {
    const data = await repository.findOneBy({ id_juegos: parseInt(req.params.id) });
    if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

    return res.status(200).json({ status: 'ok', data });
  } catch (er) {
    console.log(er);
    return res.status(500).json({
      status: 'fail',
      errors: {
        message: 'Ha ocurrido un error interno en el servidor'
      }
    });
  }
};

const updateJuegos = async (req, res) => {
  const game = await repository.findOneBy({ id_juegos: parseInt(req.params.id) });
  if (game === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

  try {
    const { usuarioId, ...data } = req.body;

    const saveJuegos = repository.merge(game, {
      usuario: { id_usuarios: usuarioId },
      ...data
    });
    const dataJuegos = await repository.save(saveJuegos);

    return res.status(200).json({ status: 'ok', data: dataJuegos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      errors: {
        message: 'Ha ocurrido un error interno en el servidor'
      }
    });
  }
};

const deleteJuegos = async (req, res) => {
  try {
    const data = await repository.delete({ id_juegos: parseInt(req.params.id) });

    if (data.affected === 1) return res.status(200).json({ message: 'El juego se eliminó con exito' });

    return res.status(404).json({ message: 'El juego que intenta eliminar no existe' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      errors: {
        message: 'Ha ocurrido un error interno en el servidor'
      }
    });
  }
};

module.exports = {
  createjuego,
  getJuegos,
  getjuego,
  updateJuegos,
  deleteJuegos
};
