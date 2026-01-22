import { getConnectionObject } from "../config/Dbconfig.js";

export async function getallcategories(request, response) {
  try {
    const conn = getConnectionObject();
    const [rows] = await conn.query("SELECT * FROM categories");
    console.log(rows);
    response.status(200).send(rows);
  } catch (error) {
    response.status(500).send({ message: "Something went wrong" });
  }
}

export async function getcategorybyid(request, response) {
  try {
    const conn = getConnectionObject();
    const [rows] = await conn.query(
      "SELECT * FROM categories WHERE category_id=" + request.params.category_id
    );
    console.log(rows);
    if (rows.length === 0) {
      response.status(404).send({ message: "Category not found" });
    } else {
      response.status(200).send(rows[0]);
    }
  } catch (error) {
    response.status(500).send({ message: "Something went wrong" });
  }
}

export async function deletecategory(request, response) {
  try {
    const conn = getConnectionObject();
    const [deleteResult] = await conn.query(
      "DELETE FROM categories WHERE category_id=" + request.params.category_id
    );
    console.log(deleteResult.affectedRows);
    if (deleteResult.affectedRows === 0) {
      response.status(404).send({
        message:
          "Category not found with given id " + request.params.category_id,
      });
    } else {
      response.status(200).send({ message: "Category deleted" });
    }
    response.status(200).send("hello");
  } catch (error) {
    response.status(500).send({ message: "Something went wrong" });
  }
}

export async function addcategory(request, response) {
  try {
    const conn = getConnectionObject();
    const data = request.body;
    const qry = `INSERT INTO categories (name) VALUES('${data.name}')`;
    const [resultSet] = await conn.query(qry);
    if (resultSet.affectedRows === 1) {
      response.status(200).send({ message: "Category added successfully" });
    } else {
      response.status(500).send({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    if (error.errno === 1062) {
      response
        .status(400)
        .send({ message: "Category with this id already exists" });
    } else {
      response.status(500).send({ message: "Something went wrong" });
    }
  }
}

export async function updatecategory(request, response) {
  try {
    const conn = getConnectionObject();
    const { name } = request.body;
    const qry = `UPDATE categories SET name = '${name}' WHERE category_id = ${request.params.category_id}`;
    const [resultSet] = await conn.query(qry);

    if (resultSet.affectedRows === 1) {
      response.status(200).send({ message: "Category Updated Successfully" });
    } else {
      response
        .status(500)
        .send({ message: "Category update operation failed" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}
