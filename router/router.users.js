import express from 'express';
import { usersController } from '../controller/controller.users.js';
import middleWare from '../middleware.js';

const usersRouter = express.Router();


usersRouter.get('/',middleWare.isAdmin, usersController.getAllUsers);
usersRouter.get('/user/:id',middleWare.adminOrCreator, usersController.getUserById);
usersRouter.get('/login', usersController.login);

usersRouter.patch('/:id', usersController.updateUser);


usersRouter.post('/', usersController.addUser);

usersRouter.delete('/:id',middleWare.adminOrCreator, usersController.deleteUser)

export default usersRouter;
