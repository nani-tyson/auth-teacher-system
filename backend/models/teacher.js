import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";

const Teacher = sequelize.define("teachers", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  university_name: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.ENUM("Male", "Female", "Other"), allowNull: false },
  year_joined: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasOne(Teacher, { foreignKey: "user_id", onDelete: "CASCADE" });
Teacher.belongsTo(User, { foreignKey: "user_id" });

export default Teacher;
