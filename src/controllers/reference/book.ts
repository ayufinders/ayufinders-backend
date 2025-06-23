import { Request, Response } from "express";
import Book from "../../models/reference/book.js";

export const getBooksHandler = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    if (!books) {
      res.status(404).json({ success: false, message: "Books not found" });
      return;
    }
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const addBookHandler = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    const existingBook = await Book.findOne({ name });
    if (existingBook) {
      res.status(200).json({ success: false, data: "Book already exists." });
      return;
    }
    const newBook = await Book.create({ name, description });
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const updateBookHandler = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const { bookId } = req.params;

  try {
    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      res.status(404).json({ success: false, data: "Book does not exist." });
      return;
    }
    const updatedBook = await Book.findByIdAndUpdate(bookId, {
      name,
      description,
    }, { new: true });
    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const deleteBookHandler = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      res.status(404).json({ success: false, data: "Book does not exist." });
      return;
    }
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ success: true, message: "Book deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
