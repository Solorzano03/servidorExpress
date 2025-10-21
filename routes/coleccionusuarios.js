/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { deletecoleccion, getcoleccion, getColeccion, updateColeccion , createcoleccion} = require('../controllers/coleccionUsuarios');


const coleccionRouter = Router();

coleccionRouter.get('/', getColeccion);

// userRouter.post('/', validate(registerSchema), createUser);

coleccionRouter.post('/',createcoleccion);

coleccionRouter.get('/:id', getcoleccion);

coleccionRouter.put('/:id', updateColeccion);

coleccionRouter.delete('/:id', deletecoleccion);

module.exports = coleccionRouter;
