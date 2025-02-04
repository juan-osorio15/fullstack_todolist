import { Request, Response, NextFunction } from "express";
import {
  deleteTodoById,
  getTodosByUserId,
  insertTodoByUserId,
  updateTodoById,
} from "../models/todoModels";
import AppError from "../utils/AppError";

export async function getUserTodos(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userId } = req.params;

    const userTodoRows = await getTodosByUserId(userId);

    res.json(userTodoRows);
  } catch (error) {
    next(error);
  }
}

export async function postUserTodo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userId } = req.params;
    const { todo } = req.body;
    const tokenUserId = req.user?.id;

    if (Number(tokenUserId) !== Number(userId)) {
      return next(
        new AppError("unauthorized to post on behalf of this user", 401)
      );
    }

    const insertResponseRows = await insertTodoByUserId(todo, userId);

    res.status(201).json({
      message: "todo created successfully!",
      todo: insertResponseRows[0],
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserTodo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { todoId } = req.params;
    const { todo } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError("user not found", 404));
    }

    const updateResponseRows = await updateTodoById(todo, todoId, userId);

    if (updateResponseRows.length === 0) {
      return next(new AppError("todo not found for this user", 401));
    }

    res
      .status(201)
      .json({ message: "todo updated", todo: updateResponseRows[0] });
  } catch (error) {
    next(error);
  }
}

export async function deleteUserTodo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { todoId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError("user not found", 404));
    }

    const deleteResponseRows = await deleteTodoById(todoId, userId);

    if (deleteResponseRows.length === 0) {
      return next(new AppError("todo not found for this user", 401));
    }

    res
      .status(201)
      .json({ message: "todo deleted", todo: deleteResponseRows[0] });
  } catch (error) {
    next(error);
  }
}
