const { AppDataSource } = require('../utils/datasource');
const  tarjetas  = require('../Entity/tarjetas');

const repository = AppDataSource.getRepository(tarjetas);

const createtarjetas = async (req, res) => {
  try {
    const newtarjeta = await repository.create(req.body)
    const tarjet = await repository.save(newtarjeta)
    
    return res.status(201).json({ status: 'ok', data: tarjet })
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

const getColecciontar = async (_req, res) => {
  try {
    const dataColecciontar = await repository.find();
    
    return res.status(200).json({ status: 'ok', data: dataColecciontar });
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
    const data = await repository.findOneBy({ id_tarjetas: parseInt(req.params.id) });
    if (data === null) return res.status(404).json({ message: 'No se pudo encontrar la coleccion' });

    const tarje = data.toJSONCRE();
    return res.status(200).json({ status: 'ok', data: tarje });
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
  const data = await repository.findOneBy({ id_tarjetas: parseInt(req.params.id) });
  if (data === null) return res.status(404).json({ message: 'No se pudo encontrar la coleccion' });

  try {
    const saveColecciontar = repository.merge(data, req.body);
    const dataColecciontar = await repository.save(saveColecciontar);
   

    return res.status(200).json({ status: 'ok', data: dataColecciontar });
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
    const data = await repository.delete({  id_tarjetas: parseInt(req.params.id) });

    if (data.affected === 1) return res.status(200).json({ message: 'La coleccion se elimino correctamente' });

    return res.status(404).json({ message: 'La coleccion que intenta eliminar no existe' });
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
  createtarjetas,
  getColecciontar,
  getcolecciontar,
  updateColecciontar,
  deletecolecciontar
};
