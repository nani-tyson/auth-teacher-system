import { Routes, Route, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Teachers from "./Teachers";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Toggle dark mode on <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar */}
      <Navbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode}>
        <div className="flex space-x-6 ml-6">
          <NavLink
            to="/dashboard/teachers"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-indigo-500"
              }`
            }
          >
            Teachers
          </NavLink>
        </div>
      </Navbar>

      {/* Content */}
      <motion.main
        className="flex-1 p-6 md:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence mode="wait">
          <Routes>
            <Route index element={<Teachers />} />
            <Route path="teachers" element={<Teachers />} />
          </Routes>
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
