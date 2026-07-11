import { ProductStatus } from "../../../generated/prisma/index.js";
import prisma from "../../../prismaClient.js";
import verifyFields from "../../helpers/verifyStringFields.js";
import verifyNumberID from "../../helpers/verifyNumberID.js";
import deleteFile from "../../helpers/deleteFile.js";

export const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(process.env.PAGINATION_LIMIT) || 10;
    const skip = (page - 1) * limit;
    const { name, productCategoryId, status } = req.query;

    const where = {
      storeId: req.store.id,
      ...(name && { name: { contains: name } }),
      ...(productCategoryId && {
        productCategoryId: parseInt(productCategoryId),
      }),
      ...(status && { status }),
    };

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          price: true,
          currentStock: true,
          lowStockThreshold: true,
          status: true,
          productCategoryId: true,
          photo: true,
          unitOfMeasureId: true,
          productCategory: {
            select: { id: true, name: true },
          },
        },
        orderBy: { name: "asc" },
      }),
    ]);

    res.json({
      data: products,
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

export const getProductById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    verifyNumberID(id);

    const product = await prisma.product.findFirst({
      where: { id, storeId: req.store.id },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        referenceCode: true,
        lowStockThreshold: true,
        photo: true,
        currentStock: true,
        status: true,
        productCategoryId: true,
        unitOfMeasureId: true,
      },
    });

    if (product) {
      res.json({ data: product });
    } else {
      res.status(404);
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    next(error);
  }
};

