import express from "express";
const router = express.Router();

import { signin } from "../controllers/userAdmin.js";

router.post("/signin", signin);
// router.post("/signup", signup);

export default router;
