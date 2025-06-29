import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};





//Route for user login
const loginUser = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = createToken(user._id);
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}


//Route for user register

const registerUser = async(req,res) => {

    try {
        const {name,email,password} = req.body;


        //Checking email already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"User already exists"})
        }

        //Validator email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please eneter a valid email"})
        }

        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!strongPasswordRegex.test(password)) {
        return res.json({
            success: false,
            message:
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.",
        });
        }



        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})



    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//route for admin login

const adminLogin = async(req,res) => {
    try {
        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

export {loginUser, registerUser, adminLogin}