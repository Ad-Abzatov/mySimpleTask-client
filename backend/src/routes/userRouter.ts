import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import UserController from '../controllers/UserController';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/auth', authMiddleware, userController.check);
userRouter.post('/testhead', userController.header);

export default userRouter