// RF-46: línea de tiempo consolidada de todo lo que afectó el stock de un
// producto puntual — une Movimientos (entradas/salidas/ajustes) y Ventas en
// un solo arreglo ordenado por fecha, para que el propietario audite el
// historial completo desde el detalle del producto sin saltar entre módulos.
export const getProductStockTimeline = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    verifyNumberID(productId);

    const { startDate, endDate } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // Confirmamos que el producto exista y pertenezca a la tienda del usuario
    const product = await prisma.product.findFirst({
      where: { id: productId, storeId: req.store.id },
      select: { id: true, name: true, currentStock: true },
    });

    if (!product) {
      res.status(404);
      throw new Error("Producto no encontrado");
    }

    // Mismo patrón de fechas UTC explícito usado en Ventas y Movimientos,
    // para que el filtro por rango no dependa de la zona horaria del servidor.
    const dateFilter = {};
    if (startDate) dateFilter.gte = new Date(`${startDate}T00:00:00.000Z`);
    if (endDate) dateFilter.lte = new Date(`${endDate}T23:59:59.999Z`);
    const hasDateFilter = Object.keys(dateFilter).length > 0;

    const [movementDetails, saleDetails] = await Promise.all([
      prisma.movementDetail.findMany({
        where: {
          productId,
          movement: {
            storeId: req.store.id,
            ...(hasDateFilter && { date: dateFilter }),
          },
        },
        select: {
          id: true,
          quantity: true,
          unitCost: true,
          movement: {
            select: {
              id: true,
              date: true,
              type: true,
              status: true,
              reason: true,
              cancellationDate: true,
              supplier: { select: { id: true, name: true } },
              user: { select: { id: true, name: true } },
            },
          },
        },
      }),
      prisma.saleDetail.findMany({
        where: {
          productId,
          sale: {
            storeId: req.store.id,
            ...(hasDateFilter && { date: dateFilter }),
          },
        },
        select: {
          id: true,
          quantity: true,
          unitPrice: true,
          subtotal: true,
          sale: {
            select: {
              id: true,
              date: true,
              status: true,
              cancellationReason: true,
              cancellationDate: true,
              user: { select: { id: true, name: true } },
            },
          },
        },
      }),
    ]);

    // Movimientos de entrada suman stock, de salida/ajuste-salida lo restan
    const ENTRY_TYPES = ["Entry", "AdjustEntry"];

    const eventosMovimientos = movementDetails.map((md) => ({
      origen: "Movimiento",
      id: md.movement.id,
      date: md.movement.date,
      tipo: md.movement.type,
      signo: ENTRY_TYPES.includes(md.movement.type) ? "+" : "-",
      cantidad: md.quantity,
      estado: md.movement.status,
      motivo: md.movement.reason,
      unitCost: md.unitCost,
      supplier: md.movement.supplier,
      usuario: md.movement.user,
      cancellationDate: md.movement.cancellationDate,
    }));

    const eventosVentas = saleDetails.map((sd) => ({
      origen: "Venta",
      id: sd.sale.id,
      date: sd.sale.date,
      tipo: "Venta",
      signo: "-",
      cantidad: sd.quantity,
      estado: sd.sale.status,
      motivo: sd.sale.cancellationReason,
      unitPrice: sd.unitPrice,
      subtotal: sd.subtotal,
      usuario: sd.sale.user,
      cancellationDate: sd.sale.cancellationDate,
    }));

    // Se unen y ordenan por fecha descendente (más reciente primero)
    const timelineCompleto = [...eventosMovimientos, ...eventosVentas].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    const total = timelineCompleto.length;
    const skip = (page - 1) * limit;
    const timelinePaginado = timelineCompleto.slice(skip, skip + limit);

    res.json({
      data: timelinePaginado,
      producto: { id: product.id, name: product.name, currentStock: product.currentStock },
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

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, referenceCode, lowStockThreshold, currentStock, productCategoryId, unitOfMeasureId } = req.body;
    verifyFields({ name });

    const photo = req.file ? `/uploads/products/${req.file.filename}` : null;

    if (price === undefined || isNaN(price) || price < 0) {
      const error = new Error("El precio debe ser un número válido");
      error.statusCode = 400;
      throw error;
    }

    if (currentStock === undefined || isNaN(currentStock) || currentStock < 0) {
      const error = new Error("El stock actual debe ser un número válido");
      error.statusCode = 400;
      throw error;
    }

    if (!productCategoryId || isNaN(productCategoryId)) {
      const error = new Error("La categoría de producto es obligatoria");
      error.statusCode = 400;
      throw error;
    }

    if (!unitOfMeasureId || isNaN(unitOfMeasureId)) {
      const error = new Error("La unidad de medida es obligatoria");
      error.statusCode = 400;
      throw error;
    }

    if (lowStockThreshold !== undefined && (isNaN(lowStockThreshold) || lowStockThreshold < 0)) {
      const error = new Error("El umbral de stock bajo debe ser un número válido");
      error.statusCode = 400;
      throw error;
    }

    // Parseo explícito de tipos numéricos (FormData siempre envía strings)
    const parsedProductCategoryId = parseInt(productCategoryId);
    const parsedUnitOfMeasureId = parseInt(unitOfMeasureId);
    const parsedPrice = parseFloat(price);
    const parsedCurrentStock = parseInt(currentStock);
    const parsedLowStockThreshold = lowStockThreshold !== undefined ? parseInt(lowStockThreshold) : 5;

    const productCategory = await prisma.productCategory.findUnique({
      where: { id: parsedProductCategoryId },
    });
    if (!productCategory) {
      const error = new Error("La categoría de producto no existe");
      error.statusCode = 404;
      throw error;
    }

    const unitOfMeasure = await prisma.unitOfMeasure.findUnique({
      where: { id: parsedUnitOfMeasureId },
    });
    if (!unitOfMeasure) {
      const error = new Error("La unidad de medida no existe");
      error.statusCode = 404;
      throw error;
    }

    const createdProduct = await prisma.product.create({
      data: {
        name,
        price: parsedPrice,
        description,
        referenceCode,
        lowStockThreshold: parsedLowStockThreshold,
        photo,
        currentStock: parsedCurrentStock,
        productCategoryId: parsedProductCategoryId,
        unitOfMeasureId: parsedUnitOfMeasureId,
        storeId: req.store.id,
        status: ProductStatus.Active,
      },
    });

    res.status(201).json({
      data: createdProduct,
      message: "Producto creado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    verifyNumberID(id);

    const { name, price, description, referenceCode, lowStockThreshold, productCategoryId, unitOfMeasureId } = req.body;
    verifyFields({ name });

    if (price === undefined || isNaN(price) || price < 0) {
      const error = new Error("El precio debe ser un número válido");
      error.statusCode = 400;
      throw error;
    }

    if (lowStockThreshold !== undefined && (isNaN(lowStockThreshold) || lowStockThreshold < 0)) {
      const error = new Error("El umbral de stock bajo debe ser un número válido");
      error.statusCode = 400;
      throw error;
    }

    const product = await prisma.product.findFirst({
      where: { id, storeId: req.store.id },
    });
    if (!product) {
      const error = new Error("Producto no encontrado");
      error.statusCode = 404;
      throw error;
    }

    let photo = product.photo;
    if (req.file) {
      deleteFile(product.photo);
      photo = `/uploads/products/${req.file.filename}`;
    }

    // Parseo explícito de tipos numéricos, con fallback al valor actual
    // si el campo no vino en el body (evita romper el update si es opcional)
    const parsedProductCategoryId = productCategoryId ? parseInt(productCategoryId) : product.productCategoryId;
    const parsedUnitOfMeasureId = unitOfMeasureId ? parseInt(unitOfMeasureId) : product.unitOfMeasureId;
    const parsedLowStockThreshold = lowStockThreshold !== undefined ? parseInt(lowStockThreshold) : product.lowStockThreshold;
    const parsedPrice = parseFloat(price);

    if (productCategoryId) {
      const productCategory = await prisma.productCategory.findUnique({
        where: { id: parsedProductCategoryId },
      });
      if (!productCategory) {
        const error = new Error("La categoría de producto no existe");
        error.statusCode = 404;
        throw error;
      }
    }

    if (unitOfMeasureId) {
      const unitOfMeasure = await prisma.unitOfMeasure.findUnique({
        where: { id: parsedUnitOfMeasureId },
      });
      if (!unitOfMeasure) {
        const error = new Error("La unidad de medida no existe");
        error.statusCode = 404;
        throw error;
      }
    }

    const previousValue = {
      name: product.name,
      price: product.price,
      description: product.description,
      referenceCode: product.referenceCode,
      lowStockThreshold: product.lowStockThreshold,
      photo: product.photo,
      productCategoryId: product.productCategoryId,
      unitOfMeasureId: product.unitOfMeasureId,
    };

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: parsedPrice,
        description,
        referenceCode,
        lowStockThreshold: parsedLowStockThreshold,
        photo,
        productCategoryId: parsedProductCategoryId,
        unitOfMeasureId: parsedUnitOfMeasureId,
      },
    });

    await prisma.auditLog.create({
      data: {
        eventActionType: "UPDATE",
        userId: req.user.id,
        clientIp: req.ip ?? "unknown",
        resourceType: "Product",
        resourceId: product.id,
        previousValue: JSON.stringify(previousValue),
        newValue: JSON.stringify({
          name: updatedProduct.name,
          price: updatedProduct.price,
          description: updatedProduct.description,
          referenceCode: updatedProduct.referenceCode,
          lowStockThreshold: updatedProduct.lowStockThreshold,
          photo: updatedProduct.photo,
          productCategoryId: updatedProduct.productCategoryId,
          unitOfMeasureId: updatedProduct.unitOfMeasureId,
        }),
        description: "Producto actualizado",
        status: "Active",
      },
    });

    res.status(200).json({
      data: updatedProduct,
      message: "Producto editado exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    verifyNumberID(id);

    const product = await prisma.product.findFirst({
      where: { id, storeId: req.store.id },
    });
    if (!product) {
      const error = new Error("Producto no encontrado");
      error.statusCode = 404;
      throw error;
    }

    const deletedProduct = await prisma.product.update({
      where: { id },
      data: {
        status: ProductStatus.Inactive,
        deactivationDate: new Date(),
      },
    });

    res.json({
      data: deletedProduct,
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export const restoreProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    verifyNumberID(id);

    const product = await prisma.product.findFirst({
      where: { id, storeId: req.store.id },
    });
    if (!product) {
      const error = new Error("Producto no encontrado");
      error.statusCode = 404;
      throw error;
    }

    const restoredProduct = await prisma.product.update({
      where: { id },
      data: {
        status: ProductStatus.Active,
        deactivationDate: null,
      },
    });

    res.json({
      data: restoredProduct,
      message: "Producto restablecido correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export const getInventoryStatus = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(process.env.PAGINATION_LIMIT) || 10;
    const skip = (page - 1) * limit;
    const { name, productCategoryId, stockStatus } = req.query;

    const where = {
      storeId: req.store.id,
      status: ProductStatus.Active,
      ...(name && { name: { contains: name } }),
      ...(productCategoryId && {
        productCategoryId: parseInt(productCategoryId),
      }),
    };

    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        currentStock: true,
        lowStockThreshold: true,
        photo: true,
        productCategoryId: true,
        productCategory: { select: { id: true, name: true } },
      },
      orderBy: { name: "asc" },
    });

    const withStockStatus = products.map((product) => {
      let stockStatus;
      if (product.currentStock <= 0) {
        stockStatus = "Agotado";
      } else if (product.currentStock <= product.lowStockThreshold) {
        stockStatus = "Critico";
      } else {
        stockStatus = "Normal";
      }
      return { ...product, stockStatus };
    });

    const summary = withStockStatus.reduce(
      (acc, product) => {
        if (product.stockStatus === "Agotado") acc.agotados += 1;
        if (product.stockStatus === "Critico") acc.criticos += 1;
        acc.total += 1;
        return acc;
      },
      { total: 0, criticos: 0, agotados: 0 },
    );

    const filtered = stockStatus ? withStockStatus.filter((p) => p.stockStatus === stockStatus) : withStockStatus;

    const total = filtered.length;
    const paginated = filtered.slice(skip, skip + limit);

    res.json({
      data: paginated,
      summary,
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

export const updateThresholdByCategory = async (req, res, next) => {
  try {
    const { productCategoryId, lowStockThreshold } = req.body;

    if (!productCategoryId || isNaN(productCategoryId)) {
      const error = new Error("La categoría de producto es obligatoria");
      error.statusCode = 400;
      throw error;
    }

    if (lowStockThreshold === undefined || isNaN(lowStockThreshold) || lowStockThreshold < 0) {
      const error = new Error("El umbral debe ser un número válido");
      error.statusCode = 400;
      throw error;
    }

    const productCategory = await prisma.productCategory.findUnique({
      where: { id: parseInt(productCategoryId) },
    });
    if (!productCategory) {
      const error = new Error("La categoría de producto no existe");
      error.statusCode = 404;
      throw error;
    }

    const result = await prisma.product.updateMany({
      where: {
        storeId: req.store.id,
        productCategoryId: parseInt(productCategoryId),
        status: ProductStatus.Active,
      },
      data: { lowStockThreshold: parseInt(lowStockThreshold) },
    });

    await prisma.auditLog.create({
      data: {
        eventActionType: "UPDATE",
        userId: req.user.id,
        clientIp: req.ip ?? "unknown",
        resourceType: "Product",
        resourceId: parseInt(productCategoryId),
        previousValue: null,
        newValue: JSON.stringify({
          productCategoryId: parseInt(productCategoryId),
          lowStockThreshold: parseInt(lowStockThreshold),
          affectedProducts: result.count,
        }),
        description: "Umbral actualizado por categoría",
        status: "Active",
      },
    });

    res.status(200).json({
      message: `Umbral actualizado para ${result.count} producto(s) de la categoría`,
      data: { affectedProducts: result.count },
    });
  } catch (error) {
    next(error);
  }
};

export const searchProductsPublic = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const { name, productCategoryId } = req.query;

    const where = {
      status: "Active",
      currentStock: { gt: 0 },
      ...(name && { name: { contains: name } }),
      ...(productCategoryId && {
        productCategoryId: parseInt(productCategoryId),
      }),
      store: { status: "Active" },
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        where,
        select: {
          id: true,
          name: true,
          price: true,
          photo: true,
          currentStock: true,
          lowStockThreshold: true,
          unitOfMeasure: { select: { name: true } },
          productCategory: { select: { id: true, name: true } },
          store: {
            select: {
              id: true,
              name: true,
              address: true,
              neighborhood: true,
              phone: true,
              logo: true,
              latitude: true,
              longitude: true,
            },
          },
        },
        orderBy: { name: "asc" },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      data: products,
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
