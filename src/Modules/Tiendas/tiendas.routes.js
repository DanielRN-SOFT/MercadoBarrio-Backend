import express from "express";
import { getStores, getStoreById, createStore, updateStore, deleteStore, restoreStore } from "./tiendas.controller.js";
import { protect, IsAdmin } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, IsAdmin, getStores);
router.get("/:id", protect, IsAdmin, getStoreById);
router.post("/", protect, IsAdmin, createStore);
router.put("/:id", protect, IsAdmin, updateStore);
router.put("/delete/:id", protect, IsAdmin, deleteStore);
router.put("/restore/:id", protect, IsAdmin, restoreStore);

export default router;
