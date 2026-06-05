import express from 'express';
import { liveInterview } from '../controllers/auth/live-interview.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/liveInterview",authMiddleware,liveInterview)

export default router