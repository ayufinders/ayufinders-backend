import { Request, Response } from "express";
import Subject from "../../models/syllabus/subject.js";
import Paper from "../../models/syllabus/paper.js";
import PaperSection from "../../models/syllabus/paperSection.js";
import { Types } from "mongoose";

export const getAllSubjectsHandler = async (req: Request, res: Response) => {
  const { year } = req.params;
  try {
    const subjects = await Subject.find({ year });
    if (!subjects) {
      res.status(404).json({ success: false, message: "Subjects not found" });
    }
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    console.error(error);
  }
};

export const getSubjectHandler = async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  try {
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      res.status(404).json({ success: false, message: "Subject not found" });
      return;
    }
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const addSubjectHandler = async (req: Request, res: Response) => {
  const { name, description, year } = req.body;

  try {
    const exisitingSubject = await Subject.findOne({ name, year });
    if (exisitingSubject) {
      res.status(200).json({ success: false, data: "Subject already exists." });
      return;
    }
    const newSubject = await Subject.create({ name, description, year });
    res.status(201).json({ success: true, data: newSubject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const updateSubjectHandler = async (req: Request, res: Response) => {
  const { name, description, year } = req.body;
  const { subjectId } = req.params;

  try {
    const exisitingSubject = await Subject.findById(subjectId);
    if (!exisitingSubject) {
      res
        .status(404)
        .json({ success: false, data: "Subject does not exists." });
      return;
    }
    const updatedSubject = await Subject.findByIdAndUpdate(subjectId, {
      name,
      description,
      year,
    });
    res.status(200).json({ success: true, data: updatedSubject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const deleteSubjectHandler = async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  try {
    const existingSubject = await Subject.findById(subjectId);
    if (!existingSubject) {
      res.status(404).json({ success: false, data: "Subject not found" });
      return;
    }
    const deletedSubject = await Subject.deleteOne({ _id: subjectId });
    res.status(200).json({ success: true, data: deletedSubject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const getSubjectTreeById = async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  try {
    const paperData: {
      name: string | undefined;
      id: Types.ObjectId | undefined;
      sections: { name: string | undefined; id: Types.ObjectId | undefined }[];
    }[] = [];
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      res.status(404).json({ success: false, message: "Subject not found" });
      return;
    }

    for(const paperId of subject.paper) {
      const paper = await Paper.findById(paperId);
      if(!paper) continue;

      const sectionData: {
        name: string | undefined;
        id: Types.ObjectId | undefined;
      }[] = [];

      if (paper?.section && paper.section.length > 0) {
        for (const sectionId of paper.section) {
          const section = await PaperSection.findById(sectionId);

          const sectionInfo = {
            name: section?.name,
            id: section?._id,
          };

          sectionData.push(sectionInfo);
        };

        paperData.push({
          name: paper?.name,
          id: paper?._id,
          sections: sectionData
        })

      } else {
        paperData.push({
          name: paper?.name,
          id: paper?._id,
          sections: sectionData
        })
      }
    };

    res.json(paperData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
