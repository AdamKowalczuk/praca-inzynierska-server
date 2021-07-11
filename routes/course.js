import express from "express";

import { getCourses, createCourse } from "../controllers/courses.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("THIS WORKS!");
// });
router.get("/", getCourses);

router.post("/", createCourse);
// router.get("/:id", getCourse);
// router.patch("/:id", updateCourse);
// router.delete("/:id", deleteCourse);
// router.patch('/:id/likePost', likePost);

export default router;
