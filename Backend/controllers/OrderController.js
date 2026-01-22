import { getConnectionObject } from "../config/Dbconfig.js";

export async function addOrder(req, res) {
  try {
    const conn = getConnectionObject();
    const { user_id, products, total_price } = req.body;

    if (!user_id || !products || !total_price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const productData =
      typeof products === "string" ? products : JSON.stringify(products);

    const [result] = await conn.query(
      `INSERT INTO orders (user_id, products, total_price) VALUES (?, ?, ?)`,
      [user_id, productData, total_price]
    );

    if (result.affectedRows === 1) {
      res.status(201).json({
        message: "Order placed successfully",
        order_id: result.insertId,
      });
    } else {
      res.status(500).json({ message: "Failed to place order" });
    }
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllOrders(req, res) {
  try {
    const conn = getConnectionObject();
    const [rows] = await conn.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );

    const orders = rows.map((order) => {
      let productsData;
      try {
        if (typeof order.products === "string") {
          productsData = JSON.parse(order.products);
        } else {
          productsData = order.products;
        }
      } catch (err) {
        console.warn("Invalid JSON in order.products:", order.products);
        productsData = [];
      }

      return { ...order, products: productsData };
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOrdersByUser(req, res) {
  try {
    const conn = getConnectionObject();
    const userId = req.params.userId;

    const [rows] = await conn.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    const orders = rows.map((order) => {
      let productsData;
      try {
        if (typeof order.products === "string") {
          productsData = JSON.parse(order.products);
        } else {
          productsData = order.products;
        }
      } catch (err) {
        console.warn("Invalid JSON in order.products:", order.products);
        productsData = [];
      }
      return { ...order, products: productsData };
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOrderById(req, res) {
  try {
    const conn = getConnectionObject();
    const orderId = req.params.id;

    const [rows] = await conn.query("SELECT * FROM orders WHERE id = ?", [
      orderId,
    ]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Order not found" });

    const order = rows[0];

    try {
      if (typeof order.products === "string") {
        order.products = JSON.parse(order.products);
      }
    } catch (err) {
      console.warn("Invalid JSON in order.products:", order.products);
      order.products = [];
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const conn = getConnectionObject();
    const orderId = req.params.id;
    const { status } = req.body;

    const [result] = await conn.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, orderId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteOrder(req, res) {
  try {
    const conn = getConnectionObject();
    const orderId = req.params.id;

    const [result] = await conn.query("DELETE FROM orders WHERE id = ?", [
      orderId,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
