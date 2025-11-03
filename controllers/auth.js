const { AppDataSource } = require('../utils/datasource');
const Users  = require('../Entity/users');
const repository = AppDataSource.getRepository(Users);
const bcrypt = require('bcrypt');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await repository.findOneBy({ email });
    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'El usuario no fue encontrado', path: 'email' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: 'fail', message: 'La contraseña es incorrecta', path: 'password' });
    }

    const { password: ps, ...rest } = user;

    return res.status(200).json({ status: 'ok', message: 'Inicio de sesión exitoso', user: rest });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      errors: {
        message: 'Ha ocurrido un error interno en el servidor'
      }
    });
  }
}

module.exports = {
  signIn
};
