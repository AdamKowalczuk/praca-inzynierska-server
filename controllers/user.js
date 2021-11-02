import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const secret = "test";
//trzeba zapisać do env

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
  console.log("QUIZ");
  // const { form, userId, courseId, chapterId } = req.params;
  // const {
  //   name,
  //   description,
  //   isFinished,
  //   lessons,
  //   quiz,
  //   isQuizCompleted,
  //   icon,
  //   _id,
  //   actualCourse,
  //   actualChapter,
  // } = req.body;
  // const data = {
  //   name,
  //   description,
  //   isFinished,
  //   lessons,
  //   quiz,
  //   isQuizCompleted,
  //   icon,
  //   _id,
  // };
  // let user = await User.findById(userId);
  // user.courses[actualCourse].chapters[actualChapter] = data;
  // const updatedUser = await User.findByIdAndUpdate(userId, user, {
  //   new: true,
  // });
  // res.json(updatedUser);
};
export const updateExercise = async (req, res) => {
  console.log("EXERCISE");
  const { form, userId, courseId, chapterId } = req.params;
  console.log(req.body);
  console.log(req.params);
  // const {
  //   name,
  //   description,
  //   isFinished,
  //   lessons,
  //   quiz,
  //   isQuizCompleted,
  //   icon,
  //   _id,
  //   actualCourse,
  //   actualChapter,
  // } = req.body;
  // const data = {
  //   name,
  //   description,
  //   isFinished,
  //   lessons,
  //   quiz,
  //   isQuizCompleted,
  //   icon,
  //   _id,
  // };
  // let user = await User.findById(userId);
  // user.courses[actualCourse].chapters[actualChapter] = data;
  // const updatedUser = await User.findByIdAndUpdate(userId, user, {
  //   new: true,
  // });
  // res.json(updatedUser);
};
export const getUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
