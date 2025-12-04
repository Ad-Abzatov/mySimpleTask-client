import express from 'express';
import userRouter from './userRouter';
import PostRouter from './PostRouter';

const router = express.Router();

router.use('/user', userRouter);
router.use('/post', PostRouter);

export default router
