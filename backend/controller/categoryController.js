import slugify from "slugify";
import categoryModel from "../Models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Name is required",
      });
    }
    // existing category
    const existingName = await categoryModel.findOne({ name });
    if (existingName) {
      return res.status(200).send({
        success: true,
        message: "category already exists",
      });
    }
    // Create a new category with a slug based on the name
    const category = new categoryModel({
      name,
      slug: slugify(name),
    });
    // Save the new category to the database
    await category.save();
    res.status(201).send({
      success: true,
      message: "create category successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while creating category",
      error,
    });
  }
};
// get  all-category controller
export const getCategory = async (req, res) => {
  try {
    const data = await categoryModel.find();
    res.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error while getting category",
    });
  }
};
// get single category controller
export const getSingleCategory = async (req, res) => {
  try {
    let category = await categoryModel.findOne({ slug: req.params.slug });
    res
      .status(200)
      .send({ success: true, message: "get single category list", category });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while getting single category",
      error,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category deleted successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while deleting category",
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    // Extract the category ID from the request parameters
    const { id } = req.params;
    // Extract the new name for the category from the request body
    const { name } = req.body;
    const category = await categoryModel.findByIdAndUpdate(id, {
      slug: slugify(name),
    });
    // Send a success response with the updated category details
    res.status(200).send({
      success: true,
      message: "category updated successfully",
      category,
    });
    // Send an error response in case of any issues during the update
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while updating category",
      error,
    });
  }
};
