import express from "express";
import mongoose from "mongoose";

// import PostMessage from '../models/postMessage.js';
import Course from "../models/course.js";

const router = express.Router();

export const getCourses = async (req, res) => {
  try {
    const Courses = await Course.find();

    res.status(200).json(Courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getCourse = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const course = await Course.findById(id);

//     res.status(200).json(course);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export default router;
