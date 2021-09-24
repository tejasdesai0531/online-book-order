import express from 'express'

import { getUserRouter } from './getUser';
import { updateUserRouter } from './updateUser';


const router = express.Router();

router.use(getUserRouter)
router.use(updateUserRouter)


export { router as userRouter }

