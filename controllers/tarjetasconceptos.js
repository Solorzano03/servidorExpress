const { AppDataSource } = require('../utils/datasource');
const { ILike } = require('typeorm');
const Tarjetas = require('../Entity/tarjetas');
const Juegos = require('../Entity/juegos')

const repository = AppDataSource.getRepository(Tarjetas);

const juegoRepository = AppDataSource.getRepository(Juegos);

const createtarjetas = async (req, res) => {
  try {
    const { juego, nombreTarjeta, descripcion, categoria, urlSrpite } = req.body;

    // 🔥 Buscar el juego con su usuario
    const juegoExistente = await juegoRepository.findOne({
      where: { id_juegos: juego },
      relations: ['usuario']
    });

    if (!juegoExistente) {
      return res.status(404).json({
        status: 'fail',
        message: 'Juego no encontrado'
      });
    }

    // 🔥 Verificar si ya existe la tarjeta para ese usuario
    const tarjetaExistente = await repository.findOne({
      where: {
        nombreTarjeta,
        juego: {
          usuario: {
            id_usuarios: juegoExistente.usuario.id_usuarios
          }
        }
      },
      relations: ['juego', 'juego.usuario']
    });

    if (tarjetaExistente) {
      return res.status(200).json({
        status: 'exists',
        message: 'La tarjeta ya fue otorgada anteriormente'
      });
    }

    // 🔥 Crear nueva tarjeta
    const nuevaTarjeta = repository.create({
      nombreTarjeta,
      descripcion,
      categoria,
      urlSrpite,
      juego: { id_juegos: juego }
    });

    const tarjet = await repository.save(nuevaTarjeta);

    return res.status(201).json({
      status: 'ok',
      data: tarjet
    });

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

const getColecciontar = async (req, res) => { // Asegúrate de usar 'req' (no '_req') si vas a usar req.query
  try {
    const { user, type, game } = req.query;
   
    if (game) {
      const dataColecciontar = await repository.find({
        where: {
          juego: {
            id_juegos: game
          },
        }
      });

      return res.status(200).json({
        status: 'ok',
        count: dataColecciontar.length,
        data: dataColecciontar
      });
    }

    // Configuramos las relaciones y los filtros
    const dataColecciontar = await repository.find({
      relations: {
        juego: true // Cargamos la relación con el juego para poder filtrar
      },
      where: {
        juego: {
          // Filtramos por el ID del usuario dentro del objeto juego
          usuario: user ? { id_usuarios: parseInt(user) } : {},
          // Filtramos por el tipo de juego
          tipo: type ? ILike(`${type}%`) : undefined
        },
      }
    });

    console.log(data)

    return res.status(200).json({
      status: 'ok',
      count: dataColecciontar.length,
      data: dataColecciontar
    });

  } catch (er) {
    console.error("Error en getColecciontar:", er);
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

    return res.status(200).json({ status: 'ok', data });
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
    const data = await repository.delete({ id_tarjetas: parseInt(req.params.id) });

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
