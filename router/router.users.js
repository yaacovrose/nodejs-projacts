import express from 'express';
import { usersController } from '../controller/controller.users.js';
import middleWare from '../middleware.js';

const usersRouter = express.Router();


usersRouter.get('/',middleWare.allUsersValid, middleWare.isAdmin, usersController.getAllUsers);
usersRouter.get('/user/:id',middleWare.userByIdValid ,middleWare.adminOrCreator, usersController.getUserById);
usersRouter.get('/login', middleWare.loginValid, usersController.login);

usersRouter.patch('/:id' ,middleWare.updateValid, middleWare.isCreator, usersController.updateUser);

usersRouter.post('/', middleWare.addUserValid, usersController.addUser);

usersRouter.delete('/:id',middleWare.deleteValid , middleWare.adminOrCreator, usersController.deleteUser)

export default usersRouter;
