import { Request, Response } from "express";
import Tag from "../models/tag.js";
import Question from "../models/question.js";
import SubTopic from "../models/subTopic.js";
import University from "../models/university.js";
import QuestionPaper from "../models/questionPaper.js";

export const addUniversityHandler = async (req: Request, res: Response) => {
  const { name, description, createdBy } = req.body;

  try {
    const existingUniversity = await University.findOne({name})
    if(existingUniversity){
      res.status(200).json({ success: false, university: null});
      return;
    }
    const newUniversity = await University.create({ name, description, createdBy });
    res.status(201).json({ success: true, university: newUniversity });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const updateUniversityHandler = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const { id } = req.params;

  try {
    const existingUniversity = await University.findById(id)
    if(!existingUniversity){
      res.status(200).json({ success: false, university: null, message: "Univrersity does not exist."});
      return;
    }
    const updatedUniversity = await University.findByIdAndUpdate(id, { name, description });
    res.status(201).json({ success: true, university: updatedUniversity });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const getUniversitiesHandler = async (req: Request, res: Response) => {
  try {
    const universities = await University.find().populate("createdBy").populate("papers");
    res.status(200).json({ success: true, universities: universities });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const deleteUniversityHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingUniversity = await University.findById(id)
    if(!existingUniversity){
      res.status(200).json({ success: false, university: null, message: "No university found."});
      return;
    }
    const deletedUniversity = await University.findByIdAndDelete(id)

    await QuestionPaper.deleteMany({
      university: id
    });

    res.status(200).json({ success: true, deletedUniversity });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
