const mongoose=require('mongoose')

const DBSchema = new mongoose.Schema({
  BookName: { type: String, required: true },
  BookTitle: { type: String, required: true },
  Author: { type: String, required: true },
  SellingPrice: { type: String, required: true },
  PublishDate: { type: String }
});

const BookModel= mongoose.model('books', DBSchema)

module.exports=BookModel;