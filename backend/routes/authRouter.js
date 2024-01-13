import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
} from "../controller/authController.js";
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
// forgot password
router.post("/forgot-password", forgotPasswordController);
// protected routed
router.get("/user-auth", (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
