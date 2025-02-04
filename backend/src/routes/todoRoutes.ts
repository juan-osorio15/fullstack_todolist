import express from "express";
import {
  getUserTodos,
  postUserTodo,
  // updateUserTodo,
  // deleteUserTodo,
} from "../controllers/todoControllers";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:userId", authMiddleware, getUserTodos);
router.post("/:userId", authMiddleware, postUserTodo);
// router.put("/edit/:todoId", authMiddleware, postUserTodo);
// router.delete("/delete/:todoId", authMiddleware, postUserTodo);

export default router;
