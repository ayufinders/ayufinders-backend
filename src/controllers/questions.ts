import { Request, Response } from "express";
import Question from "../models/question.js";
import { logAdminActivity } from "../utils/adminActivity.js";
import SubTopic from "../models/syllabus/subTopic.js";
import SubjectTopic from "../models/syllabus/subjectTopic.js";
import mongoose from "mongoose";

export const addQuestionHandler = async (req: Request, res: Response) => {
  const { subTopicId } = req.params;
  const {
    text,
    textHindi,
    options,
    optionsHindi,
    reference,
    referenceHindi,
    correctOption,
    explanation,
    explanationHindi,
    tagId,
    createdBy,
    subjectId,
    bookId,
    sectionId
  } = req.body;

  if (!subTopicId || !text || !options || !tagId || options.length < 4) {
    res.status(400).json({
      success: false,
      message:
        "Subtopic id, question text, and at least four options are required.",
    });
    return;
  }

  try {
    const subTopic = await SubTopic.findById(subTopicId);
    if (!subTopic) {
      res.status(404).json({ success: false, message: "Sub-topic not found" });
      return;
    }

    // Create the new question
    const question = await Question.create({
      text,
      textHindi,
      options,
      optionsHindi,
      reference,
      referenceHindi,
      correctOption,
      explanation,
      explanationHindi,
      tagId,
      createdBy,
      subjectId,
      subTopicId,
      bookId,
      sectionId
    });

    await logAdminActivity(createdBy, "mcq");

    res.status(200).json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const updateQuestionHandler = async (req: Request, res: Response) => {
  const { questionId } = req.params;
  const {
    text,
    textHindi,
    options,
    optionsHindi,
    reference,
    referenceHindi,
    correctOption,
    explanation,
    explanationHindi,
    tagId,
    bookId,
    sectionId
  } = req.body;

  if (!text || !options || !tagId || options.length < 4) {
    res.status(400).json({
      success: false,
      message:
        "Quiz ID, question text, and at least four options are required.",
    });
    return;
  }

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json({ success: false, message: "Question not found" });
      return;
    }
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      {
        text,
        textHindi,
        options,
        optionsHindi,
        reference,
        referenceHindi,
        correctOption,
        explanation,
        explanationHindi,
        tagId,
        bookId,
        sectionId
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedQuestion });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const deleteQuestionHandler = async (req: Request, res: Response) => {
  const { questionId } = req.params;

  try {
    const existingQuestion = await Question.findOne({ _id: questionId });
    if (!existingQuestion) {
      res.status(200).json({ success: false, question: null });
      return;
    }

    // Delete the question
    const deletedQuestion = await Question.deleteOne({ _id: questionId });

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
      question: deletedQuestion,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const getQuestionsBySubjectIdHandler = async (
  req: Request,
  res: Response
) => {
  const { subjectId } = req.params;
  const { page = 1, limit = 100 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  try {
    const totalQuestions = await Question.countDocuments({ subjectId });
    const questions = await Question.find({ subjectId })
      .skip(skip)
      .limit(Number(limit));
    res
      .status(200)
      .json({
        success: true,
        data: questions,
        totalQuestions,
        page: Number(page),
        limit: Number(limit),
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const getQuestionsBySubjectTopicIdHandler = async (
  req: Request,
  res: Response
) => {
  const { subjectTopicId } = req.params;
  const { page = 1, limit = 30 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  try {
    const data = await SubjectTopic.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(subjectTopicId) } },
      {
        $lookup: {
          from: "questions",
          let: { topicSubtopics: "$subTopics" },
          pipeline: [
            { $match: { $expr: { $in: ["$subTopicId", "$$topicSubtopics"] } } },
          ],
          as: "questions",
        },
      },
    ])
    .limit(Number(limit))
    .skip(skip);

    const totalQuestions = data[0]?.questions?.length || 0;
    const questions = data[0].questions;

    res.status(200).json({success: true, questions, page, totalQuestions})
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
