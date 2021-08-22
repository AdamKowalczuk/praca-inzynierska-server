import express from "express";

<<<<<<< HEAD
import { getCourses } from "../controllers/courses.js";
=======
import { getCourses, createCourse } from "../controllers/courses.js";
>>>>>>> 6d736f4c2d74d8bbf46dee4202416f7a0b8c27ea

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("THIS WORKS!");
// });
router.get("/", getCourses);
<<<<<<< HEAD
// router.get("/:id", getCourse);
// router.post('/',auth,  createPost); musi być zalogowany żeby dodać
// router.patch('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
// router.patch('/:id/likePost', auth, likePost);
=======

router.post("/", createCourse);
// router.get("/:id", getCourse);
// router.patch("/:id", updateCourse);
// router.delete("/:id", deleteCourse);
// router.patch('/:id/likePost', likePost);
>>>>>>> 6d736f4c2d74d8bbf46dee4202416f7a0b8c27ea

export default router;
