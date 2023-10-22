import express from 'express';
import * as jobV1 from '../controllers/jobV1.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

// Routes
router.post('/create', jobV1.create);
router.get('/list', authenticate, jobV1.list);

export default router;
