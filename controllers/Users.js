
const { AppDataSource } = require('../utils/datasource');
const Users  = require('../Entity/users');
const repository = AppDataSource.getRepository(Users);


const createUser = async (req, res) => {
  try {
    const newUser = await repository.create(req.body)
    const usuario = await repository.save(newUser)
    
    return res.status(201).json({ status: 'ok', data: usuario })
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



/*const createUser = async (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    const user = new User();

    user.firstname = firstname;
    user.lastname = lastname;

    await user.save(); // Si tu entidad extiende BaseEntity

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};*/


const getUsers = async (_req, res) => {
  try {
    const data = await repository.find();
    return res.status(200).json({ status: 'ok', data});
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
    const data = await repository.findOneBy({ id_usuarios: parseInt(req.params.id) });
    if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

    return res.status(302).json({ status: 'ok', data });
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
  const data = await repository.findOneBy({ id_usuarios: parseInt(req.params.id) });
  if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

  try {
    const saveUser = repository.merge(data, req.body);
    const dataUser = await repository.save(saveUser);
    

    return res.status(302).json({ status: 'ok', data: dataUser });
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
    const data = await repository.delete({ id_usuarios: parseInt(req.params.id) });

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
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
