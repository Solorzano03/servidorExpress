const { Router } = require('express');
const { deleteUser, getUser, getUsers, updateUser, createUser} = require('../controllers/Users');


const userRouter = Router();

userRouter.get('/', getUsers);

// userRouter.post('/', validate(registerSchema), createUser);
userRouter.post('/', createUser);

userRouter.get('/:id', getUser);

userRouter.patch('/:id',  updateUser);

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;