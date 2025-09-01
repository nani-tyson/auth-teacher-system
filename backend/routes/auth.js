import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Teacher from "../models/teacher.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Register (insert into both tables)
router.post("/register", async (req, res) => {
  try {
    const { email, first_name, last_name, password, university_name, gender, year_joined } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      first_name,
      last_name,
      password: hashedPassword,
    });

    await Teacher.create({
      user_id: user.id,
      university_name,
      gender,
      year_joined,
    });

    res.json({ message: "User & Teacher registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
