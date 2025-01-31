import { Request, Response } from "express";
import QuestionPaper from "../models/questionPaper.js";
import Subject from "../models/subject.js";
import University from "../models/university.js";

export const getQuestionPapersBySubjectIdHandler = async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  try {
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      res.status(404).json({ success: false, message: "Subject not found" });
      return;
    }

    if (!subject.questionPaper || subject.questionPaper.length === 0) {
      res.status(404).json({ success: false, message: "No papers associated with this subject" });
      return;
    }

    const papers = await QuestionPaper.find({ _id: { $in: subject.questionPaper } })
      .populate('university')
      .populate('createdBy')
      .exec();

    if (!papers || papers.length === 0) {
      res.status(404).json({ success: false, message: "Papers not found" });
      return;
    }

    res.status(200).json({ success: true, data: papers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};


export const uploadQuestionPaper = async (req: Request, res: Response) => {
  const { key, name, description, createdBy, thumbnailKey, year, university, month } = req.body;
  const { subjectId } = req.params;

  const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  const thumbnailUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${thumbnailKey}`

  try{
    const questionPaper = await QuestionPaper.create({
      name,
      description,
      createdBy,
      url,
      thumbnailUrl,
      key,
      subjectId,
      year,
      month,
      university
    })

    await Subject.findByIdAndUpdate(
      subjectId,
      { $push: { questionPaper: questionPaper._id } }
    )

    await University.findByIdAndUpdate(
      university,
      { $push: { papers: questionPaper._id } }
    )

    res.status(200).json({success: true, message: "Question paper added successfully."})
  } catch(e){
    res.status(500).json({success: false, message: "Server error"})
  }
}

export const updateQuestionPaper = async (req: Request, res: Response) => {
  const { name, description, year, month, university } = req.body;
  const { questionPaperId } = req.params;

  try{
    const questionPaper = await QuestionPaper.findById(questionPaperId)
    if(!questionPaper){
      res.status(404).json({success: false, message: "Question paper not found."})
    }

    await QuestionPaper.findByIdAndUpdate(
      questionPaperId, {
        name, 
        description,
        year,
        month,
        university
      }, 
      {
        runValidators: true
      }
    )
    
    res.status(200).json({success: true, message: "Question paper updated successfully."})
  } catch(e){
    res.status(500).json({success: false, message: "Server error"})
  }
}


export const deleteQuestionPaper = async (req: Request, res: Response) => {
  const { subjectId, questionPaperId } = req.params;

  if (!subjectId || !questionPaperId) {
    res.status(400).json({
      success: false,
      message: "Subject ID and Doc ID are required.",
    });
    return;
  }

  try {
    // Delete the document
    const deletedDoc = await QuestionPaper.findByIdAndDelete(questionPaperId);
    if (!deletedDoc) {
      res.status(404).json({
        success: false,
        message: "Document not found.",
      });
      return;
    }

    // Update the sub-topic to remove the reference
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      { $pull: { questionPaper: questionPaperId } },
      { new: true } 
    );

    await University.findByIdAndUpdate(
      deletedDoc.university,
      { $pull: { papers: questionPaperId } }
    )

    if (!updatedSubject) {
      res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Question Paper deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting question paper:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
