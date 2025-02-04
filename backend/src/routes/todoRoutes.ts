import express from "express";
import {
  getUserTodos,
  postUserTodo,
  updateUserTodo,
  deleteUserTodo,
} from "../controllers/todoControllers";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:userId", authMiddleware, getUserTodos);
router.post("/:userId", authMiddleware, postUserTodo);
router.put("/edit/:todoId", authMiddleware, updateUserTodo);
router.delete("/delete/:todoId", authMiddleware, deleteUserTodo);

export default router;
