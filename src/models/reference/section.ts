import mongoose from "mongoose";

const BookSectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
}, {
  timestamps: true,  
});

const BookSection = mongoose.model("BookSection", BookSectionSchema);
export default BookSection;
