import mongoose from "mongoose";

const QuestionPaperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  },
  url: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  year: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
    required: true
  }
}, {
  timestamps: true,  
});

const QuestionPaper = mongoose.model("QuestionPaper", QuestionPaperSchema);
export default QuestionPaper;
