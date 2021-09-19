import express from 'express'

import { authRouter } from './auth/index';
import { booksRouter } from './books/index';

const router = express.Router();

router.use('/auth', authRouter)
router.use('/books', booksRouter)

export { router as routes }

