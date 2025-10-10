const projuegoRouter = Router();

projuegoRouter.get('/', getprojuegos);

// userRouter.post('/', validate(registerSchema), createUser);

projuegoRouter.get('/:id', auth, getProjuego);

projuegoRouter.put('/:id', auth, updateProjuego);

projuegoRouter.delete('/:id', deleteprojuego);

module.exports = projuegoRouter;
