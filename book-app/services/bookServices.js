const Book = require('../models/bookModel');

// Get all books
exports.getAllBooks = async () => {
  return await Book.find({ isDeleted: false });
};

// Get a single book by ID
exports.getBookById = async (id) => {
  return await Book.findOne({ _id: id, isDeleted: false });
};

// Create a new book
exports.createBook = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

// Update a book
exports.updateBook = async (id, bookData) => {
  const book = await Book.findOne({ _id: id, isDeleted: false });
  if (!book) {
    throw new Error('Book not found');
  }
  Object.assign(book, bookData);
  return await book.save();
};

// Soft delete a book
exports.deleteBook = async (id) => {
  const book = await Book.findOne({ _id: id, isDeleted: false });
  if (!book) {
    throw new Error('Book not found');
  }
  book.isDeleted = true;
  return await book.save();
};
