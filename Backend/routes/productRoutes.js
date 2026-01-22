import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategoryId,
  getProductById,
  updateProduct,
  upload,
} from "../controllers/productController.js";
import { authorize, verifyToken } from "../middleware/VerifyToken.js";
import { ROLES } from "../constants/RoleConstant.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get(
  "/:id",
  verifyToken,
  authorize([ROLES.ADMIN, ROLES.CUSTOMER]),
  getProductById
);
router.get("/category/:cid", getProductByCategoryId);
router.delete("/:id", verifyToken, authorize([ROLES.ADMIN]), deleteProduct);
router.put("/:id", verifyToken, authorize([ROLES.ADMIN]), updateProduct);
router.post(
  "/",
  verifyToken,
  authorize([ROLES.ADMIN]),
  upload.single("image"),
  addProduct
);

export default router;
