/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { deleteJuegos, getjuego, getJuegos, updateJuegos, createjuego } = require ('../controllers/Juegos');


const juegosRouter = Router();

juegosRouter.get('/', getJuegos);

// userRouter.post('/', validate(registerSchema), createUser);
juegosRouter.post('/',createjuego )

juegosRouter.get('/:id', getjuego);

juegosRouter.patch('/:id', updateJuegos);

juegosRouter.delete('/:id', deleteJuegos);

module.exports = juegosRouter;