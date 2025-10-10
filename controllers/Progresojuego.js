const { AppDataSource } = require('../utils/datasource');
const { progresojuego }= require ('../Entity/Progresojuego')


const repository = AppDataSource.getRepository(progresojuego);

const getprojuegos = async (_req, res) => {
  try {
    const dataprojuego = await repository.find();
    const progresojuego = dataprojuego.map(projuego => projuego.toJSON());
    return res.status(200).json({ status: 'ok', data: progresojuego  });
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

const getProjuego= async (req, res) => {
  try {
    const data = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

    const projuego = data.toJSONCRE();
    return res.status(302).json({ status: 'ok', data: projuego });
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

const updateProjuego = async (req, res) => {
  const data = await repository.findOneBy({ id: parseInt(req.params.id) });
  if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

  try {
    const saveprojuego = repository.merge(data, req.body);
    const dataprojuego = await repository.save(saveprojuego);
    const nivel = dataprojuego.toJSONUP();

    return res.status(302).json({ status: 'ok', data: projuego });
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

const deleteprojuego = async (req, res) => {
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
  getProjuego,
  getprojuegos,
  updateProjuego,
  deleteprojuego
};
