const { AppDataSource } = require('../utils/datasource');
const { tarjetas } = require('../Entity/tarjetas');

const repository = AppDataSource.getRepository(tarjetas);

const getColecciontar = async (_req, res) => {
  try {
    const dataColecciontar = await repository.find();
    const tarjetas = dataColecciontar.map(tarje => tarje.toJSON());
    return res.status(200).json({ status: 'ok', data: tarjetas });
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

const getcolecciontar = async (req, res) => {
  try {
    const data = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

    const tarje = data.toJSONCRE();
    return res.status(302).json({ status: 'ok', data: tarje });
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

const updateColecciontar = async (req, res) => {
  const data = await repository.findOneBy({ id: parseInt(req.params.id) });
  if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

  try {
    const saveColecciontar = repository.merge(data, req.body);
    const dataColecciontar = await repository.save(saveColecciontar);
    const tarje = dataColecciontar.toJSONUP();

    return res.status(302).json({ status: 'ok', data: tarje });
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

const deletecolecciontar = async (req, res) => {
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
  getColecciontar,
  getcolecciontar,
  updateColecciontar,
  deletecolecciontar
};
