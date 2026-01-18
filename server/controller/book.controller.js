const BookModel=require('../model/bookModel')

const addBookController = async (req, res) => {
  try {
    const { BookName, BookTitle, Author, SellingPrice } = req.body;
    if (!BookName || !BookTitle || !Author || !SellingPrice) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const book = await BookModel.create(req.body);

    return res
      .status(201)
      .json({ message: "Book Added Successfully!", success: true, data: book });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};


const getBooksController = async (req, res) => {
  try {
    const books = await BookModel.find({});
    return res
      .status(200)
      .json({
        message: "Get All Books Data Successfully!",
        success: true,
        data: books,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};


const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BookModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Deleted Successfully", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const updateBookController = async (req, res) => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    return res.json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};




module.exports = {
  addBookController,
  getBooksController,
  deleteBookController,
  updateBookController,
};