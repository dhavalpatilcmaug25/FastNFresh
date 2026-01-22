import express from "express";
import {
  addOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/OrderController.js";
import { authorize, verifyToken } from "../middleware/VerifyToken.js";
import { ROLES } from "../constants/RoleConstant.js";

const router = express.Router();

router.post("/", verifyToken, authorize([ROLES.CUSTOMER]), addOrder);
router.get("/", verifyToken, authorize([ROLES.ADMIN]), getAllOrders); // GET: All orders (admin)
router.get(
  "/user/:userId",
  verifyToken,
  authorize([ROLES.CUSTOMER]),
  getOrdersByUser
); // GET: Orders by user ID
router.get(
  "/:id",
  verifyToken,
  authorize([ROLES.ADMIN, ROLES.CUSTOMER]),
  getOrderById
); // GET: Single order
router.put("/:id", verifyToken, authorize([ROLES.ADMIN]), updateOrderStatus); //PUT:Update order ststus
router.delete(
  "/:id",
  verifyToken,
  authorize([ROLES.ADMIN, ROLES.CUSTOMER]),
  deleteOrder
); // DELETE: Delete order

export default router;
