import productModel from "../Models/productModel.js";
import fs from "fs";
import slugify from "slugify";
// create product
export const createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, shipping, quantity } =
      req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "name is required" }); //only use 500  code for server errors
      case !description:
        return res.status(400).send({ error: "description is required" });
      case !price:
        return res.status(400).send({ error: "price is required" });
      case !category:
        return res.status(400).send({ error: "category is required" });
      case !shipping:
        return res.status(400).send({ error: "shipping is required" });
      case !quantity:
        return res.status(400).send({ error: "quantity is required" });

      case !photo && photo.size > 100000: //photo kha se dalegi mera mtlb upload kha se krta h, postman m hi? ya frontend m form se
        return res
          .status(400)
          .send({ error: "photo is required and should be less than 20mb!" });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);

      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "product added successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while adding product",
      error,
    });
  }
};
// get-product
export const getProduct = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "All products",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while getting product",
      error,
    });
  }
};
// get single product
export const getSingleProduct = async (req, res) => {
  try {
    // is vale mh na?
    // bhai vo 500
    let product = await productModel
      .find({ slug: req.params.slug })
      .populate("category")
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "product details",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting single product", //yha se aa rhi h
      error,
    });
  }
};
// get photo
export const getProductPhoto = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).select("photo"); // yha pe product m kuch fetch nhi ho ra
    //console.log(product, "photo");// id glt daal rha tha bhai
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    } else {
      console.log("null data photo");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting product photo",
      error,
    });
  }
};
// delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel
      .findByIdAndDelete(req.params.id)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "product deleted successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while deleting product",
      error,
    });
  }
};
