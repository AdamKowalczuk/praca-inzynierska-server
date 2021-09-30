import express from "express";
const router = express.Router();

import {
  signin,
  signup,
  getUsers,
  updateLesson,
  updateQuiz,
} from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", getUsers);
router.patch(
  "/:userId/courses/:courseId/chapters/:chapterId/lessons/:lessonId",
  updateLesson
);
router.patch("/:userId/courses/:courseId/chapters/:chapterId", updateQuiz);

export default router;
