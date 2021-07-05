import express from "express";

import { getCourses, getCourse } from "../controllers/course.js";

const router = express.Router();
// import auth from "../middleware/auth.js";

router.get("/", getCourses);
// router.post('/',auth,  createPost); musi być zalogowany żeby dodać
// router.patch('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
// router.patch('/:id/likePost', auth, likePost);

export default router;
