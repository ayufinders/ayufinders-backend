import mongoose from "mongoose";

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: "",
  },
  papers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionPaper",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  }
  
}, {
  timestamps: true,  
});

const University = mongoose.model("University", UniversitySchema);
export default University;
