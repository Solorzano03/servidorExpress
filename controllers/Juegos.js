const { AppDataSource } = require('../utils/datasource');
const  Juegos = require ('../Entity/juegos')

const repository = AppDataSource.getRepository(Juegos);

const createjuego = async (req, res) => {
  try {
    const { usuarioId, ...data } = req.body
    const newjuego = await repository.create({ usuario: { id_usuarios: usuarioId }, ...data })
    const games = await repository.save(newjuego)

    return res.status(201).json({ status: 'ok', data: games })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      errors: {
        message: 'Ha ocurrido un error interno en el servidor'
      }
    })
  }

}

const getJuegos = async (req, res) => {
  try {
    const user = req.query.user;
    let games;
    if (user) {
      games = await repository.find({ where: { usuario: { id_usuarios: parseInt(user) } } });
    } else {
      games = await repository.find();
    }

    return res.status(200).json({ status: 'ok', data: games });
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

const getjuego= async (req, res) => {
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
