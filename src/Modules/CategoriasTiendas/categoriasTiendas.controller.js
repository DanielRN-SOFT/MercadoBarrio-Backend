import { StoreCategoryStatus } from "../../../generated/prisma/index.js";
import prisma from "../../../prismaClient.js";

export const getStoreCategories = async (req, res) => {
  try {
    // Obtenemos la pagina desde el query param, por defecto pagina 1
    const page = req.query.page || 1;
    const limit = parseInt(process.env.PAGINATION_LIMIT) || 10;

    // Si estamos en página 1: skip=0, página 2: skip=10, página 3: skip=20...
    const skip = (page - 1) * limit;

    // Total de registros (para saber cuántas páginas hay en total)
    const total = await prisma.storeCategory.count();

    const storeCategory = await prisma.storeCategory.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        status: true,
      },
    });

    res.json({
      data: storeCategory,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error("Ocurrio un error en el servidor");
  }
};

export const getStoreCategoryById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const storeCategory = await prisma.storeCategory.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        status: true,
      },
    });

    if (storeCategory) {
      res.json({ storeCategory });
    } else {
      res.status(500);
      throw new Error("Categoria de tienda no encontrada");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
};

export const createStoreCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const createdCategory = await prisma.storeCategory.create({
      data: {
        name,
        status: StoreCategoryStatus.Active,
      },
    });
    res.json(createdCategory);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const updateStoreCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const id = parseInt(req.params.id);

    const storeCategory = await prisma.storeCategory.findUnique({
      where: { id },
    });

    if (!storeCategory) {
      res.status(404);
      throw new Error("Categoria de tienda no encontrada");
    }

    const updatedCategory = await prisma.storeCategory.update({
      data: { name },
      where: { id },
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const deleteStoreCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const storeCategory = await prisma.storeCategory.findUnique({
      where: { id },
    });

    if (storeCategory) {
      const isExistStoreCategory = await prisma.store.findFirst({
        where: { storeCategoryId: id },
      });

      if (isExistStoreCategory) {
        res.status(400);
        throw new Error("Esa categoria esta asociada a una tienda");
      }

      const deletedStoreCategory = await prisma.storeCategory.update({
        where: { id },
        data: {
          status: storeCategory.Inactive,
        },
      });

      res.status(200).json({ deletedStoreCategory });
    } else {
      res.status(404);
      throw new Error("Categoria de tienda no encontrada");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const restoreStoreCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  const storeCategory = await prisma.storeCategory.findUnique({
    where: { id },
  });

  if (storeCategory) {
    const restoredStoreCategory = await prisma.storeCategory.update({
      where: { id },
      data: {
        status: storeCategory.Active,
      },
    });

    res.status(200).json({ restoredStoreCategory });
  } else {
    res.status(404);
    throw new Error("Categoria de tienda no encontrada");
  }
};
