import express from "express";
import formidable from "express-formidable";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductPhoto,
  getSingleProduct,
} from "../controller/productController.js";
const router = express.Router();
// post product api
router.post("/add-product", formidable(), createProduct);
// get product
router.get("/get-product", formidable(), getProduct);
// get single product
router.get("/get-single-product/:slug", getSingleProduct);
// photo product
router.get("/getProductPhoto/:id", getProductPhoto);
// delete product
router.delete("/delete-product/:id", deleteProduct);
export default router;
