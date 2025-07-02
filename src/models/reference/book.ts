import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  nameEng: {
    type: String,
    required: true,
  },
  nameHindi: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,  
});

const Book = mongoose.model("Book", BookSchema);
export default Book;
