const { AppDataSource } = require('../utils/datasource');
const { coleccion } = require('../Entity/coleccionusuarios');

const repository = AppDataSource.getRepository(coleccion);

const getColeccion = async (_req, res) => {
  try {
    const dataColeccion = await repository.find();
    const coleccion = dataColeccion.map(tarj => tarj.toJSON());
    return res.status(200).json({ status: 'ok', data: coleccion });
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

const getcoleccion = async (req, res) => {
  try {
    const data = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

    const tarj = data.toJSONCRE();
    return res.status(302).json({ status: 'ok', data: tarj });
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

const updateColeccion = async (req, res) => {
  const data = await repository.findOneBy({ id: parseInt(req.params.id) });
  if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

  try {
    const saveColeccion = repository.merge(data, req.body);
    const dataColeccion = await repository.save(saveColeccion);
    const tarj = dataColeccion.toJSONUP();

    return res.status(302).json({ status: 'ok', data: tarj });
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

const deletecoleccion = async (req, res) => {
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
  getColeccion,
  getcoleccion,
  updateColeccion,
  deletecoleccion
};
