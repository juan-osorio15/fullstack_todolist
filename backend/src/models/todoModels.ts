import pool from "../config/database";

export async function getTodosByUserId(userId: string) {
  const response = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
    userId,
  ]);

  return response.rows;
}

export async function insertTodoByUserId(todoBody: string, userId: string) {
  const response = await pool.query(
    "INSERT INTO todos (todo, user_id) VALUES ($1, $2) RETURNING *",
    [todoBody, userId]
  );

  return response.rows;
}

export async function updateTodoById(
  todo: string,
  todoId: string,
  userId: string
) {
  const response = await pool.query(
    "UPDATE todos SET todo = $1 WHERE id = $2 and user_id = $3 RETURNING *",
    [todo, todoId, userId]
  );

  return response.rows;
}

export async function deleteTodoById(todoId: string, userId: string) {
  const response = await pool.query(
    "DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *",
    [todoId, userId]
  );

  return response.rows;
}
