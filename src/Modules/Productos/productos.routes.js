import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  searchProductsPublic,
  getInventoryStatus,
  updateThresholdByCategory,
  getProductStockTimeline,
} from "./productos.controller.js";
import { attachStore, isGrocer, protect } from "../../middlewares/authMiddleware.js";
import { uploadProductPhoto } from "../../config/multerConfig.js";

const router = express.Router();

// Ruta pública
router.get("/public/search", searchProductsPublic);

// Rutas privadas
router.get("/inventory", protect, isGrocer, attachStore, getInventoryStatus);
router.put("/threshold/by-category", protect, isGrocer, attachStore, updateThresholdByCategory);

router.get("/", protect, isGrocer, attachStore, getProducts);
router.get("/:id", protect, isGrocer, attachStore, getProductById);
router.get("/:id/timeline", protect, isGrocer, attachStore, getProductStockTimeline);
router.post("/", protect, isGrocer, attachStore, uploadProductPhoto.single("photo"), createProduct);
router.put("/:id", protect, isGrocer, attachStore, uploadProductPhoto.single("photo"), updateProduct);
router.put("/delete/:id", protect, isGrocer, attachStore, deleteProduct);
router.put("/restore/:id", protect, isGrocer, attachStore, restoreProduct);

export default router;
