import express from 'express'
import {updateUser} from '../controllers/auth/update-user.js'
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.patch("/updateProfile",authMiddleware,updateUser)

export default router