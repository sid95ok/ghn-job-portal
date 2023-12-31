import express from 'express';
import * as userV1 from '../controllers/userV1.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

// Routes
router.put('/update', authenticate, userV1.update);

export default router;
