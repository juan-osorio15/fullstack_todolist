import pool from "../config/database";

export async function userExists(email: string): Promise<boolean> {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows.length > 0;
}

export async function usernameExists(username: string): Promise<boolean> {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows.length > 0;
}
