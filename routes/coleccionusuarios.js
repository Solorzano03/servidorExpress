/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { deletecoleccion, getcoleccion, getColeccion, updateColeccion } = require('../controllers/coleccionUsuarios');
const { auth } = require('../middleware/verifyToken');

const coleccionRouter = Router();

coleccionRouter.get('/', getColeccion);

// userRouter.post('/', validate(registerSchema), createUser);

coleccionRouter.get('/:id', auth, getcoleccion);

coleccionRouter.put('/:id', auth, updateColeccion);

coleccionRouter.delete('/:id', deletecoleccion);

module.exports = coleccionRouter;
