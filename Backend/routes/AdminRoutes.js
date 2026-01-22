import express from "express";
import { adminRegister } from "../controllers/AdminController.js";
import { authorize, verifyToken } from "../middleware/VerifyToken.js";
import { ROLES } from "../constants/RoleConstant.js";

const router = express.Router();

router.post("/", adminRegister);

export default router;
