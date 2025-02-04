import { Request, Response } from "express";
import {
  deleteTodoById,
  getTodosByUserId,
  insertTodoByUserId,
  updateTodoById,
} from "../models/todoModels";

export async function getUserTodos(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params;

    const userTodoRows = await getTodosByUserId(userId);

    res.json(userTodoRows);
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
}

export async function postUserTodo(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params;
    const { todo } = req.body;
    const tokenUserId = req.user?.id;

    if (Number(tokenUserId) !== Number(userId)) {
      res
        .status(401)
        .json({ message: "unauthorized to post on behalf of this user" });
      return;
    }

    const insertResponseRows = await insertTodoByUserId(todo, userId);

    res.status(201).json({
      message: "todo created successfully!",
      todo: insertResponseRows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
}

export async function updateUserTodo(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { todoId } = req.params;
    const { todo } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updateResponseRows = await updateTodoById(todo, todoId, userId);

    if (updateResponseRows.length === 0) {
      res.status(404).json({ message: "todo not found for this user" });
      return;
    }

    res
      .status(201)
      .json({ message: "todo updated", todo: updateResponseRows[0] });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
}

export async function deleteUserTodo(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { todoId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const deleteResponseRows = await deleteTodoById(todoId, userId);

    if (deleteResponseRows.length === 0) {
      res.status(404).json({ message: "todo not found for this user" });
      return;
    }

    res
      .status(201)
      .json({ message: "todo deleted", todo: deleteResponseRows[0] });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
}
