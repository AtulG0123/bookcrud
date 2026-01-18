const mongoose = require('mongoose');

const DBConnetion=async()=>{
  try {
    mongoose.connect("mongodb://localhost:27017/BookShop")
    .then(()=>{
      console.log('Database connected successfully!')
    }).catch((err)=>{
      console.log('DB not connected')
    })
  } catch (error) {
    return res.status(500).json({message:"internal error"})
  }
}

module.exports=DBConnetion;