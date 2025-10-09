/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { deleteUser, getUser, getUsers, updateUser } = require('../controllers/Users');
const { auth } = require('../middleware/verifyToken');

const userRouter = Router();

userRouter.get('/', getUsers);

// userRouter.post('/', validate(registerSchema), createUser);

userRouter.get('/:id', auth, getUser);

userRouter.put('/:id', auth, updateUser);

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
