import express from 'express';
import { liveInterview } from '../controllers/auth/live-interview.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getInterview } from '../controllers/interview/getInterview.js';

const router = express.Router();

router.post("/liveInterview",authMiddleware,liveInterview)

router.post("/getInterview",getInterview)

export default router