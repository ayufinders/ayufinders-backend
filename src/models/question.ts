import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  textHindi: {
    type: String,
  },
  options: [
    {
      text: {
        type: String,
        required: true,
      }
    }
  ],
  optionsHindi: [
    {
      text: {
        type: String,
      }
    }
  ],
  correctOption: {
    type: Number,
    required: true
  },
  
  explanation: {
    type: String,
  },
  explanationHindi: {
    type: String,
  },

  reference: {
    title: {
      type: String,
    },
    link: {
      type: String
    } 
  },
  referenceHindi: {
    title: {
      type: String,
    },
    link: {
      type: String
    } 
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  },
  subTopicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubTopic"
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  tagId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag"
  }],
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookSection"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  }
}, {
  timestamps: true,  
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
