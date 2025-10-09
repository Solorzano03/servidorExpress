const { AppDataSource } = require('../utils/datasource');
const { niveles }= require ('../Entity/niveles')


const repository = AppDataSource.getRepository(niveles);

const getniveles = async (_req, res) => {
  try {
    const dataniveles  = await repository.find();
    const niveles = dataniveles.map(nivel => nivel.toJSON());
    return res.status(200).json({ status: 'ok', data: niveles  });
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

const getNiveles= async (req, res) => {
  try {
    const data = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

    const nivel = data.toJSONCRE();
    return res.status(302).json({ status: 'ok', data: nivel });
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

const updateNiveles = async (req, res) => {
  const data = await repository.findOneBy({ id: parseInt(req.params.id) });
  if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

  try {
    const saveniveles = repository.merge(data, req.body);
    const dataniveles = await repository.save(saveniveles);
    const nivel = dataniveles.toJSONUP();

    return res.status(302).json({ status: 'ok', data: nivel });
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

const deleteniveles = async (req, res) => {
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
  getNiveles,
  getniveles,
  updateNiveles,
  deleteniveles
};
