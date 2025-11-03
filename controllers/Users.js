
const { AppDataSource } = require('../utils/datasource');
const Users  = require('../Entity/users');
const repository = AppDataSource.getRepository(Users);
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body

    const userExist = await repository.findOneBy({ email: rest.email })
    if (userExist) {
      return res.status(400).json({
        status: 'fail',
        message: 'El correo electrónico ya está en uso',
        path: 'email'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = repository.create({ password: hashedPassword, ...rest })
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

const getUsers = async (_req, res) => {
  try {
    const data = await repository.find();
    const formatter = data.map(({ password, ...rest }) => rest);
    return res.status(200).json({ status: 'ok', data: formatter });
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

    const { password, ...rest } = data;

    return res.status(302).json({ status: 'ok', data: rest });
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

  const { password, ...rest } = req.body;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
  }

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
