import User from '../model/user.model.js'
import {z} from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {  generateTokenAndSaveInCookie } from '../jwt/token.js'

const userSchema = z.object({
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"password at least 6 characters long"}),
    username:z.string().min(3,{message:"username at least 3 characters long"}),
})

export const register = async(req, res)=>{
    try {
        const {username, email, password} = req.body
        const user = await User.findOne({email})
         
         if(!username || !email || !password){
            return res.status(400).json({errors:"All fields are required"})
         }

         const validation = userSchema.safeParse({email, password, username})
         if (!validation.success) {
            // return res.status(400).json({errors:validation.error.errors})
            const errMessage = validation.error.errors.map((err)=>err.message)
            return res.status(400).json({errors:errMessage})
         }
        if(user){
            return res.status(400).json({errors:"User already exists", user})
        }
        const hashpassword = await bcrypt.hash(password,10)
        const newUser = new User({email, username, password:hashpassword})

        await newUser.save()

        if(newUser){
            const token = await generateTokenAndSaveInCookie(newUser._id, res)
            return res.status(200).json({message:"User registered successfully", newUser,token})
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({errors:"error while signup user"})
    }
    
}
export const login = async(req, res)=>{
    const {email, password} = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({errors:"all fields are reqired"})
        }
    
        const user = await User.findOne({email}).select("+password")
    
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({message:"Invalid email or password"})
        }
         const token = await generateTokenAndSaveInCookie(user._id, res)

        res.status(200).json({message:"User loggedin successfully", user})
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"error while login user"})
    }

}
export const logout = async(req, res)=>{
    try {
        res.clearCookie("jwt",{
            path:'/'
        })
        .status(200)
        .json({message:"User logout successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"error while logout user"})
    }

}