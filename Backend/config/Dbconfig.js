import { createConnection } from "mysql2/promise";

let conn = null;

export async function connectDb() {
  try {
    conn = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
    });
    console.log("Database Created");
  } catch (error) {
    console.log("Error in Database");
    console.log(error);
  }
  return conn;
}

export function getConnectionObject() {
  return conn;
}
