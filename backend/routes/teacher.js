import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Teacher from "../models/teacher.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/list", verifyToken, async (req, res) => {
  try {
    const teachers = await Teacher.findAll({ include: User });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
