import express from 'express';
import * as jobV1 from '../controllers/jobV1.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

// Routes
router.post('/create', authenticate, jobV1.create);
router.get('/list', authenticate, jobV1.list);
router.get('/apply', authenticate, jobV1.apply);
router.get('/listApplications', authenticate, jobV1.listApplications);
router.get('/listPosted', authenticate, jobV1.listPosted);

export default router;
