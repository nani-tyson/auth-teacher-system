import express from "express";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.js";
import teacherRoutes from "./routes/teacher.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Routes
app.use("/auth", authRoutes);
app.use("/teacher", teacherRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => console.log("Server running on http://localhost:5000"));
});
