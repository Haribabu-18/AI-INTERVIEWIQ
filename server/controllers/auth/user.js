import mongoose from "mongoose";
import { User } from "../../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../../utils/generateJwtToken.js";

export const signup = async (req, res) => {
    const { name, age, phone, email, password } = req.body;

    try {
        //check whether email is valid or not from valid-users
        const isValidUser = await mongoose.connection.collection(process.env.VALID_USERS_COLLECTION).findOne({ email });

        if (!isValidUser) {
            return res.status(400).json({ message: "This email is not registed" })
        }

        console.log(isValidUser, 'is valid user');


        //check whether email is exist or not in user collection
        const isUserAlreadyExists = await User.findOne({ email });

        if (isUserAlreadyExists) {
            return res.status(400).json({ message: "email already exist" })
        }

        //password hashing bycrpt
        req.body.password = await bcrypt.hash(password, 10)

        const newUser = await User.create(req.body);

        res.status(201).json({ message: "ok", newUser });

    } catch (err) {
        res.status(500).json({ message: err })
    }



}

export const login = async (req, res) => {
    //take the email and password
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "emailid  and password required" })
    }
    //verify if email is exist or not
    const user = await User.findOne({ email });

    console.log(user, "user in backend")

    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }

    //verify password with bcrypt

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({ message: "incorrect password" });
    }

    // return res.status(201).json({ message: "logged in" })

    //Generate jwt token

    const token = generateToken({ email: user.email, id: user._id })

    const userDetails = {
        name: user.name,
        email: user.email,
        age: user.age || null,
        phone: user.phone,
    }


    return res.status(200).json({ message: "ok", userDetails, token })

    //send response token
}