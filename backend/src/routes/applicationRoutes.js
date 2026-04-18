import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { Application } from "../models/Application.js";

const router = express.Router();

router.use(protect);

router.get("/stats", async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id });

    const stats = {
      total: applications.length,
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
    };

    applications.forEach((application) => {
      stats[application.status] += 1;
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch stats" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { user: req.user._id };

    if (status && status !== "All") {
      filter.status = status;
    }

    const applications = await Application.find(filter).sort({ appliedDate: -1, createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch applications" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { company, role, status, location, link, notes, appliedDate } = req.body;

    if (!company || !role || !appliedDate) {
      return res.status(400).json({ message: "Company, role, and applied date are required" });
    }

    const application = await Application.create({
      user: req.user._id,
      company,
      role,
      status: status || "Applied",
      location,
      link,
      notes,
      appliedDate,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Unable to create application" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, user: req.user._id });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const fields = ["company", "role", "status", "location", "link", "notes", "appliedDate"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        application[field] = req.body[field];
      }
    });

    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Unable to update application" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete application" });
  }
});

export default router;
