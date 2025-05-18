import AdminActivity from "../models/adminActivity.js";

export async function logAdminActivity(adminId: string, type: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const updateField: Record<string, number> = {};
  if (type === "note") updateField.notesAdded = 1;
  if (type === "mcq") updateField.mcqsAdded = 1;
  if (type === "video") updateField.videosAdded = 1;
  if (type === "paper") updateField.papersAdded = 1;

  await AdminActivity.findOneAndUpdate(
    { adminId, date: today },
    { $inc: updateField },
    { upsert: true, new: true }
  );
  console.log("Admin activity logged:", { adminId, type, date: today });
}
