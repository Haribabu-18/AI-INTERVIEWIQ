import jwt from 'jsonwebtoken'
import { Interview } from '../../models/interview.js';

export const getInterview = async (req, res) => {
    try {
        const token = req.body.token
        const userData = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        const userId = userData.id;
        const interviewData = await Interview.find({ userId })
        res.status(201).json({message: "Ok",interviewData})

    } catch (err) {
        res.status(400).json({ message: err.message })
    }


}