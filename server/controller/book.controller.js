const { Book } = require("../model/book.model");
const mongoose = require("mongoose");


// ================= CREATE BOOK =================
const handleBookStoreController = async (req, res) => {
  try {
    const { BookName, BookTitle, Author, SellingPrice, PublishDate } = req.body;

    if (!BookName || !BookTitle || !Author || !SellingPrice) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const bookAdd = await Book.create({
      BookName,
      BookTitle,
      Author,
      SellingPrice,
      PublishDate,
    });

    return res.status(201).json({
      message: "Book added successfully",
      success: true,
      data: bookAdd,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


// ================= GET ALL BOOKS =================
const handleBookListController = async (req, res) => {
  try {
    const booklists = await Book.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All books fetched successfully",
      success: true,
      totalCount: booklists.length,
      BookList: booklists,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


// ================= DELETE BOOK =================
const handleBookDeleteController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Valid Book ID is required",
        success: false,
      });
    }

    const deleted = await Book.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


// ================= UPDATE BOOK =================
const handleBookUpdateController = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        message: "Valid Book ID is required",
        success: false,
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      success: true,
      data: updatedBook,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


module.exports = {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
};
