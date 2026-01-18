const jwt = require('jsonwebtoken')
const userModel= require('../model/auth.model');
const secretKey = "Atul12";

const authMiddleware= async (req,res,next)=>{
  try {
    // 1️⃣ Token get karo
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res
        .status(401)
        .json({ message: "token is missing", success: false });
    }
    //verify token
    const verifiedToken = jwt.verify(token, secretKey); // verifiedToken ke ander payload data hoga, like user Email and ID
    if (!verifiedToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    //match  token payload data with database data to check is this verified user
    const verifiedUser = await userModel
      .findOne({ Email: verifiedToken?.Email })
      .select("-Password"); // minus means exclude Password // give userAll information based on token Email, except of Password because sensitive info
    if (!verifiedUser) {
      return res.status(500).json({ message: "Bad Users", success: false });
    }
    console.log(verifiedUser);
    //  User info request me attach karo
    req.user = verifiedUser;

    // Aage jaane do
    next();
  } catch (error) {
    if(error.name== "TokenExpiredError"){
      return res.status(401).json({ message: "Expired token" });
    }
    if (error.name == "JsonWebTokenError") {
     return  res.status(403).json({ message: "Invalid token Authentication" });
    }
    res.status(500).json({ message: error.message });
  }
}

module.exports= {authMiddleware}