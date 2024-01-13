import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getSingleCategory,
  updateCategory,
} from "../controller/categoryController.js";

const router = express.Router();
router.post("/create", createCategory);
router.get("/all-Category", getCategory);
router.get("/single-category/:slug", getSingleCategory);
router.delete("/delete-category/:id", deleteCategory);
router.put("/update-category/:id", updateCategory);

export default router;
