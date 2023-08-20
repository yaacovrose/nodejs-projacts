import express from 'express';
import { usersController } from '../controller/controller.users.js';

const usersRouter = express.Router();


usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/user/:id', usersController.getUserById);
usersRouter.get('/login', usersController.login);

usersRouter.post('/', usersController.addUser);

usersRouter.delete('/:id', usersController.deleteUser)

export default usersRouter
