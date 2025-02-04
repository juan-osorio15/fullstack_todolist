import pool from "../config/database";

export async function insertUserToDb(
  username: string,
  email: string,
  hashedPwd: string
) {
  const response = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
    [username, email, hashedPwd]
  );

  return response.rows;
}

export async function fetchUserByEmail(email: string) {
  const response = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return response.rows;
}
