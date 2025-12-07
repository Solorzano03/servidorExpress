const { AppDataSource } = require('../utils/datasource');
const Users = require('../Entity/users');
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

    const { password: ps, name, lastname, ...rest } = user;
    const fullName = `${name.split(' ')[0]} ${lastname.split(' ')[0]}`;

    return res.status(200).json({ status: 'ok', message: 'Inicio de sesión exitoso', user: { ...rest, name: fullName } });
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

/**
 * Cambiar contraseña
 */
const changePassword = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await repository.findOneBy({ id_usuarios: userId });

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'El usuario no fue encontrado',
        path: 'email'
      });
    }

    const { password, newPassword } = req.body;

    // Verificar contraseña actual
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'fail',
        message: 'La contraseña es incorrecta',
        path: 'password'
      });
    }

    // Generar nuevo hash
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Guardar
    await repository.save(user);

    return res.status(200).json({
      status: 'ok',
      message: 'La contraseña fue actualizada con éxito'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'fail',
      errors: { message: 'Ha ocurrido un error interno en el servidor' }
    });
  }
}


module.exports = {
  signIn,
  changePassword
};
