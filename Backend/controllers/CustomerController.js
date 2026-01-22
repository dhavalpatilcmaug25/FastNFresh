import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../config/Dbconfig.js";
import jwt from "jsonwebtoken";
export async function customerRegister(req, res) {
  try {
    const conn = getConnectionObject();
    const { name, email, phone, password } = req.body;

    const encryptedPassword = hashSync(password, 12);

    const qry = ` INSERT INTO users (name, email, phone, password, role)
      VALUES ('${name}', '${email}', '${phone}', '${encryptedPassword}', "user")`;

    const [resultSet] = await conn.query(qry);

    if (resultSet.affectedRows === 1) {
      res.status(200).send({ message: "User Registered Successfully" });
    } else {
      res.status(500).send({ message: "User Register Failed" });
    }
  } catch (error) {
    console.log("Error while registration", error);
    if (error.errno === 1062) {
      res.status(400).send({ message: "Email already exists" });
    } else {
      res.status(500).send({ message: "Internal Server error" });
    }
  }
}
