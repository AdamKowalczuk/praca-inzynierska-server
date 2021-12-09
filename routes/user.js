import express from "express";
const router = express.Router();

import {
  signin,
  signup,
  getUsers,
  updateLesson,
  updateQuiz,
  updateExercise,
  deleteUser,
  finishAchievement,
} from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", getUsers);
router.patch(
  "/:userId/courses/:courseId/chapters/:chapterId/lessons/:lessonId",
  updateLesson
);
router.patch("/:userId/courses/:courseId/chapters/:chapterId", updateQuiz);

router.patch(
  "/:userId/courses/:courseId/chapters/:chapterId/exercises",
  updateExercise
);
router.delete("/:id", deleteUser);
router.patch("/:userId/achievements", finishAchievement);

export default router;
