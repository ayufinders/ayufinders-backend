import { Request, Response } from "express";
import BookSection from "../../models/reference/section.js";
import Question from "../../models/question.js";

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

export const getBookSectionsByBookIdHandler = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const sections = await BookSection.find({ bookId }).sort({nameEng: 1});
    if (!sections) {
      res.status(404).json({ success: false, message: "Sections not found" });
      return;
    }
    res.status(200).json({ success: true, data: sections });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
}; 

export const getQuestionsById = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find({sectionId: req.params.id});
    if (!questions) {
      res.status(404).json({ success: false, message: "Questions not found" });
      return;
    }
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const addBookSectionHandler = async (req: Request, res: Response) => {
  const { nameEng, nameHindi, description, bookId } = req.body;
  if (!nameEng || !bookId) {
    res.status(400).json({ success: false, message: "All fields are required" });
    return;
  }
  try {
    
    const newSection = await BookSection.create({ nameEng, nameHindi, description, bookId });
    res.status(201).json({ success: true, data: newSection });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const updateBookSectionHandler = async (req: Request, res: Response) => {
  const { nameEng, nameHindi, description } = req.body;
  const { bookSectionId } = req.params;

  try {
    const existingSection = await BookSection.findById(bookSectionId);
    if (!existingSection) {
      res.status(404).json({ success: false, data: "Section does not exist." });
      return;
    }
    const updatedSection = await BookSection.findByIdAndUpdate(
      bookSectionId,
      { nameEng, nameHindi, description },
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