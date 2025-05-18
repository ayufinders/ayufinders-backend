import AdminActivity from "../models/adminActivity.js";
import { Request, Response } from "express";

export const getReport = async (req: Request, res: Response) => {
  const { range = "today", days, date } = req.query;

  let fromDate, toDate;

  if (date) {
    const dateStr = Array.isArray(date) ? date[0] : date;
    fromDate = new Date(typeof dateStr === "string" ? dateStr : "");
    fromDate.setHours(0, 0, 0, 0);

    toDate = new Date(typeof dateStr === "string" ? dateStr : "");
    toDate.setHours(23, 59, 59, 999);
  } else {
    fromDate = new Date();
    toDate = new Date();

    switch (range) {
      case "today":
        fromDate.setHours(0, 0, 0, 0);
        break;
      case "weekly":
        fromDate.setDate(fromDate.getDate() - 6);
        fromDate.setHours(0, 0, 0, 0);
        break;
      case "monthly":
        fromDate.setDate(fromDate.getDate() - 29);
        fromDate.setHours(0, 0, 0, 0);
        break;
      case "custom":
        const daysStr = Array.isArray(days) ? days[0] : days;
        const numDays = parseInt(typeof daysStr === "string" ? daysStr : "7");
        fromDate.setDate(fromDate.getDate() - (numDays - 1));
        fromDate.setHours(0, 0, 0, 0);
        break;
      default:
        res.status(400).json({ error: "Invalid range parameter" });
        return;
    }
  }

  try {
    const adminData = await AdminActivity.aggregate([
      {
        $match: {
          date: { $gte: fromDate, $lte: toDate }
        }
      },
      {
        $group: {
          _id: "$adminId",
          totalNotes: { $sum: "$notesAdded" },
          totalMcqs: { $sum: "$mcqsAdded" },
          totalVideos: { $sum: "$videosAdded" },
          totalPapers: { $sum: "$papersAdded" }
        }
      },
      {
        $lookup: {
          from: "admins",
          localField: "_id",
          foreignField: "_id",
          as: "admin"
        }
      },
      {
        $unwind: "$admin"
      },
      {
        $project: {
          _id: 0,
          adminId: "$admin._id",
          adminName: "$admin.name",
          totalNotes: 1,
          totalMcqs: 1,
          totalVideos: 1,
          totalPapers: 1
        }
      }
    ]);

    // Calculate grand totals
    const totalSummary = adminData.reduce(
      (acc, curr) => {
        acc.totalNotes += curr.totalNotes;
        acc.totalMcqs += curr.totalMcqs;
        acc.totalVideos += curr.totalVideos;
        acc.totalPapers += curr.totalPapers;
        return acc;
      },
      { totalNotes: 0, totalMcqs: 0, totalVideos: 0, totalPapers: 0 }
    );

    res.json({
      summary: totalSummary,
      admins: adminData
    });
  } catch (err) {
    console.error("Report Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
