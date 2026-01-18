const userModel=require('../model/auth.model')
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')
const secretKey = "Atul12";


const signUpUserController= async(req,res)=>{
  try {
    const { FirstName, LastName, Email, Password } = req.body;
    if (!FirstName || !LastName || !Email || !Password) {
      return res
        .status(400)
        .json({ message: "All Fields are requireds !", success: false });
    }
    //  Check if user already exists
    const existingUser = await userModel.findOne({ Email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }
    const hashPassword = await bcrypt.hash(Password, 10);
    const user = await userModel.create({FirstName, LastName, Email, Password:hashPassword});
    if(user){
      res.status(201).json({message:"user signup successfully!", success:true, data:user})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal server error", success:false})
  }
}

const LoginUserController=async (req,res)=>{
  try {
    const { FirstName, LastName, Email, Password } = req.body;
    // 1️⃣ Validation
    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }
    // 2️⃣ Check user exists
    const user = await userModel.findOne({ Email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not Exaist, Please register", success: false });
    }

    const isPasswordMatch= await bcrypt.compare(Password, user.Password)
    if(!isPasswordMatch){
      return res.status(400).json({message:'Wrong Password', success:false})
    }
    const token = jwt.sign({ userId: user?._id, Email: user?.Email },secretKey,{expiresIn:"1d"})
    return res.status(200).json({message:"User Login Successfully", success:true, token})


  } catch (error) {
    return res.status(500).json({message:"Internal server error", success:false, error:error})
  }
}

module.exports = { signUpUserController, LoginUserController };