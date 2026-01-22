import { compareSync } from "bcrypt";
import { getConnectionObject } from "../config/Dbconfig.js";
import { ROLES } from "../constants/RoleConstant.js";
import jwt from "jsonwebtoken";

export async function login(request, response) {
  try {
    const connection = getConnectionObject();
    const { email, password, role } = request.body;
    const tableName = role === ROLES.ADMIN ? "admins" : "users";
    const qry = `SELECT * FROM ${tableName} WHERE email='${email}'`;
    const [rows] = await connection.query(qry);

    if (rows.length === 0) {
      response
        .status(400)
        .send({ message: "Login failed, Email doesn't exist" });
    } else {
      if (compareSync(password, rows[0].password)) {
        const userId = rows[0].user_id || rows[0].id;

        const token = jwt.sign(
          {
            userId: userId,
            role: role,
          },
          process.env.SECRET_KEY,
          { expiresIn: "8h" }
        );
        response.status(200).send({ token, message: "Login successful" });
      } else {
        response
          .status(400)
          .send({ message: "Login failed, password is invalid" });
      }
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}
