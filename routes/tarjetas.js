/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { deletecolecciontar, getcolecciontar, getColecciontar, updateColecciontar , createtarjetas } = require('../controllers/tarjetasconceptos');


const tarjetRouter = Router();

tarjetRouter.get('/', getColecciontar);

// userRouter.post('/', validate(registerSchema), createUser);
tarjetRouter.post('/', createtarjetas);
tarjetRouter.get('/:id',  getcolecciontar);

tarjetRouter.put('/:id', updateColecciontar);

tarjetRouter.delete('/:id', deletecolecciontar);

module.exports = tarjetRouter;
