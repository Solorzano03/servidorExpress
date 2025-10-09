const { AppDataSource } = require('../utils/datasource');
const { Users } = require('../Entity/users');

const repository = AppDataSource.getRepository(Users);

const getUsers = async (_req, res) => {
  try {
    const dataUsers = await repository.find();
    const users = dataUsers.map(user => user.toJSON());
    return res.status(200).json({ status: 'ok', data: users });
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

const getUser = async (req, res) => {
  try {
    const data = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

    const user = data.toJSONCRE();
    return res.status(302).json({ status: 'ok', data: user });
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

const updateUser = async (req, res) => {
  const data = await repository.findOneBy({ id: parseInt(req.params.id) });
  if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

  try {
    const saveUser = repository.merge(data, req.body);
    const dataUser = await repository.save(saveUser);
    const user = dataUser.toJSONUP();

    return res.status(302).json({ status: 'ok', data: user });
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

const deleteUser = async (req, res) => {
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
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
