import express from "express";
import {
  changeDueDate,
  createTask,
  deleteTask,
  getTasks,
  markCompleted,
  updateTask,
} from "../controllers/task.js";
import { verifyToken } from "../middleware/auth.js";
import { taskRules } from "../utils/routerUtils.js";

const router = express.Router();

router.post("/create", verifyToken, taskRules, createTask);
router.get("/get", verifyToken, getTasks);
router.patch("/update/:id", updateTask);
router.patch("/markcompleted/:id", markCompleted);
router.patch("/changeduedate/:id", verifyToken, changeDueDate);
router.delete("/delete/:id", deleteTask);

export default router;
