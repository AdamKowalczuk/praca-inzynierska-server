import express from "express";
import mongoose from "mongoose";

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
export const createCourse = async (req, res) => {
  const { title, description } = req.body;

  const newCourse = new Course({ title, description });

  try {
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
