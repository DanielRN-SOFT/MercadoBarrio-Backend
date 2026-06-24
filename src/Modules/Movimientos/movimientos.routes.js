import express from "express";
import {
  getMovements,
  getMovementById,
  createMovements,
} from "./movimientos.controller";
import {
  attachStore,
  isGrocer,
  protect,
} from "../../middlewares/authMiddleware";

const router = express.Router();
router.get("/", protect, isGrocer, attachStore, getMovements);
router.get("/:id", protect, isGrocer, attachStore, getMovementById);
router.get("/", protect, isGrocer, attachStore, createMovements);

export default router;