import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../config/Dbconfig.js";
import jwt from "jsonwebtoken";

export async function adminRegister(req, res) {
  try {
    const conn = getConnectionObject();
    const { name, email, phone, password } = req.body;
    const encryptedPassword = hashSync(password, 12);

    const qry = `INSERT INTO admins(name,email, phone, password) VALUES('${name}','${email}','${phone}','${encryptedPassword}')`;
    const [resultSet] = await conn.query(qry);
    if (resultSet.affectedRows === 1) {
      res.status(200).send({ message: "Admin registered" });
    } else {
      res.status(500).send({ message: "Admin registration failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
}
