import express from "express";
import {
  getProductCategories,
  getProductCategoryById,
  getProductCategoriesWithProducts,
  getProductCategoriesByStore,
  createCategory,
  updateProductCategory,
  deleteProductCategory,
  restoreProductCategory,
} from "./categoriasProductos.controller.js";
import { protect, IsAdmin, isGrocer, attachStore } from "../../middlewares/authMiddleware.js";

const router = express();
// Pública — solo categorías con productos activos en stock, para el buscador.
router.get("/public/search", getProductCategoriesWithProducts);

// Privada del tendero — solo categorías usadas en su propio catálogo.
router.get("/store/mine", protect, isGrocer, attachStore, getProductCategoriesByStore);

// General — lectura pública: el buscador de productos (sin login) necesita listar categorías
router.get("/", getProductCategories);
router.get("/:id", getProductCategoryById);

// Admin
router.post("/", protect, IsAdmin, createCategory);
router.put("/:id", protect, IsAdmin, updateProductCategory);
router.put("/delete/:id", protect, IsAdmin, deleteProductCategory);
router.put("/restore/:id", protect, IsAdmin, restoreProductCategory);

export default router;
