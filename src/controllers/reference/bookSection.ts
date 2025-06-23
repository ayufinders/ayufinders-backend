import { Request, Response } from "express";
import BookSection from "../../models/reference/section.js";

export const getBookSectionsHandler = async (req: Request, res: Response) => {
  try {
    const sections = await BookSection.find();
    if (!sections) {
      res.status(404).json({ success: false, message: "Sections not found" });
      return;
    }
    res.status(200).json({ success: true, data: sections });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};  

export const addBookSectionHandler = async (req: Request, res: Response) => {
  const { name, description, bookId } = req.body;
  if (!name || !bookId) {
    res.status(400).json({ success: false, message: "All fields are required" });
    return;
  }
  try {
    
    const newSection = await BookSection.create({ name, description, bookId });
    res.status(201).json({ success: true, data: newSection });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const updateBookSectionHandler = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const { bookSectionId } = req.params;

  try {
    const existingSection = await BookSection.findById(bookSectionId);
    if (!existingSection) {
      res.status(404).json({ success: false, data: "Section does not exist." });
      return;
    }
    const updatedSection = await BookSection.findByIdAndUpdate(
      bookSectionId,
      { name, description },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedSection });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const deleteBookSectionHandler = async (req: Request, res: Response) => {
  const { bookSectionId } = req.params;

  try {
    const existingSection = await BookSection.findById(bookSectionId);
    if (!existingSection) {
      res.status(404).json({ success: false, data: "Section does not exist." });
      return;
    }
    await BookSection.findByIdAndDelete(bookSectionId);
    res.status(200).json({ success: true, message: "Section deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};