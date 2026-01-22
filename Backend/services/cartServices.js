import { getConnectionObject } from "../config/Dbconfig.js";

//Get all cart items for a user
export async function getCartItems(userId) {
  const conn = getConnectionObject();
  const [rows] = await conn.execute(
    "SELECT c.cart_id AS id, c.quantity, p.product_id AS product_id, p.name, p.price, (p.price * c.quantity) AS totalPrice FROM cart c JOIN products p ON c.product_id=p.product_id WHERE c.user_id = ?",
    [userId]
  );
  return rows;
}

//Add item to cart
export async function addItemToCart(user_id, product_id, quantity) {
  const conn = getConnectionObject();
  await conn.execute(
    "INSERT INTO cart (user_id,product_id,quantity) VALUES (?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)",
    [user_id, product_id, quantity]
  );
  return { message: "Item added to cart" };
}

//Update item quantity
export async function updateCartQuantity(cartId, quantity) {
  const conn = getConnectionObject();
  await conn.execute("UPDATE cart SET quantity = ? WHERE cart_id = ?", [
    quantity,
    cartId,
  ]);
  return { message: "Cart updated successfully" };
}

//Delete item from cart
export async function deleteCartItem(cartId) {
  const conn = getConnectionObject();
  await conn.execute(`DELETE FROM cart WHERE cart_id = ?`, [cartId]);
  return { message: "Item removed from cart" };
}
