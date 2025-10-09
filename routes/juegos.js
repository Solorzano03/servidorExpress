/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { deleteJuegos, getjuego, getJuegos, updateJuegos } = require ('../controllers/juegos');
const { auth } = require('../middleware/verifyToken');

const juegosRouter = Router();

juegosRouter.get('/', getJuegos);

// userRouter.post('/', validate(registerSchema), createUser);

juegosRouter.get('/:id', auth, getjuego);

juegosRouter.put('/:id', auth, updateJuegos);

juegosRouter.delete('/:id', deleteJuegos);

module.exports = juegosRouter;