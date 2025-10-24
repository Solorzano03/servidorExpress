/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { signIn } = require('../controllers/auth');
const { createUser } = require('../controllers/Users');


const authRouter = Router();

authRouter.post('/sign-in', signIn);
authRouter.post('/sign-up', createUser);

module.exports = authRouter;
