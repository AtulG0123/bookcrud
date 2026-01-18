const express = require('express')
const BookModel=require('../model/bookModel')
const {addBookController, getBooksController, deleteBookController , updateBookController}=require('../controller/book.controller')

const router=express()

router.post("/addBook", addBookController);
router.get("/getBooks", getBooksController);
router.delete("/deleteBooks/:id", deleteBookController);
router.put("/updateBook/:id", updateBookController);

module.exports=router;