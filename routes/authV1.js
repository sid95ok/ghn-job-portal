import express from 'express';
import * as authV1 from '../controllers/authV1.js';

const router = express.Router();

// Routes
router.post('/login', authV1.login);
router.post('/signup', authV1.signup);

export default router;
