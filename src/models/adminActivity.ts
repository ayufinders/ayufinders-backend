import mongoose from "mongoose";

const adminActivitySchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  date: { type: Date, required: true },

  notesAdded: { type: Number, default: 0 },
  mcqsAdded: { type: Number, default: 0 },
  videosAdded: { type: Number, default: 0 },
  papersAdded: { type: Number, default: 0 }
}, {
  timestamps: true,
  indexes: [{ adminId: 1, subject: 1, date: 1 }]
});

const AdminActivity = mongoose.model("AdminActivity", adminActivitySchema);
export default AdminActivity;