import express from "express";
import {
  getallcategories,
  getcategorybyid,
  addcategory,
  updatecategory,
  deletecategory,
} from "../controllers/CategoryController.js";
import { authorize, verifyToken } from "../middleware/VerifyToken.js";
import { ROLES } from "../constants/RoleConstant.js";

const router = express.Router();

router.get("/", getallcategories);

router.get("/:category_id", getcategorybyid);

router.delete(
  "/:category_id",
  verifyToken,
  authorize([ROLES.ADMIN]),
  deletecategory
);

router.post("/", verifyToken, authorize([ROLES.ADMIN]), addcategory);

router.put(
  "/:category_id",
  verifyToken,
  authorize([ROLES.ADMIN]),
  updatecategory
);

export default router;
