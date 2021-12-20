import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.js";

const secret = "1234";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, courses, achievements } =
    req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      courses,
      achievements,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const updateLesson = async (req, res) => {
  const { userId, courseId, chapterId, lessonId } = req.params;
  const {
    name,
    description,
    image,
    isFinished,
    _id,
    actualCourse,
    actualChapter,
    actualLesson,
  } = req.body;
  const data = { name, description, image, isFinished, _id };
  let user = await User.findById(userId);
  user.courses[actualCourse].chapters[actualChapter].lessons[actualLesson] =
    data;
  const updatedUser = await User.findByIdAndUpdate(userId, user, {
    new: true,
  });
  res.json(updatedUser);
};
export const updateQuiz = async (req, res) => {
  const { form, userId, courseId, chapterId } = req.params;
  const {
    name,
    description,
    isFinished,
    lessons,
    quiz,
    isQuizCompleted,
    icon,
    _id,
    actualCourse,
    actualChapter,
  } = req.body;
  const data = {
    name,
    description,
    isFinished,
    lessons,
    quiz,
    isQuizCompleted,
    icon,
    _id,
  };
  let user = await User.findById(userId);
  user.courses[actualCourse].chapters[actualChapter] = data;
  const updatedUser = await User.findByIdAndUpdate(userId, user, {
    new: true,
  });
  res.json(updatedUser);
};
export const updateExercise = async (req, res) => {
  const { userId, courseId, chapterId } = req.params;
  let form = req.body.form.form;
  let actualExercise = req.body.actualExercise;
  let actualCourse = form[0].actualCourse;
  let actualChapter = form[0].actualChapter;

  let user = await User.findById(userId);
  user.courses[actualCourse].chapters[actualChapter].exercises = form;

  if (
    actualExercise ==
    user.courses[actualCourse].chapters[actualChapter].exercises.length - 1
  ) {
    user.courses[actualCourse].chapters[
      actualChapter
    ].isExerciseCompleted = true;
  }
  const updatedUser = await User.findByIdAndUpdate(userId, user, {
    new: true,
  });
  res.json(updatedUser);
};
export const getUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  let user = await User.findById(id);
  await User.findByIdAndRemove(id);
  res.json({ message: "User deleted successfully." });
};

export const finishAchievement = async (req, res) => {
  const { userId } = req.params;
  const { achievementId } = req.body;
  let user = await User.findById(userId);

  user.achievements[achievementId].isFinished = true;
  const updatedUser = await User.findByIdAndUpdate(userId, user, {
    new: true,
  });
  res.json(updatedUser);
};
