import prisma from "../../../prismaClient.js";
import verifyFields from "../../helpers/verifyStringFields.js";
import verifyNumberID from "../../helpers/verifyNumberID.js";
import {
  MovementStatus,
  MovementType,
} from "../../../generated/prisma/index.js";
import getDateNow from "../../helpers/getDateNow.js";
import isExistStock from "../../helpers/isExistStock.js";
import isNumberStock from "../../helpers/isNumberStock.js";
import { isMyStore } from "../../helpers/isMyStore.js";

export const getMovements = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = parseInt(process.env.PAGINATION_LIMIT) || 10;
    const skip = (page - 1) * limit;

    const [total, movements] = await Promise.all([
      prisma.movement.count({
        where: {
          storeId: req.store.id,
        },
      }),
      prisma.movement.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          date: true,
          status: true,
          type: true,
          reason: true,
          userId: true,
          storeId: true,
          supplierId: true,
          details: true,
          cancellationDate: true,
          supplier: true,
        },
        where: {
          storeId: req.store.id,
        },
      }),
    ]);

    res.json({
      data: movements,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMovementById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    verifyNumberID(id);

    const movement = await prisma.movement.findUnique({
      where: { id },
      select: {
        id: true,
        date: true,
        status: true,
        type: true,
        userId: true,
        storeId: true,
        supplierId: true,
        details: true,
        cancellationDate: true,
      },
    });

    // Evitar que se pueda acceder a otra informacion de otra tienda
    isMyStore(req.user.id, movement.userId);

    if (movement) {
      res.json({ data: movement });
    } else {
      res.status(404);
      throw new Error("Movimiento no encontrado");
    }
  } catch (error) {
    next(error);
  }
};

export const createMovements = async (req, res, next) => {
  try {
    const { type, reason, products = [] } = req.body;
    const supplierId = parseInt(req.body.supplierId);

    // Validaciones ANTES de tocar la BD (fail fast)
    isNumberStock(products);
    if (type == MovementType.Exit) {
      await isExistStock(products);
    }

    // Transacciones para que todas las consultas se ejecuten a la vez
    const movement = await prisma.$transaction(async (tx) => {
      const movementObj = {
        date: getDateNow(),
        type: MovementStatus.Active,
        userId: req.user.id,
        store: req.store.id,
        status: MovementStatus.Active,
      };
      if (reason) movementObj.reason = reason;
      if (supplierId) movementObj.supplierId = supplierId;

      const createdMovement = await tx.movement.create({ data: movementObj });

      await Promise.all(
        products.map((product) => {
          const { productId, quantity, unitCost } = product;
          return tx.movementDetail.create({
            data: {
              movementId: createdMovement.id,
              productId,
              quantity,
              unitCost,
            },
          });
        }),
      );

      return createdMovement;
    });

    res.status(201).json({
      data: movement,
      message: "Movimiento registrado correctamente",
    });
  } catch (error) {
    next(error);
  }
};
