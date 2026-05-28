import express from 'express';
import { signup, login } from '../controllers/auth/user.js';

const router = express.Router();
console.log("router executing")

router.post("/signup", signup)

router.post("/login", login)

export default router