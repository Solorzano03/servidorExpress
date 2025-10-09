/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { deletecolecciontar, getcolecciontar, getColecciontar, updateColecciontar } = require('../controllers/tarjetasconceptos');
const { auth } = require('../middleware/verifyToken');
const { updateColeccion } = require('../controllers/coleccionUsuarios');

const tarjetRouter = Router();

tarjetRouter.get('/', getColecciontar);

// userRouter.post('/', validate(registerSchema), createUser);

tarjetRouter.get('/:id', auth, getcolecciontar);

tarjetRouter.put('/:id', auth, updateColecciontar);

tarjetRouter.delete('/:id', deletecolecciontar);

module.exports = tarjetRouter;
