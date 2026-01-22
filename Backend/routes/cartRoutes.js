import express from "express";

import {
  getCart,
  addToCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { authorize, verifyToken } from "../middleware/VerifyToken.js";
import { ROLES } from "../constants/RoleConstant.js";

const router = express.Router();

router.get("/:userId", verifyToken, authorize([ROLES.CUSTOMER]), getCart);
router.post("/", verifyToken, authorize([ROLES.CUSTOMER]), addToCart);
router.put("/:cartId", verifyToken, authorize([ROLES.CUSTOMER]), updateCart);
router.delete(
  "/:cartId",
  verifyToken,
  authorize([ROLES.CUSTOMER]),
  removeCartItem
);

router.delete(
  "/clear/:userId",
  verifyToken,
  authorize([ROLES.CUSTOMER]),
  clearCart
);

export default router;
