import { User } from "../../models/User.js";

export async function updateUser(req, res) {

    const userId = req.user.id;
    const body = req.body

    try{

        if(body.password){
            delete body.password
        }

        if(body.email){
            delete body.email
        }
        const updatedUser = await User.findByIdAndUpdate(userId, body, {new:true, runValidators:true}).select("-password")

        if(!updatedUser){
            return res.status(404).json({message: "User not found"})
        }

        return res.status(201).json({message: "ok", updatedUser})

    }catch(err){
        return res.status(500).json({message: err.message})

    }
}