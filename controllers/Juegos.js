const { AppDataSource } = require('../utils/datasource');
const { Juegos }= require ('../Entity/juegos')


const repository = AppDataSource.getRepository(Juegos);

const getJuegos = async (_req, res) => {
  try {
    const dataJuegos  = await repository.find();
    const juegos = dataJuegos.map(juego => juego.toJSON());
    return res.status(200).json({ status: 'ok', data: juegos  });
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
    const data = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

    const juego = data.toJSONCRE();
    return res.status(302).json({ status: 'ok', data: juego });
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
  const data = await repository.findOneBy({ id: parseInt(req.params.id) });
  if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

  try {
    const saveJuegos = repository.merge(data, req.body);
    const dataJuegos = await repository.save(saveJuegos);
    const juego = dataJuegos.toJSONUP();

    return res.status(302).json({ status: 'ok', data: juego });
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
    const data = await repository.delete({ id: parseInt(req.params.id) });

    if (data.affected === 1) return res.status(200).json({ message: 'El usuario se eliminó con exito' });

    return res.status(404).json({ message: 'El usuario que intenta eliminar no existe' });
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
  getJuegos,
  getjuego,
  updateJuegos,
  deleteJuegos
};
