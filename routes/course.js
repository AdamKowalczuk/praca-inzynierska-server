import express from "express";

import { getCourses } from "../controllers/courses.js";

const router = express.Router();

router.get("/", getCourses);
// router.get("/:id", getCourse);
// router.post('/',auth,  createPost); musi być zalogowany żeby dodać
// router.patch('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
// router.patch('/:id/likePost', auth, likePost);

export default router;
