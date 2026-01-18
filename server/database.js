const mongoose = require('mongoose');

const DBConnetion=async()=>{
  try {
    mongoose
      .connect(
        "mongodb+srv://atul123:atul123@cluster0.sedk247.mongodb.net/?appName=Cluster0",
      )
      .then(() => {
        console.log("Database connected successfully!");
      })
      .catch((err) => {
        console.log("DB not connected");
      });
  } catch (error) {
    return res.status(500).json({message:"internal error"})
  }
}

module.exports=DBConnetion;