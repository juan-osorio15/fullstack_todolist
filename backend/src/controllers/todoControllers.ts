import { Request, Response } from "express";
import pool from "../config/database";

export async function getUserTodos(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params;

    const todos = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
      userId,
    ]);

    res.json(todos.rows);
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
}

export async function postUserTodo(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params;
    const { todo } = req.body;

    const result = await pool.query(
      "INSERT INTO todos (todo, user_id) VALUES ($1, $2) RETURNING *",
      [todo, userId]
    );

    res
      .status(201)
      .json({ message: "todo created successfully!", todo: result.rows[0] });
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
    const userId = req.user?.id;
    const { updatedTodo } = req.body;

    const result = await pool.query(
      "UPDATE todos SET todo = $1 WHERE id = $2 RETURNING *",
      [updatedTodo, todoId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "todo not found" });
      return;
    }

    if (userId !== result.rows[0].id) {
      res
        .status(401)
        .json({ message: "you are not allowed to edit this todo" });
      return;
    }

    res.status(201).json({ message: "todo updated", todo: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
}
