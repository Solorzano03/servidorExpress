/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { deleteNiveles, getniveles, getNiveles, updateNiveles } = require ('../controllers/niveles');
const { auth } = require('../middleware/verifyToken');

const nivelRouter = Router();

nivelRouter.get('/', getNiveles);

// userRouter.post('/', validate(registerSchema), createUser);

nivelRouter.get('/:id', auth, getniveles);

nivelRouter.put('/:id', auth, updateNiveles);

nivelRouter.delete('/:id', deleteNiveles);

module.exports = nivelRouter;
