import { getConnectionObject } from "../config/Dbconfig.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// Add Product for admin only
export async function addProduct(req, res) {
  try {
    const conn = getConnectionObject();
    const { name, description, price, stock, category_id } = req.body;
    const image = req.file ? req.file.filename : null;
    const qry = `INSERT INTO products (name, description, price, stock, category_id, image)
    VALUES ('${name}', '${description}', ${price}, ${stock}, '${category_id}', '${image}')`;
    const [result] = await conn.query(qry);

    if (result.affectedRows === 1) {
      res.status(201).json({ message: "Product Added Successfully" });
    } else {
      res.status(500).json({ message: "Product failed to insert" });
    }
  } catch (error) {
    console.log("Error while adding product", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

// get all products
export async function getAllProducts(req, res) {
  try {
    const conn = getConnectionObject();
    const [rows] = await conn.query(`SELECT * FROM products`);
    res.status(200).send(rows);
  } catch (error) {
    console.log("Error while fetching product data");
    console.log(error);
    res.status(500).send({ message: "Internal server Error" });
  }
}

// get product by productid
export async function getProductById(req, res) {
  try {
    const conn = getConnectionObject();
    const qry = `SELECT * FROM products WHERE product_id = ${req.params.id}`;
    const [resultSet] = await conn.query(qry);

    if (resultSet.length === 0) {
      res.status(404).send({ message: "Product Not Found" });
    } else {
      res.status(200).send(resultSet[0]);
    }
  } catch (error) {
    console.log("Error while getting product by id");
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

// Delete Product

export async function deleteProduct(req, res) {
  try {
    const conn = getConnectionObject();
    const [resultSet] = await conn.query(
      `DELETE FROM products WHERE product_id = ${req.params.id}`
    );

    if (resultSet.length === 0) {
      res.status(404).send({ message: "Product Not Found" });
    }
    res.status(200).send({ message: "Product Deleted Sucessfully" });
  } catch (error) {
    console.log("Error while Deleting Product");
    console.log(error);

    res.status(500).send({ message: "Internal server error" });
  }
}

// get product by category id
export async function getProductByCategoryId(req, res) {
  try {
    const conn = getConnectionObject();
    const qry = `SELECT * FROM products WHERE category_id = ${req.params.cid}`;
    const [resultSet] = await conn.query(qry);

    if (resultSet.length === 0) {
      res.status(404).send({ message: "Product Not Found for this Category" });
    } else {
      res.status(200).send(resultSet);
    }
  } catch (error) {
    console.log("Error while getting product by category_id");
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

// update product by id
export async function updateProduct(req, res) {
  try {
    const conn = getConnectionObject();
    const { name, description, price, stock, category_id } = req.body;
    const qry = `UPDATE products 
    SET name = '${name}', description = '${description}', price = ${price}, stock = ${stock}, category_id = ${category_id}
    WHERE product_id = ${req.params.id}`;
    const [resultSet] = await conn.query(qry);

    if (resultSet.length === 0) {
      res.status(404).send({ message: "Product Not Found for this Category" });
    } else {
      res.status(200).send({ message: "Product Updated" });
    }
  } catch (error) {
    console.log("Error while Updating product");
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
