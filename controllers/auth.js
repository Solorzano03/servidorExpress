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


const changePassword = async (req, res) => {
  const data = await repository.findOneBy({ id_usuarios: parseInt(req.params.id) });
  if (data === null) return res.status(404).json({ message: 'No se pudo encontrar el estado' });

  const { password, newPassword } = req.body;

  const isPasswordValid = await bcrypt.compare(password, data.password);
  if (!isPasswordValid) {
    return res.status(401).json({ status: 'fail', message: 'La contraseña es incorrecta', path: 'password' });
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newPassword, salt)

  try {
    const saveUser = repository.merge(data, {
      password: hashedPassword
    });
    await repository.save(saveUser);

    return res.status(200).json({ status: 'ok', message: "La contraseña fue actualizada con éxito" });
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
  signIn,
  changePassword
};
