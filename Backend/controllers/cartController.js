import { getConnectionObject } from "../config/Dbconfig.js";

export async function getCart(req, res) {
  try {
    const userId = req.params.userId || req.loggedInUserId;
    const conn = getConnectionObject();

    const [rows] = await conn.execute(
      `SELECT 
        c.cart_id AS id,
        c.quantity,
        p.product_id AS product_id,
        p.name,
        p.price,
        (p.price * c.quantity) AS totalPrice
       FROM cart c
       JOIN products p ON c.product_id = p.product_id
       WHERE c.user_id = ?`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching cart items" });
  }
}

export async function addToCart(req, res) {
  try {
    const conn = getConnectionObject();

    const { product_id, quantity } = req.body;
    const user_id = req.loggedInUserId || req.body.user_id;

    if (!user_id) return res.status(400).json({ error: "Missing user_id" });
    if (!product_id)
      return res.status(400).json({ error: "Missing product_id" });

    const qty = Number(quantity) || 1;

    const [existing] = await conn.execute(
      `SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?`,
      [user_id, product_id]
    );

    if (existing.length > 0) {
      await conn.execute(
        `UPDATE cart SET quantity = quantity + ? 
         WHERE user_id = ? AND product_id = ?`,
        [qty, user_id, product_id]
      );

      return res.json({
        message: "Cart updated (quantity increased)",
      });
    }

    await conn.execute(
      `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`,
      [user_id, product_id, qty]
    );

    res.json({ message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding to cart" });
  }
}

export async function updateCart(req, res) {
  try {
    const conn = getConnectionObject();
    const { cartId } = req.params;
    const { quantity } = req.body;

    await conn.execute(`UPDATE cart SET quantity = ? WHERE cart_id = ?`, [
      quantity,
      cartId,
    ]);

    res.json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating cart" });
  }
}

export async function removeCartItem(req, res) {
  try {
    const conn = getConnectionObject();
    const { cartId } = req.params;

    await conn.execute(`DELETE FROM cart WHERE cart_id = ?`, [cartId]);

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting item" });
  }
}

export async function clearCart(req, res) {
  try {
    const conn = getConnectionObject();
    const userId = req.params.userId || req.loggedInUserId;

    await conn.execute(`DELETE FROM cart WHERE user_id = ?`, [userId]);

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error clearing cart" });
  }
}
