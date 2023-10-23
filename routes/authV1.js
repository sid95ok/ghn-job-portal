import express from 'express';
import * as authV1 from '../controllers/authV1.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

// Routes
router.post('/login', authV1.login);
router.post('/signup', authV1.signup);
router.get('/getCurrentUser', authenticate, authV1.getCurrentUser);

export default router;
