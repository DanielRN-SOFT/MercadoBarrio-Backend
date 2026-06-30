import express from "express";
import {
  getProductCategories,
  getProductCategoryById,
  createCategory,
  updateProductCategory,
  deleteProductCategory,
  restoreProductCategory,
} from "./categoriasProductos.controller.js";
import { protect, IsAdmin } from "../../middlewares/authMiddleware.js";

const router = express();
// General
router.get("/", protect, getProductCategories);
router.get("/:id", protect, getProductCategoryById);

// Admin
router.post("/", protect, IsAdmin, createCategory);
router.put("/:id", protect, IsAdmin, updateProductCategory);
router.put("/delete/:id", protect, IsAdmin, deleteProductCategory);
router.put("/restore/:id", protect, IsAdmin, restoreProductCategory);

export default router;
